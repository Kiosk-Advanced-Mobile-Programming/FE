// my-app/app/(tabs)/levelSession/recommend.tsx
import { Colors } from "@/constants/theme";
import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useMemo, useState } from "react";
// 맨 위 import 부분에 추가
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView, // 추가
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
        {" "}
        {/* SafeAreaView 추가 */}
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
              <Pressable
                key={course.id}
                style={({ pressed }) => [
                  styles.courseCard,
                  isRecommended && styles.courseCardRecommended,
                  pressed && styles.courseCardPressed,
                ]}
                onPress={() => handleStartStudy(course.route)}
              >
                {/* 헤더 */}
                <View style={styles.courseHeader}>
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: course.bgColor },
                    ]}
                  >
                    <Text
                      style={[styles.levelBadgeText, { color: course.color }]}
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
    marginTop: Platform.OS === "android" ? 20 : 10, // 수정: 플랫폼별 여백
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
  courseCardRecommended: {
    borderWidth: 3,
    borderColor: Colors.light.primary,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
    color: Colors.light.primary,
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
    backgroundColor: Colors.light.background,
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
