// app/(flow)/mcDonalds/order-complete.tsx
import { router, Stack, useLocalSearchParams } from "expo-router"; // useLocalSearchParams 추가
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "./cart-context";

// [추가] 학습 종료 처리를 위한 함수 임포트
import { finishStudySession } from "@/firebase/study";
import {
  getMcDonaldsSuccessCount,
  getMcDonaldsTouchCount,
} from "./globalState"; // [수정] getMcDonaldsSuccessCount 추가

export default function OrderCompleteScreen() {
  const { clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 1000) + 5000; // 랜덤 주문번호 5000번대

  // [추가] 이전 화면에서 넘겨준 세션 ID 받기
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  useEffect(() => {
    // 1. 학습 종료 결과 저장 (비동기 처리)
    const saveStudyResult = async () => {
      // sessionId가 있을 때만 저장 시도
      if (sessionId) {
        try {
          const totalTouches = getMcDonaldsTouchCount();
          // [수정] 0 대신 실제 성공 횟수 가져오기
          const successTouches = getMcDonaldsSuccessCount();

          await finishStudySession(
            sessionId,
            totalTouches,
            successTouches,
            "SUCCESS"
          );
          console.log("학습 종료 DB 저장 성공!");
        } catch (e) {
          console.error("학습 종료 저장 중 에러 발생:", e);
        }
      }
    };

    saveStudyResult();

    // 2. 장바구니 비우기 (기존 기능)
    clearCart();

    // 3. 4초 뒤 홈으로 이동 (기존 기능)
    const timer = setTimeout(() => {
      // 스택을 모두 비우고 홈으로 돌아가는 것이 깔끔합니다.
      router.dismissAll();
      // router.replace('/(flow)/mcDonalds/start-mcDonalds'); // 원하시면 이 줄 사용 가능
    }, 4000);

    return () => clearTimeout(timer);
  }, []); // 빈 배열: 화면 마운트 시 1회 실행

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <Text style={styles.label}>주문</Text>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <View style={styles.receiptLine} />

        <Text style={styles.desc}>
          주문 내역이 주방으로 전달되었습니다.{"\n"}
          잠시만 기다려주세요.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "70%",
    height: "50%",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  orderNumber: { fontSize: 80, fontWeight: "900", color: "#333" },
  receiptLine: {
    width: "80%",
    height: 2,
    backgroundColor: "#ddd",
    marginVertical: 30,
    borderStyle: "dashed",
    borderRadius: 1,
  },
  desc: { fontSize: 20, textAlign: "center", color: "#555", lineHeight: 30 },
});
