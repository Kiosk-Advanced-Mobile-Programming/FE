// my-app/app/(tabs)/home.tsx
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const KioskSessionVideoSource = require("@/assets/mp4/kioskSession.mp4");

// 기능 카드 데이터
const FEATURES = [
  {
    id: "1",
    title: "난이도 맞춤 학습",
    description: "나의 수준에 딱 맞는\n학습 코스를 추천해드려요",
    icon: "star.fill",
    gradient: {
      start: Colors.light.primary,
      end: Colors.light.primaryLight,
    },
    iconBg: Colors.light.primaryLighter,
    iconColor: Colors.light.primary,
    route: "/(tabs)/levelSession/recommend",
  },
  {
    id: "2",
    title: "AI 단어 설명",
    description: "어려운 키오스크 용어들을\n쉽고 재미있게 배워보세요",
    icon: "book.fill",
    gradient: {
      start: Colors.light.secondary,
      end: Colors.light.secondaryLight,
    },
    iconBg: Colors.light.secondaryLighter,
    iconColor: Colors.light.secondary,
    route: "/(flow)/kioskWord/wordExplanation",
  },
  {
    id: "3",
    title: "나의 학습 통계",
    description: "나의 학습 기록과 성장을\n한눈에 확인해보세요",
    icon: "chart.bar.fill",
    gradient: {
      start: Colors.light.success,
      end: Colors.light.successLight,
    },
    iconBg: Colors.light.successLighter,
    iconColor: Colors.light.success,
    route: "/(tabs)/mySessionList/stats",
  },
  {
    id: "4",
    title: "키오스크 학습 영상",
    description: "키오스크 사용 전 기본기를\n영상으로 미리 배워보세요",
    icon: "play.rectangle.fill",
    gradient: {
      start: Colors.light.info,
      end: Colors.light.infoLight,
    },
    iconBg: Colors.light.infoLighter,
    iconColor: Colors.light.info,
    route: null, // 모달 오픈
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  const handleFeaturePress = (feature: (typeof FEATURES)[0]) => {
    if (feature.route) {
      router.push(feature.route as any);
    } else {
      setIsVideoModalVisible(true);
    }
  };

  const handleMyPage = () => {
    router.push("/(tabs)/userInfo/infoLogout");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>홈</Text>
        <Pressable onPress={handleMyPage} style={styles.myPageButton}>
          <Text style={styles.myPageText}>마이페이지</Text>
          <IconSymbol name="person.circle" size={20} color="#6B7280" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 인사말 카드 */}
        <View style={styles.greetingCard}>
          <Text style={styles.greetingTitle}>안녕하세요! 👋</Text>
          <Text style={styles.greetingSubtitle}>
            오늘도 키오스크를 배워볼까요?
          </Text>
        </View>

        {/* 기능 카드들 */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((feature) => (
            <Pressable
              key={feature.id}
              style={({ pressed }) => [
                styles.featureCard,
                pressed && styles.featureCardPressed,
              ]}
              onPress={() => handleFeaturePress(feature)}
            >
              {/* 아이콘 */}
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: feature.iconBg },
                ]}
              >
                <IconSymbol
                  name={feature.icon}
                  size={28}
                  color={feature.iconColor}
                />
              </View>

              {/* 텍스트 */}
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>

              {/* 화살표 */}
              <IconSymbol name="chevron.right" size={24} color="#D1D5DB" />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* 비디오 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVideoModalVisible}
        onRequestClose={() => setIsVideoModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsVideoModalVisible(false)}
        >
          <Pressable
            onPress={() => setIsVideoModalVisible(false)}
            style={styles.floatingCloseButton}
          >
            <IconSymbol name="xmark" size={30} color="#fff" />
          </Pressable>

          <TouchableWithoutFeedback>
            <View style={styles.videoModalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>키오스크 사용법 영상</Text>
              </View>

              <View style={styles.videoPlayerContainer}>
                <Video
                  source={KioskSessionVideoSource}
                  style={styles.videoPlayer}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  shouldPlay
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
  myPageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  myPageText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // 인사말 카드
  greetingCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.white,
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: Colors.light.white,
    opacity: 0.95,
  },

  // 기능 카드
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  featureCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },

  // 모달
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingCloseButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 100,
    padding: 10,
  },
  videoModalContainer: {
    width: 370,
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: Colors.light.white,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  videoPlayerContainer: {
    height: 210,
    backgroundColor: "#000",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
});
