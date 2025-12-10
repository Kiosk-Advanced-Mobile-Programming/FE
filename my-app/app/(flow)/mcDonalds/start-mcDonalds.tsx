// app/(flow)/select-cafe.tsx
import PrepareModal from "@/components/mcDonalds/PrepareModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
// [추가] API 및 상태 관리 함수 임포트
import { startStudySession } from "@/firebase/study";
import { resetMcDonaldsTouch } from "./globalState";
// [추가] Alert 임포트
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { recordMcDonaldsSuccess } from "./globalState"; // 임포트
import styles from "./start-mcDonalds.style";

const BANNER_IMAGES = [
  require("@assets/images/mcDonalds/banner/banner_genz.jpg"),
  require("@assets/images/mcDonalds/banner/banner_gmShake.jpg"),
  require("@assets/images/mcDonalds/banner/banner_icedTea.jpg"),
  require("@assets/images/mcDonalds/banner/banner_mcCrispy.png"),
  require("@assets/images/mcDonalds/banner/banner_mcLunch.jpg"),
  require("@assets/images/mcDonalds/banner/banner_mcMorning.jpg"),
  require("@assets/images/mcDonalds/banner/banner_mcWing.jpg"),
  require("@assets/images/mcDonalds/banner/banner_milkAndBerry.jpg"),
  require("@assets/images/mcDonalds/banner/banner_treats.jpg"),
  require("@assets/images/mcDonalds/banner/banner_mcDrive.jpg"),
  require("@assets/images/mcDonalds/banner/banner_gmShake.jpg"),
];

export default function McDonaldsStart() {
  const { mode } = useLocalSearchParams(); // start에서 넘긴 mode 사용 가능

  // Modal 상태 관리
  const [modalVisible, setModalVisible] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // [추가] 로딩 상태 관리
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return (prevIndex + 1) % BANNER_IMAGES.length;
      });
    }, 3000); // todo 10초로 변경
    return () => clearInterval(interval);
  }, []);

  // [추가] 학습 시작 핸들러 함수 정의
  const handleStartPractice = async () => {
    try {
      setLoading(true);

      // 1. 터치 카운트 초기화
      resetMcDonaldsTouch();

      // [추가] 주문 시작 버튼 클릭은 유의미한 행동임
      recordMcDonaldsSuccess();

      // 2. 학습 세션 시작 (DB 저장)
      const sessionId = await startStudySession({
        categoryName: "맥도날드",
        sessionName: "자율학습",
      });

      console.log("맥도날드 세션 시작:", sessionId);

      // 3. 다음 화면으로 sessionId 전달하며 이동
      router.push({
        pathname: "/(flow)/mcDonalds/select-menu",
        params: { sessionId: sessionId },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "학습을 시작할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. container (flex: 1) */}
      <View style={styles.container}>
        <Image
          source={BANNER_IMAGES[currentImageIndex]}
          style={styles.bannerImage}
        />

        <View style={styles.noticeBar}>
          <Text style={styles.noticeText}>
            * 카카오 선물하기, 모바일 상품권 사용 가능 (무료 쿠폰 사용은
            카운터에서 문의해주세요)
          </Text>
          <Text style={styles.noticeText}>
            * 현금 결제는 카운터에서만 가능 Please pay at Front Counter for Cash
          </Text>
          <Text style={styles.noticeText}>
            * 상기 이미지는 실제와 다를 수 있습니다.
          </Text>
        </View>

        <View style={styles.interactionContainer}>
          <View style={styles.leftPane}>
            {/* [수정] 주문하기 버튼에 핸들러 연결 및 로딩 처리 */}
            <Pressable
              style={({ pressed }) => [
                styles.orderButton,
                // 로딩 중이거나 눌렸을 때 스타일 처리 (선택사항)
                // pressed && styles.pressed
              ]}
              onPress={handleStartPractice} // 기존 router.push 대신 핸들러 사용
              disabled={loading} // 로딩 중 중복 클릭 방지
            >
              {loading ? (
                // 로딩 중이면 인디케이터 표시
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.orderButtonText}>주문하기</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.rightPane}>
            <Pressable
              style={styles.qrButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.qrText}>포인트를</Text>
              <Text style={styles.qrText}>적립하세요</Text>
              <Ionicons name="qr-code-outline" size={60} color="black" />
            </Pressable>
          </View>

          <PrepareModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)} // 닫기 버튼 누르면 꺼짐
            message="실제 키오스크에서는 맥도날드 앱을 열어 QR코드를 인식시켜 포인트를 적립할 수 있어요."
          />
        </View>
      </View>
    </>
  );
}
