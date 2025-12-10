import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { startSession } from "./globalState";
import styles from "./level.styles";
//firebase DB 저장 함수 임포트
import { startStudySession } from "@/firebase/study";

// 버튼 데이터 정의
const BUTTON_DATA = [
  {
    id: 1,
    label: "살펴보기",
    route: "/(flow)/ediya/startPage",
    requirement: "자유롭게 메뉴판을 탐색합니다.",
    sessionName: "이디야 살펴보기",
    successTouches: 0,
  },
  {
    id: 2,
    label: "난이도: 하 (미션)",
    route: "/(flow)/ediya/startPage",
    requirement: "요구사항: 아메리카노(HOT), 사이즈(L) 선택 후 주문 담기",
    sessionName: "이디야 아메리카노 주문",
    successTouches: 4,
  },
  {
    id: 3,
    label: "난이도 : 중 (미션)",
    route: "/(flow)/ediya/startPage",
    requirement:
      "요구사항: 버블 크림 밀크티(ICE), 사이즈(EX) 선택 후 주문 담기",
    sessionName: "이디야 버블티 주문",
    successTouches: 4,
  },
  {
    id: 4,
    label: "버튼 4 (난이도: 상)",
    route: "/(flow)/ediya/startPage",
    requirement:
      "요구사항 : 디카페인 에스프레소(HOT), 사이즈(L), 시럽추가 후 주문 담기",
    sessionName: "이디야 디카페인 옵션추가",
    successTouches: 4,
  },
];

export default function TestPage() {
  const handlePress = async (button: (typeof BUTTON_DATA)[0]) => {
    // 1. 세션 시작 (터치 카운트 초기화 및 데이터 저장)
    startSession({
      sessionName: button.sessionName,
      successTouches: button.successTouches,
      missionId: `mission-${button.id}`,
    });

    const categoryName = "이디야";
    const sessionName = button.sessionName;
    // firebase 학습 시작 데이터 전송
    const sessionId = await startStudySession({ categoryName, sessionName });

    // 2. 페이지 이동
    if (button.route) {
      router.push({
        pathname: button.route,
        params: {
          ...button,
          missionId: `mission-${button.id}`,
          sessionId: sessionId,
        },
      } as any);
    } else {
      Alert.alert("알림", "준비 중입니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {BUTTON_DATA.map((button) => (
          <Pressable
            key={button.id}
            style={styles.button}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
            {button.requirement && (
              <Text style={styles.buttonRequirement}>{button.requirement}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
