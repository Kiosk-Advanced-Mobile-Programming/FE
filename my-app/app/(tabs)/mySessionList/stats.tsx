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
  statusLabel: string;
  status: "SUCCESS" | "FAIL" | "IN_PROGRESS"; // 타입 구체화
}

export default function StatsListScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);

  // [추가] 통계 요약 상태
  const [summary, setSummary] = useState({ success: 0, fail: 0 });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        try {
          setLoading(true);

          const uid = auth.currentUser?.uid;
          if (!uid) {
            if (isActive) setLoading(false);
            return;
          }

          const sessionsRef = collection(db, "users", uid, "sessions");
          const q = query(sessionsRef, orderBy("endedAt", "desc"));

          const snap = await getDocs(q);
          const items: SessionListItem[] = [];

          // 카운트 변수
          let sCount = 0;
          let fCount = 0;

          snap.forEach((doc) => {
            const d = doc.data() as any;
            const started = d.startedAt?.toDate?.() ?? new Date();
            // 기본값 처리: 과거 데이터가 status가 없을 수 있으므로 처리 필요 시 수정
            const rawStatus = d.status ?? "IN_PROGRESS";

            // 상태 라벨 및 카운트 계산
            let statusLabel = "진행중";
            let status: SessionListItem["status"] = "IN_PROGRESS";

            if (rawStatus === "SUCCESS") {
              statusLabel = "성공";
              status = "SUCCESS";
              sCount++;
            } else if (rawStatus === "FAIL") {
              statusLabel = "실패";
              status = "FAIL";
              fCount++;
            } else {
              // IN_PROGRESS
              statusLabel = "진행중";
              status = "IN_PROGRESS";
            }

            items.push({
              id: doc.id,
              category: d.category ?? "학습",
              startedAtLabel: started.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short", // 'long' -> 'short'로 변경하여 공간 확보 (선택사항)
              }),
              statusLabel: statusLabel,
              status: status,
            });
          });

          if (isActive) {
            setSessions(items);
            setSummary({ success: sCount, fail: fCount }); // 요약 업데이트
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
    // IN_PROGRESS 상태면 상세 이동 차단
    if (item.status === "IN_PROGRESS") return;

    router.push({
      pathname: "/(flow)/studySummary/StudyDetailScreen",
      params: { sessionId: item.id },
    });
  };

  // 상태에 따른 색상 반환 함수
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "#4CAF50"; // 초록
      case "FAIL":
        return "#E53935"; // 빨강
      default:
        return "#FF9800"; // 주황 (진행중)
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D4AFF" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>학습 현황</Text>

      {/* [추가] 상단 요약 통계 */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>성공한 학습</Text>
          <Text style={styles.summaryCountSuccess}>{summary.success}회</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>실패한 학습</Text>
          <Text style={styles.summaryCountFail}>{summary.fail}회</Text>
        </View>
      </View>

      <Text style={[styles.title, { fontSize: 18, marginTop: 10 }]}>
        최근 기록
      </Text>

      {sessions.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>
            아직 학습 기록이 없습니다.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePressItem(item)}
              disabled={item.status === "IN_PROGRESS"}
              style={[
                styles.itemCard,
                item.status === "IN_PROGRESS" && {
                  opacity: 0.7,
                  backgroundColor: "#F9F9F9",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemDate}>{item.startedAtLabel}</Text>
                </View>
                <Text
                  style={[
                    styles.itemSuccess,
                    { color: getStatusColor(item.status) }, // 동적 색상 적용
                  ]}
                >
                  {item.statusLabel}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
