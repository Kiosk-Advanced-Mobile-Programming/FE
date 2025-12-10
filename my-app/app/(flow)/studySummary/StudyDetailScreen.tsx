// app/(flow)/study/[sessionId].tsx
// 세션 하나에 대한 상세 통계 화면입니다.

import StudySummaryView, {
  StudySessionSummary,
} from "@/components/StudySummaryScreen/StudySummaryview";
import { auth, db } from "@/firebase/app";
import { Stack, useLocalSearchParams, useRouter } from "expo-router"; // useRouter 추가
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function StudyDetailScreen() {
  const router = useRouter(); // 라우터 훅 사용
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
            // 주제목은 카테고리, 부제목은 세션 이름으로 설정
            categoryName: d.category ?? "학습",
            sessionName: d.sessionName ?? "세션 정보 없음",
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
      <Stack.Screen options={{ title: "학습 통계" }} />
      <StudySummaryView
        session={session}
        onRetry={() => {
          // [수정] 같은 연습 다시 해보기: 카테고리별 시작 페이지로 이동
          const category = session.categoryName;

          if (category === "맥도날드") {
            router.push("/(flow)/mcDonalds/start-mcDonalds");
          } else if (category === "메가커피") {
            router.push("/(flow)/megacoffee/level");
          } else if (category === "이디야 커피" || category === "이디야") {
            router.push("/(flow)/ediya/level");
          } else if (category === "일반 식당") {
            router.push("/(flow)/general-restaurant");
          } else {
            // 카테고리를 찾지 못한 경우 맞춤 학습 목록으로 이동
            router.push("/(tabs)/levelSession/recommend");
          }
        }}
        onOtherPractice={() => {
          // [수정] 다른 연습 해보기: 탭의 맞춤 학습 페이지로 이동
          router.push("/(tabs)/levelSession/recommend");
        }}
      />
    </>
  );
}
