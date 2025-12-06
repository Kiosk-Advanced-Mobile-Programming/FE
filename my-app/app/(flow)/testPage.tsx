import { finishStudySession, startStudySession } from "@/firebase/study"; // StudyStatus 타입 임포트 (선택사항)
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TestPage() {
  const [loading, setLoading] = useState(false);

  // 테스트용 세션 저장 함수
  const handleTestSession = async (
    categoryName: string,
    sessionName: string
  ) => {
    try {
      setLoading(true);
      console.log(`[Test] ${categoryName} 세션 시작 기록 생성 중...`);

      //----------------------------------------------------------------------//
      // 1. 학습 시작 (DB 문서 생성)
      const sessionId = await startStudySession({ categoryName, sessionName });

      // 2. 가상의 학습 결과 데이터 생성 (테스트용)
      const totalTouches = Math.floor(Math.random() * 20) + 5; // 5 ~ 25회 터치
      const successTouches = Math.floor(Math.random() * 5) + 5; // 최소 5회 성공 가정

      // [추가] 랜덤 상태 결정 로직 (SUCCESS, FAIL, IN_PROGRESS 중 하나)
      const randomValue = Math.random();
      let randomStatus: "SUCCESS" | "FAIL" | "IN_PROGRESS";

      if (randomValue < 0.33) {
        randomStatus = "SUCCESS";
      } else if (randomValue < 0.66) {
        randomStatus = "FAIL";
      } else {
        randomStatus = "IN_PROGRESS";
      }

      console.log(`[Test] 랜덤 결정된 상태: ${randomStatus}`);

      // 3. 학습 종료 (DB 문서 업데이트 - status 포함)
      await finishStudySession(
        sessionId,
        totalTouches,
        successTouches,
        randomStatus
      );
      //----------------------------------------------------------------------//

      Alert.alert(
        "테스트 성공",
        `[${categoryName}] 기록 저장 완료\nID: ${sessionId}\n상태: ${randomStatus}`
      );
    } catch (e: any) {
      console.error(e);
      Alert.alert("테스트 실패", "DB 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DB 저장 테스트</Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#6d4aff"
          style={{ marginBottom: 20 }}
        />
      )}

      <Pressable
        style={[styles.button, styles.mcdonalds]}
        onPress={() => handleTestSession("맥도날드", "치즈추가")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>🍔 맥도날드 학습 기록하기</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.megaCoffee]}
        onPress={() => handleTestSession("메가커피", "아메리카노주문")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>☕ 메가커피 학습 기록하기</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.cgv]}
        onPress={() => handleTestSession("CGV 영화관", "예매")}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.textWhite]}>
          🎬 CGV 학습 기록하기
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  mcdonalds: {
    backgroundColor: "#FFBC0D", // 맥도날드 노란색
  },
  megaCoffee: {
    backgroundColor: "#FFD700", // 메가커피 노란색
    borderWidth: 1,
    borderColor: "#333",
  },
  cgv: {
    backgroundColor: "#E71A0F", // CGV 빨간색
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  textWhite: {
    color: "#fff",
  },
});
