import { finishStudySession, startStudySession } from "@/firebase/study";
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

      // 실제 학습 ui 구성되었을시 참고하여 반영하면 됨
      //----------------------------------------------------------------------//
      // 1. 학습 시작 (DB 문서 생성) -- 카테고리와 학습이름
      const sessionId = await startStudySession({ categoryName, sessionName });

      // 2. 가상의 학습 결과 데이터 생성 (테스트용)
      const totalTouches = Math.floor(Math.random() * 20) + 5; // 5 ~ 25회 터치
      const successTouches = Math.floor(Math.random() * 5) + 5; // 최소 5회 성공 가정

      // 3. 학습 종료 (DB 문서 업데이트)
      await finishStudySession(sessionId, totalTouches, successTouches);
      //----------------------------------------------------------------------//

      Alert.alert(
        "테스트 성공",
        `[${categoryName}] 학습 기록이 DB에 저장되었습니다.\n(ID: ${sessionId})`
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
    backgroundColor: "#FFD700", // 메가커피 노란색 (유사하지만 예시)
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
