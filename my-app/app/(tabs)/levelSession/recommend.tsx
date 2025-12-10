import { Colors } from "@/constants/theme";
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
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  route: string;
  color: string;
  bgColor: string;
}

const COURSES: Course[] = [
  {
    id: "restaurant",
    title: "일반 식당",
    description: "음식점에서 메뉴를 고르고 결제하는 기본적인 방법을 배웁니다.",
    level: "초급",
    route: "/(flow)/general-restaurant",
    color: Colors.light.success,
    bgColor: Colors.light.successLighter,
  },
  {
    id: "ediya",
    title: "이디야 커피",
    description: "카페에서 음료 옵션을 선택하고 주문하는 연습을 합니다.",
    level: "중급",
    route: "/(flow)/ediya/level",
    color: Colors.light.secondary,
    bgColor: Colors.light.secondaryLighter,
  },
  {
    id: "megacoffee",
    title: "메가커피",
    description: "다양한 카페 메뉴와 옵션을 익히며 실력을 키웁니다.",
    level: "중급",
    route: "/(flow)/megacoffee/level",
    color: Colors.light.secondary,
    bgColor: Colors.light.secondaryLighter,
  },
  {
    id: "mcdonalds",
    title: "맥도날드",
    description:
      "세트 메뉴 선택, 재료 변경 등 복잡한 주문 과정을 마스터합니다.",
    level: "고급",
    route: "/(flow)/mcDonalds/start-mcDonalds",
    color: Colors.light.error,
    bgColor: Colors.light.errorLighter,
  },
];

export default function RecommendScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>("초급");
  const [userName, setUserName] = useState<string>("");

  // 깜빡거리는 애니메이션 값 (0 ~ 1)
  const blinkAnim = useRef(new Animated.Value(0)).current;

  // 애니메이션 루프 설정 (깜빡깜빡 효과)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800, // 0.8초 동안 진해짐
          useNativeDriver: false, // 색상 변경은 false 설정 필수
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 800, // 0.8초 동안 연해짐
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  // 애니메이션 값에 따라 빨간색 테두리 색상 보간
  const borderColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFCDD2", "#FF0000"], // 연한 빨강 -> 진한 빨강
  });

  // 그림자 색상도 같이 빨간색으로 깜빡이게 설정
  const shadowColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#FF0000"],
  });

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

  const sortedCourses = useMemo(() => {
    return [...COURSES].sort((a, b) => {
      const aMatch = a.level === userLevel;
      const bMatch = b.level === userLevel;

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [userLevel]);

  const handleStartStudy = (route: string) => {
    router.push(route as any);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>{userName}님 안녕하세요!</Text>
          <View style={styles.levelRow}>
            <Text style={styles.levelText}>현재 레벨은 </Text>
            <Text style={[styles.levelText, styles.levelHighlight]}>
              {userLevel}
            </Text>
            <Text style={styles.levelText}> 입니다</Text>
          </View>
          <Text style={styles.headerSubtext}>
            {userLevel}에 딱 맞는 학습을 상단에 준비했어요
          </Text>
        </View>

        <Text style={styles.sectionTitle}>학습 코스 선택</Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {sortedCourses.map((course) => {
            const isRecommended = course.level === userLevel;

            return (
              // [수정] Pressable을 바깥에 두고, 자식 함수 내부에서 Animated.View를 렌더링
              <Pressable
                key={course.id}
                onPress={() => handleStartStudy(course.route)}
              >
                {({ pressed }) => (
                  <Animated.View
                    style={[
                      styles.courseCard,
                      // 추천 학습일 경우: 빨간색 깜빡이는 테두리와 그림자 적용
                      isRecommended && {
                        borderWidth: 3,
                        borderColor: borderColor, // 애니메이션 색상 적용 가능
                        shadowColor: shadowColor, // 애니메이션 그림자 적용 가능
                        shadowOpacity: 0.4,
                        shadowRadius: 10,
                        elevation: 5,
                      },
                      // 눌렸을 때 투명도 조절
                      pressed && styles.courseCardPressed,
                    ]}
                  >
                    {/* 카드 내부 헤더 */}
                    <View style={styles.courseHeader}>
                      <View
                        style={[
                          styles.levelBadge,
                          { backgroundColor: course.bgColor },
                        ]}
                      >
                        <Text
                          style={[
                            styles.levelBadgeText,
                            { color: course.color },
                          ]}
                        >
                          {course.level}
                        </Text>
                      </View>
                      {isRecommended && (
                        <Text style={styles.recommendTag}>⭐ 추천 학습!</Text>
                      )}
                    </View>

                    {/* 내용 */}
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>
                      {course.description}
                    </Text>

                    {/* 버튼 */}
                    <View
                      style={[
                        styles.startButton,
                        isRecommended
                          ? styles.startButtonRecommended
                          : styles.startButtonNormal,
                      ]}
                    >
                      <Text
                        style={[
                          styles.startButtonText,
                          isRecommended
                            ? styles.startButtonTextRecommended
                            : styles.startButtonTextNormal,
                        ]}
                      >
                        학습 시작하기
                      </Text>
                    </View>
                  </Animated.View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.light.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  greetingText: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  levelText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
  },
  levelHighlight: {
    color: Colors.light.primary,
  },
  headerSubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: 24,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },

  // 코스 카드
  courseCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  courseCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  levelBadgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  recommendTag: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff3737ff",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  startButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  startButtonRecommended: {
    backgroundColor: Colors.light.primary,
  },
  startButtonNormal: {
    backgroundColor: "#e9e9e9ff",
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  startButtonTextRecommended: {
    color: Colors.light.white,
  },
  startButtonTextNormal: {
    color: Colors.light.text,
  },
});
