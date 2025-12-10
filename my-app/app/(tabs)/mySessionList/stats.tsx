// my-app/app/(tabs)/mySessionList/stats.tsx
import { Colors } from "@/constants/theme";
import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SessionListItem {
  id: string;
  categoryName: string;
  sessionName: string;
  startedAtLabel: string;
  statusLabel: string;
  status: "SUCCESS" | "FAIL" | "IN_PROGRESS";
}

export default function StatsListScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);
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
          // 최신순 정렬
          const q = query(sessionsRef, orderBy("endedAt", "desc"));

          const snap = await getDocs(q);
          const items: SessionListItem[] = [];

          let sCount = 0;
          let fCount = 0;

          snap.forEach((doc) => {
            const d = doc.data() as any;
            const started = d.startedAt?.toDate?.() ?? new Date();
            const rawStatus = d.status ?? "IN_PROGRESS";

            // [수정] 진행중(IN_PROGRESS)인 항목은 리스트에서 제외
            if (rawStatus !== "SUCCESS" && rawStatus !== "FAIL") {
              return;
            }

            let statusLabel = "";
            let status: SessionListItem["status"] = "SUCCESS"; // 기본값 (실제로는 아래 if문에서 결정됨)

            if (rawStatus === "SUCCESS") {
              statusLabel = "성공";
              status = "SUCCESS";
              sCount++;
            } else if (rawStatus === "FAIL") {
              statusLabel = "실패";
              status = "FAIL";
              fCount++;
            }

            items.push({
              id: doc.id,
              categoryName: d.category ?? "학습",
              sessionName: d.sessionName ?? "",
              startedAtLabel: started.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              }),
              statusLabel: statusLabel,
              status: status,
            });
          });

          if (isActive) {
            setSessions(items);
            setSummary({ success: sCount, fail: fCount });
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
    // 혹시 모를 방어 코드
    if (item.status === "IN_PROGRESS") return;

    router.push({
      pathname: "/(flow)/studySummary/StudyDetailScreen",
      params: { sessionId: item.id },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return Colors.light.success;
      case "FAIL":
        return Colors.light.error;
      default:
        return Colors.light.secondary;
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>학습 현황</Text>

      {/* 요약 통계 */}
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

      <Text style={[styles.title, styles.recentTitle]}>최근 기록</Text>

      {sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>완료된 학습 기록이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePressItem(item)}
              style={({ pressed }) => [
                styles.itemCard,
                pressed && styles.itemCardPressed,
              ]}
            >
              <View style={styles.itemContent}>
                <View style={styles.itemLeft}>
                  {/* 카테고리명 표시 */}
                  <Text style={styles.itemCategory}>{item.categoryName}</Text>

                  {/* 세션명이 있으면 표시 */}
                  {item.sessionName ? (
                    <Text style={styles.itemSessionName}>
                      {item.sessionName}
                    </Text>
                  ) : null}

                  {/* 날짜 */}
                  <Text style={styles.itemDate}>{item.startedAtLabel}</Text>
                </View>

                {/* 상태 */}
                <Text
                  style={[
                    styles.itemStatus,
                    { color: getStatusColor(item.status) },
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
    color: Colors.light.text,
  },
  recentTitle: {
    fontSize: 18,
    marginTop: 10,
  },

  // 요약 통계
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
    fontWeight: "600",
  },
  summaryCountSuccess: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.success,
  },
  summaryCountFail: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.light.error,
  },

  // 리스트
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  itemCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  itemCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  itemSessionName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.primary,
    marginBottom: 6,
  },
  itemDate: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  itemStatus: {
    fontSize: 15,
    fontWeight: "600",
  },

  // 빈 상태
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
});
