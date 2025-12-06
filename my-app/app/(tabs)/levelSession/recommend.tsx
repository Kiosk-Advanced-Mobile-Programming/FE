import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
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
  targetLevels: string[]; // 이 학습이 추천되는 레벨들
  route: string; // 이동할 경로
}

const COURSES: Course[] = [
  {
    id: "mega_basic",
    title: "메가커피 : 음료 한 잔 주문하기",
    description:
      "가장 기본적인 키오스크 사용법을 익힙니다. 천천히 따라해보세요.",
    targetLevels: ["초급", "중급"],
    route: "/(flow)/mcDonalds/start-mcDonalds",
  },

  {
    id: "mc_basic",
    title: "맥도날드 : 햄버거 세트 주문",
    description:
      "메뉴 선택부터 옵션 변경, 결제까지 이어지는 과정을 연습합니다.",
    targetLevels: ["중급", "고급"],
    route: "/(flow)/megacoffee/startPage",
  },

  {
    id: "cgv_test",
    title: "CGV & 다양한 키오스크",
    description: "영화 예매 등 복잡한 키오스크 사용법을 마스터합니다.",
    targetLevels: ["고급"],
    route: "/(flow)/testPage", // 아직 UI가 없으므로 테스트 페이지로 연결
  },
];

export default function RecommendScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>("초급"); // 기본값
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
            // 이메일 앞부분 등을 이름으로 사용 (또는 별도 name 필드가 있다면 사용)
            setUserName(user.email ? user.email.split("@")[0] : "사용자");
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

  // 현재 레벨에 맞는 코스 필터링
  // 초급자는 초급 코스만, 중급자는 초급+중급, 고급자는 모든 코스 추천 (또는 레벨별 맞춤 로직)
  const recommendedCourses = COURSES.filter((course) =>
    course.targetLevels.includes(userLevel)
  );

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
      {/* 상단 헤더: 내 레벨 표시 */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>{userName}님 안녕하세요!</Text>
        <Text style={styles.levelText}>
          현재 레벨은 <Text style={styles.highlight}>{userLevel}</Text> 입니다.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>추천 학습 코스</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {recommendedCourses.length > 0 ? (
          recommendedCourses.map((course) => (
            <View key={course.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>추천</Text>
                </View>
              </View>

              <Text style={styles.cardTitle}>{course.title}</Text>
              <Text style={styles.cardDesc}>{course.description}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
                onPress={() => handleStartStudy(course.route)}
              >
                <Text style={styles.buttonText}>학습 시작하기</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            현재 추천할 수 있는 학습이 없습니다.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
