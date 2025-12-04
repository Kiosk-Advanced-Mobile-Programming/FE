// app/(tabs)/stats.tsx
// 하단 탭에서 들어오는 "학습 통계(세션 목록)" 화면입니다.

import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./_stats.style";

interface SessionListItem {
  id: string;
  category: string;
  startedAtLabel: string;
  statusLabel: string; // 화면에 표시할 텍스트 ("완료" or "진행중")
  status: string; // 실제 상태 코드 ("COMPLETED" or "IN_PROGRESS")
}

export default function StatsListScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        try {
          setLoading(true);

          const uid = auth.currentUser?.uid;
          console.log("현재 유저 UID: " + uid);
          if (!uid) {
            if (isActive) setLoading(false);
            return;
          }

          const sessionsRef = collection(db, "users", uid, "sessions");
          const q = query(sessionsRef, orderBy("endedAt", "desc")); // 최신 순

          const snap = await getDocs(q);
          const items: SessionListItem[] = [];

          snap.forEach((doc) => {
            const d = doc.data() as any;
            const started = d.startedAt?.toDate?.() ?? new Date();
            const status = d.status ?? "COMPLETED";

            // 상태에 따른 라벨 설정
            let statusLabel = "완료";
            if (status === "IN_PROGRESS") {
              statusLabel = "진행중";
            }

            items.push({
              id: doc.id,
              category: d.category ?? "학습",
              startedAtLabel: started.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              }),
              statusLabel: statusLabel,
              status: status,
            });
          });

          if (isActive) {
            setSessions(items);
          }
        } catch (e) {
          console.log("세션 목록 불러오기 오류:", e);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      load();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handlePressItem = (item: SessionListItem) => {
    // 학습 중이면 상세 화면 이동 차단 (이중 안전장치)
    if (item.status === "IN_PROGRESS") return;

    router.push({
      pathname: "/(flow)/studySummary/StudyDetailScreen",
      params: { sessionId: item.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D4AFF" />
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          아직 학습 기록이 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>지난 학습 목록</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePressItem(item)}
            // '진행중' 상태면 클릭 비활성화
            disabled={item.status === "IN_PROGRESS"}
            style={[
              styles.itemCard,
              // 진행중이면 약간 흐리게 처리
              item.status === "IN_PROGRESS" && {
                opacity: 0.7,
                backgroundColor: "#F5F5F5",
              },
            ]}
          >
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemDate}>{item.startedAtLabel}</Text>
            <Text
              style={[
                styles.itemSuccess,
                // 진행중일 때는 주황색, 완료일 때는 기존 초록색 유지
                item.status === "IN_PROGRESS"
                  ? { color: "#FF9800" }
                  : undefined,
              ]}
            >
              {item.statusLabel}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
