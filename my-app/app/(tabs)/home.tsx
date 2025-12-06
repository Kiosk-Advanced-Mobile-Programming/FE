import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "./_home.styles";

export default function HomeScreen() {
  const router = useRouter();

  // 1. 키오스크 학습 시작
  const handleStartLearning = () => {
    router.push("/(flow)/select-brand");
  };

  // 2. 단어 설명
  const handleWordExplanation = () => {
    router.push("/(flow)/testPage");
  };

  // 3. 맞춤 학습
  const handleCustomLearning = () => {
    router.push("/(tabs)/levelSession/recommend");
  };

  // 4. 학습 통계
  const handleStats = () => {
    router.push("/(tabs)/mySessionList/stats");
  };

  // 5. 마이페이지 이동 (추가됨)
  const handleMyPage = () => {
    router.push("/(tabs)/userInfo/infoLogout");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 영역 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>홈</Text>

        {/* 우측 상단 마이페이지 버튼 (추가됨) */}
        <Pressable onPress={handleMyPage} style={styles.myPageButton}>
          <Text style={styles.myPageText}>마이페이지</Text>
          <IconSymbol name="person.circle" size={20} color="#555" />
        </Pressable>
      </View>

      {/* 메인 콘텐츠 영역 (스크롤 적용) */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          안녕하세요!{"\n"}
          오늘도 키오스크를 배워볼까요?
        </Text>

        {/* 1. 키오스크 학습 시작 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleStartLearning}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>키오스크 학습시작</Text>
            <Text style={styles.cardDescription}>
              다양한 매장의 키오스크 주문을{"\n"}
              실전처럼 연습해보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 2. 단어 설명 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleWordExplanation}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>단어 설명</Text>
            <Text style={styles.cardDescription}>
              어려운 키오스크 용어들을{"\n"}
              쉽고 재미있게 배워보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 3. 맞춤 학습 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleCustomLearning}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>맞춤 학습</Text>
            <Text style={styles.cardDescription}>
              나의 수준에 딱 맞는{"\n"}
              학습 코스를 추천해드려요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 4. 학습 통계 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleStats}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>학습 통계</Text>
            <Text style={styles.cardDescription}>
              나의 학습 기록과 성장을{"\n"}
              한눈에 확인해보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 하단 여백 추가 */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
