// app/(flow)/general-restaurant/order-complete.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { router, Stack } from "expo-router"; // [수정] router, Stack 임포트 추가
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "./App";
import { useCart } from "./cart-context";
import { useStudySession } from "./study-session-context";

type Props = NativeStackScreenProps<RootStackParamList, "OrderComplete">;

export default function OrderComplete({ navigation }: Props) {
  const { clear } = useCart();
  const { finish, registerTouch, reset } = useStudySession();

  useEffect(() => {
    clear();

    // 학습 세션 성공 종료
    finish("SUCCESS").catch((e) =>
      console.error("finishStudySession error", e)
    );

    return () => {
      reset();
    };
  }, [clear, finish, reset]);

  const handleGoHome = () => {
    registerTouch(true);
    // [수정] navigation.replace 대신 router.dismissAll() 사용하여 스택 전체 닫기
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      {/* [수정] 결과 화면에서 뒤로가기 방지를 위해 헤더 숨김 */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.card}>
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>주문이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          픽업 대기 번호를 확인하시고{"\n"}준비되면 음식을 받아가세요.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.infoText}>이 화면을 직원에게 보여주세요.</Text>

        <Pressable style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>처음으로</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc72c",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  check: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "800",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 4,
    backgroundColor: "#da291c",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
