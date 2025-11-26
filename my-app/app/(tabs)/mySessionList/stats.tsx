// app/(tabs)/stats.tsx
// 하단 탭에서 들어오는 "학습 통계(세션 목록)" 화면입니다.

import { auth, db } from "@/firebase/app";
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./stats.style";

interface SessionListItem {
  id: string;
  category: string;
  startedAtLabel: string;
  successRateLabel: string;
}

export default function StatsListScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);

  // ---------- Firestore에서 현재 유저의 세션 목록 불러오기 ----------
  useEffect(() => {
    const load = async () => {
      try {
        const uid = auth.currentUser?.uid;
        console.log("현재 유저 UID: " + uid);
        if (!uid) {
          setLoading(false);
          return;
        }

        const sessionsRef = collection(db, "users", uid, "sessions");
        const q = query(sessionsRef, orderBy("endedAt", "desc")); // 최신 순

        const snap = await getDocs(q);
        const items: SessionListItem[] = [];

        snap.forEach((doc) => {
          const d = doc.data() as any;
          const started = d.startedAt?.toDate?.() ?? new Date();
          const totalTouches = d.totalTouches ?? 0;
          const successTouches = d.successTouches ?? 0;
          const successRate =
            totalTouches > 0
              ? Math.round((successTouches / totalTouches) * 100)
              : 0;

          items.push({
            id: doc.id,
            category: d.category ?? "학습",
            startedAtLabel: started.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            }),
            successRateLabel: `${successRate}% 성공`,
          });
        });

        setSessions(items);
      } catch (e) {
        console.log("세션 목록 불러오기 오류:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handlePressItem = (item: SessionListItem) => {
    // 세션 상세 화면으로 이동 (세션 ID 전달)
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
            style={styles.itemCard}
          >
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemDate}>{item.startedAtLabel}</Text>
            <Text style={styles.itemSuccess}>{item.successRateLabel}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
