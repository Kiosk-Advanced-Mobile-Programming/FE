import { IconSymbol } from "@/components/ui/icon-symbol";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./_home.styles";

// 로컬 비디오 에셋 임포트
const KioskSessionVideoSource = require("@/assets/mp4/kioskSession.mp4");

export default function HomeScreen() {
  const router = useRouter();
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

  // 1. 맞춤 학습
  const handleCustomLearning = () => {
    router.push("/(tabs)/levelSession/recommend");
  };

  // 2. 단어 설명
  const handleWordExplanation = () => {
    router.push("/(flow)/kioskWord/wordExplanation");
  };

  // 3. 학습 통계
  const handleStats = () => {
    router.push("/(tabs)/mySessionList/stats");
  };

  // 4. 키오스크 학습 영상 재생
  const handleVideoPress = () => {
    setIsVideoModalVisible(true);
  };

  // 5. 마이페이지 이동
  const handleMyPage = () => {
    router.push("/(tabs)/userInfo/infoLogout");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 영역 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>홈</Text>
        <Pressable onPress={handleMyPage} style={styles.myPageButton}>
          <Text style={styles.myPageText}>마이페이지</Text>
          <IconSymbol name="person.circle" size={20} color="#555" />
        </Pressable>
      </View>

      {/* 메인 콘텐츠 영역 */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          안녕하세요!{"\n"}
          오늘도 키오스크를 배워볼까요?
        </Text>

        {/* 1. 난이도 맞춤 학습 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleCustomLearning}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>난이도 맞춤 학습</Text>
            <Text style={styles.cardDescription}>
              나의 수준에 딱 맞는{"\n"}
              학습 코스를 추천해드려요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 2. AI 단어 설명 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleWordExplanation}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>AI 단어 설명</Text>
            <Text style={styles.cardDescription}>
              어려운 키오스크 용어들을{"\n"}
              쉽고 재미있게 배워보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 3. 나의 학습 통계 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleStats}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>나의 학습 통계</Text>
            <Text style={styles.cardDescription}>
              나의 학습 기록과 성장을{"\n"}
              한눈에 확인해보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        {/* 4. 키오스크 학습 영상 */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={handleVideoPress}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>키오스크 학습 영상</Text>
            <Text style={styles.cardDescription}>
              키오스크 사용 전 기본기를{"\n"}
              영상으로 미리 배워보세요.
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={24} color="#ccc" />
        </Pressable>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* 비디오 모달 다이얼로그 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVideoModalVisible}
        onRequestClose={() => setIsVideoModalVisible(false)}
      >
        {/* 1. 배경을 Pressable로 변경하여 터치 시 닫히도록 설정 */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsVideoModalVisible(false)}
        >
          {/* 닫기 버튼: 아이콘 이름을 'close'로 변경하여 호환성 확보 */}
          <Pressable
            onPress={() => setIsVideoModalVisible(false)}
            style={styles.floatingCloseButton}
          >
            {/* 만약 'xmark'도 안 나온다면 'close'를 시도해보세요. */}
            <IconSymbol name="xmark" size={30} color="#fff" />
          </Pressable>

          {/* 2. 내용 영역 터치 시에는 모달이 닫히지 않도록 보호 */}
          <TouchableWithoutFeedback>
            <View style={styles.videoModalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>키오스크 사용법 영상</Text>
              </View>

              <View style={styles.videoModalPlayerContainer}>
                <Video
                  source={KioskSessionVideoSource}
                  style={styles.videoPlayerModal}
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
