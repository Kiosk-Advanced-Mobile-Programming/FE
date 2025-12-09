// app/(flow)/mcDonalds/order-complete.tsx

import { Pressable, Text, View } from "react-native";
import { useCart } from "./cart-context";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { finishStudySession } from "@/firebase/study"; // [1] 함수 임포트
import { useLocalSearchParams, useRouter } from "expo-router"; // [1] params 훅
import React, { useEffect } from "react";
import { getMcDonaldsTouchCount } from "./globalState"; // [1] 터치 카운트 가져오기

//import { styles } from "./order-complete.style"; // 스타일 파일 경로 확인 필요 (없으면 생성)

export default function OrderCompleteScreen() {
  const router = useRouter();

  // [2] sessionId 받기
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  // [3] 화면 진입 시(또는 버튼 클릭 시) 학습 종료 처리
  // 여기서는 '처음으로' 버튼을 누를 때 저장하거나,
  // 화면이 떴을 때 useEffect로 자동 저장할 수 있습니다.
  // UX상 화면이 뜨자마자 성공으로 간주하고 저장하는 것이 좋습니다.

  useEffect(() => {
    const saveResult = async () => {
      if (!sessionId) return;

      try {
        const totalTouches = getMcDonaldsTouchCount();
        const successTouches = 0; // 요청하신 대로 0으로 고정

        await finishStudySession(
          sessionId,
          totalTouches,
          successTouches,
          "SUCCESS"
        );
        console.log("학습 종료 저장 완료");
      } catch (e) {
        console.error("학습 종료 저장 실패", e);
      }
    };

    saveResult();
  }, [sessionId]);

  const handleGoHome = () => {
    // 스택 초기화 하고 홈으로 이동 (또는 flow 종료)
    router.dismissAll();
  };

  const { clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 1000) + 5000; // 랜덤 주문번호 5000번대

  useEffect(() => {
    // 1. 장바구니 비우기
    clearCart();

    // 2. 3초 뒤 홈으로 이동
    const timer = setTimeout(() => {
      router.replace("/(flow)/mcDonalds/start-mcDonalds");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 스타일이나 UI 구성은 기존 코드를 따르거나 아래와 같이 간단히 구성 */}
      <View style={styles.content}>
        <IconSymbol name="checkmark.circle.fill" size={80} color="#FFBC0D" />
        <Text style={styles.title}>주문이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          맛있는 식사 되세요.{"\n"}
          영수증과 주문 번호를 확인해주세요.
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>처음으로 돌아가기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  content: { alignItems: "center" as const, gap: 20 },
  title: { fontSize: 24, fontWeight: "bold" as const, marginTop: 20 },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center" as const,
    lineHeight: 24,
  },
  footer: {
    position: "absolute" as const,
    bottom: 50,
    width: "100%",
    paddingHorizontal: 20,
  },
  homeButton: {
    backgroundColor: "#FFBC0D",
    padding: 20,
    borderRadius: 12,
    alignItems: "center" as const,
  },
  homeButtonText: { fontSize: 18, fontWeight: "bold" as const, color: "#000" },
};
