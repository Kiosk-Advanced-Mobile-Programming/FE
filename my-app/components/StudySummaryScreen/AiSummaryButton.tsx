// components/AiSummaryButton.tsx
// 한 세션에 대해 "AI 통계 요약"을 보여주는 컴포넌트
// 버튼 → LLM 요약 요청 → 응답 오면 텍스트로 교체

import { requestAiSummary } from "@/firebase/ai"; // ✅ 방금 만든 함수 import
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { styles } from "./AiSummaryButton.style";
import { StudySessionSummary } from "./StudySummaryview"; // 경로는 네 프로젝트 구조에 맞게 수정

interface AiSummaryButtonProps {
  session: StudySessionSummary;
  sessionId?: string;
}

const AiSummaryButton: React.FC<AiSummaryButtonProps> = ({
  session,
  sessionId,
}) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await requestAiSummary(session);
      setSummary(result);
    } catch (err: any) {
      console.log("AI 통계 요약 요청 오류:", err);
      setError("요약을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (summary) {
    return (
      <View style={styles.summaryBox}>
        <Text style={styles.label}>AI 통계 요약</Text>
        <Text style={styles.summaryText}>• {summary}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>AI 통계 요약</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Pressable style={styles.button} onPress={handlePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>AI에게 요약 요청하기</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AiSummaryButton;
