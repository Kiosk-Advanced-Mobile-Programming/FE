import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./_recommend.style";

// 학습 코스 데이터 정의
interface Course {
  id: string;
  title: string;
  description: string;
  level: string; // 이 코스의 난이도
  route: string; // 이동할 경로
}

// 4가지 고정 학습 리스트 (난이도 매핑)
const COURSES: Course[] = [
  {
    id: "restaurant",
    title: "일반 식당",
    description: "음식점에서 메뉴를 고르고 결제하는 기본적인 방법을 배웁니다.",
    level: "초급",
    route: "/(flow)/general-restaurant/start-general-restaurant",
  },
  {
    id: "ediya",
    title: "이디야 커피",
    description: "카페에서 음료 옵션을 선택하고 주문하는 연습을 합니다.",
    level: "중급",
    route: "/(flow)/ediya/startPage",
  },
  {
    id: "megacoffee",
    title: "메가커피",
    description: "다양한 카페 메뉴와 옵션을 익히며 실력을 키웁니다.",
    level: "중급",
    route: "/(flow)/megacoffee/startPage",
  },
  {
    id: "mcdonalds",
    title: "맥도날드",
    description:
      "세트 메뉴 선택, 재료 변경 등 복잡한 주문 과정을 마스터합니다.",
    level: "고급",
    route: "/(flow)/mcDonalds/start-mcDonalds",
  },
];

export default function RecommendScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>("초급"); // 기본값
  const [userName, setUserName] = useState<string>("");

  // 애니메이션 값 (0 ~ 1)
  const blinkAnim = useRef(new Animated.Value(0)).current;

  // 깜빡임 애니메이션 설정 (무한 반복)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800, // 0.8초 동안 붉어짐
          useNativeDriver: false, // 색상 변경은 false 필수
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 800, // 0.8초 동안 원래대로
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  // 보간(Interpolation)을 이용해 색상 변경 (회색 -> 빨강)
  const borderColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EAEAEA", "#FF0000"],
  });

  // 유저 정보 불러오기
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUserData = async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            setLoading(false);
            return;
          }

          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists() && isActive) {
            const data = userSnap.data();
            setUserLevel(data.kioskLevel || "초급");

            // 닉네임 우선 사용, 없으면 이메일 사용
            if (data.nickname) {
              setUserName(data.nickname);
            } else {
              setUserName(user.email ? user.email.split("@")[0] : "사용자");
            }
          }
        } catch (e) {
          console.error("사용자 정보 불러오기 실패", e);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchUserData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // [정렬 로직] 본인 레벨에 맞는 코스를 최상단으로 정렬
  const sortedCourses = useMemo(() => {
    return [...COURSES].sort((a, b) => {
      const aMatch = a.level === userLevel;
      const bMatch = b.level === userLevel;

      // a가 내 레벨이면 앞으로
      if (aMatch && !bMatch) return -1;
      // b가 내 레벨이면 앞으로
      if (!aMatch && bMatch) return 1;
      // 그 외에는 원래 순서 유지
      return 0;
    });
  }, [userLevel]);

  const handleStartStudy = (route: string) => {
    // @ts-ignore
    router.push(route);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6d4aff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>{userName}님 안녕하세요!</Text>
        <Text style={styles.levelText}>
          현재 레벨은 <Text style={styles.highlight}>{userLevel}</Text> 입니다.
        </Text>
        <Text style={{ marginTop: 8, color: "#666", fontSize: 14 }}>
          {userLevel}에 딱 맞는 학습을 상단에 준비했어요.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>학습 코스 선택</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sortedCourses.map((course) => {
          // 추천 여부 확인
          const isRecommended = course.level === userLevel;

          return (
            <Animated.View
              key={course.id}
              style={[
                styles.card,
                // 추천 코스: 테두리 색상 애니메이션, 두께 3 (고정)
                // 비추천 코스: 회색 테두리, 두께 1 (고정)
                isRecommended
                  ? {
                      borderColor: borderColor,
                      borderWidth: 3,
                    }
                  : {
                      borderColor: "#EAEAEA",
                      borderWidth: 1,
                    },
              ]}
            >
              <Pressable
                onPress={() => handleStartStudy(course.route)}
                style={{ width: "100%" }}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.badge,
                      course.level === "초급"
                        ? { backgroundColor: "#E3F2FD" }
                        : course.level === "중급"
                        ? { backgroundColor: "#FFF3E0" }
                        : { backgroundColor: "#FFEBEE" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        course.level === "초급"
                          ? { color: "#1E88E5" }
                          : course.level === "중급"
                          ? { color: "#FB8C00" }
                          : { color: "#E53935" },
                      ]}
                    >
                      {course.level}
                    </Text>
                  </View>
                  {isRecommended && (
                    <Text
                      style={{
                        color: "#FF0000",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      추천 학습!
                    </Text>
                  )}
                </View>

                <Text style={styles.cardTitle}>{course.title}</Text>
                <Text style={styles.cardDesc}>{course.description}</Text>

                <View
                  style={[
                    styles.button,
                    isRecommended ? { backgroundColor: "#FF5252" } : {},
                  ]}
                >
                  <Text style={styles.buttonText}>학습 시작하기</Text>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
