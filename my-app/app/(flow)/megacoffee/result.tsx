// app/(flow)/megacoffee/result.tsx
import { router, Stack, useLocalSearchParams } from "expo-router"; // [수정] Stack 추가
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { CART_STORAGE, notifyCartUpdate } from "./megacoffee";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  titleSuccess: {
    fontSize: 28,
    fontWeight: "900",
    color: "#28A745",
    marginBottom: 10,
  },
  titleFailure: {
    fontSize: 28,
    fontWeight: "900",
    color: "#DC3545",
    marginBottom: 10,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 8,
  },
  missionRequirement: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#E9ECEF",
    marginVertical: 20,
  },
  backButton: {
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "#6C5CE7",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  missionIdText: {
    fontSize: 12,
    color: "#ADB5BD",
    marginTop: 15,
  },
});

interface ResultParams {
  isSuccess: string;
  missionId: string;
  totalTouches: string;
  missionTitle: string;
  requirement: string;
}

export default function ResultPage() {
  const params = useLocalSearchParams() as unknown as ResultParams;

  const isSuccess = params.isSuccess === "true";
  const missionId = params.missionId || "mission-easy";
  const totalTouches = params.totalTouches || "0";
  const missionTitle = params.missionTitle || "미션 결과";
  const requirement =
    params.requirement || "미션 내용 정보를 찾을 수 없습니다.";

  const handleGoHome = () => {
    CART_STORAGE.length = 0;
    notifyCartUpdate();

    // [수정] 스택을 초기화하고 앱의 메인(탭) 화면으로 돌아가기 위해 dismissAll 사용
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      {/* [수정] 결과 화면 상단의 뒤로가기 버튼 숨김 */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.card}>
        <Text style={styles.icon}>{isSuccess ? "🎉" : "😓"}</Text>

        <Text style={isSuccess ? styles.titleSuccess : styles.titleFailure}>
          {isSuccess ? "미션 성공!" : "미션 실패"}
        </Text>

        <Text style={styles.missionTitle}>{missionTitle}</Text>
        <Text style={styles.missionRequirement}>{requirement}</Text>

        <View style={styles.separator} />
        <View>
          <Text>총 터치 횟수: {totalTouches}회</Text>
        </View>
        <View style={styles.separator} />

        <Pressable onPress={handleGoHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>
            첫 페이지로 돌아가기 (미션 선택 화면)
          </Text>
        </Pressable>

        <Text style={styles.missionIdText}>{`Mission ID: ${missionId}`}</Text>
      </View>
    </View>
  );
}
