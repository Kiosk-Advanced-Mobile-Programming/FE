// app/(flow)/study/[sessionId].tsx
// 세션 하나에 대한 상세 통계 화면입니다.

import StudySummaryView, {
  StudySessionSummary,
} from "@/components/StudySummaryScreen/StudySummaryview";
import { auth, db } from "@/firebase/app";
import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function StudyDetailScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<StudySessionSummary | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid || !sessionId) {
          setLoading(false);
          return;
        }

        const ref = doc(db, "users", uid, "sessions", sessionId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const d = snap.data() as any;
          const started = d.startedAt?.toDate?.() ?? new Date();

          const totalSeconds = d.totalSeconds ?? 0;
          const totalTouches = d.totalTouches ?? 0;
          const successTouches = d.successTouches ?? 0;

          setSession({
            categoryName: d.categoryName ?? "학습",
            dateLabel: started.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            }),
            totalSeconds,
            totalTouches,
            successTouches,
            status: d.status ?? "COMPLETED",
          });
        }
      } catch (e) {
        console.log("세션 상세 불러오기 오류:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sessionId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6D4AFF" />
      </View>
    );
  }

  if (!session) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          세션 정보를 찾을 수 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <>
      {/* 상단 헤더 제목 설정 (선택) */}
      <Stack.Screen options={{ title: "학습 통계" }} />
      <StudySummaryView
        session={session}
        onRetry={() => {
          console.log("같은 연습 다시 해보기");
          // TODO: 해당 카테고리로 다시 연습 시작하는 로직 연결
        }}
        onOtherPractice={() => {
          console.log("다른 연습 해보기");
          // TODO: 연습 선택 화면으로 이동
        }}
      />
    </>
  );
}
