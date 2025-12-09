import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./lastpage.styles";

// megacoffee.tsx에서 정의된 타입과 전역 상태를 재사용하여 정보 표시
import { CART_STORAGE } from "./megacoffee";

// 💡 [수정] 전역 미션 상태를 가져오는 함수 임포트
import { endSessionAndGetResult } from "./globalState";

//firebase 학습 종료 데이터 저장 함수
import { finishStudySession } from "@/firebase/study";

// ====================================================================
// 타입 정의
// ====================================================================

type PaymentMethodType =
  | "card"
  | "app"
  | "kt"
  | "uwoo"
  | "pay"
  | "coupon"
  | null;

// ====================================================================
// 임시 데이터 및 로직
// ====================================================================

// 임시 결제 정보 계산 함수
const calculateCartSummary = () => {
  // 실제 장바구니 데이터를 기반으로 계산
  const cartTotalPrice =
    CART_STORAGE.reduce(
      (total, item) =>
        total +
        item.basePrice * item.quantity +
        item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0) *
          item.quantity,
      0
    ) || 5000;
  const discountPrice = 0; // 임시 할인 금액
  return { cartTotalPrice, discountPrice };
};

// 범용적인 Placeholder 액션 핸들러
const handlePlaceholderAction = (
  name: string,
  methodType: PaymentMethodType,
  setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethodType>>
) => {
  setSelectedMethod(methodType);
  Alert.alert(
    "기능 미구현",
    `${name} 결제/할인 기능은 현재 구현되지 않았습니다.`
  );
};

// ====================================================================
// 컴포넌트 분리
// ====================================================================

// 3. 제휴 할인 버튼 섹션 Props (Layer 1)
interface AllianceButtonProps {
  name: string;
  icon: string;
  subText?: string;
  methodKey: PaymentMethodType;
  selectedMethod: PaymentMethodType;
  onPress: () => void;
}

const AllianceButton: React.FC<AllianceButtonProps> = ({
  name,
  icon,
  subText,
  methodKey,
  selectedMethod,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.allianceButton,
      selectedMethod === methodKey && styles.paymentButtonActive,
    ]}
    onPress={onPress}
  >
    <Text style={styles.allianceIcon}>{icon}</Text>
    <Text style={styles.allianceMainText}>{name}</Text>
    {subText && <Text style={styles.allianceSubText}>{subText}</Text>}
  </TouchableOpacity>
);

// const sendMissionResultToBackend = async (resultData: {
//   categoryName: string;
//   sessionName: string;
//   totalTouches: number;
//   successTouches: number;
//   sessionStatus: "성공" | "실패";
// }) => {
//   const API_ENDPOINT = "https://your-backend-api.com/mission-results";

//   console.log("--- [EDIYA] 백엔드로 전송할 데이터 ---");
//   console.log(JSON.stringify(resultData, null, 2));
//   console.log("------------------------------------");

//   try {
//     const response = await fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(resultData),
//     });
//     if (!response.ok) throw new Error(`서버 응답 오류: ${response.status}`);
//     console.log("✅ [EDIYA] 백엔드 전송 성공");
//   } catch (error) {
//     console.error("🔥 [EDIYA] 백엔드 전송 실패:", error);
//   }
// };

const PaymentSelectionPage: React.FC = () => {
  const params = useLocalSearchParams<{
    requirement: string;
    label: string;
    missionId: string;
    sessionId: string;
  }>();
  const { cartTotalPrice, discountPrice } = calculateCartSummary();
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("card");

  const handleCardPaymentLogic = async () => {
    const finalResult = endSessionAndGetResult();
    const backendData = {
      categoryName: finalResult.categoryName,
      sessionName: finalResult.sessionName,
      totalTouches: finalResult.totalTouches,
      successTouches: finalResult.successTouches,
      sessionStatus: (finalResult.isSuccess ? "SUCCESS" : "FAIL") as
        | "SUCCESS"
        | "FAIL",
    };

    // firebase 종료 데이터 DB에 저장
    await finishStudySession(
      params.sessionId,
      backendData.totalTouches,
      backendData.successTouches,
      backendData.sessionStatus
    );

    // await sendMissionResultToBackend(backendData);
    router.push({
      pathname: "/(flow)/ediya/result",
      params: {
        isSuccess: String(finalResult.isSuccess),
        totalTouches: String(finalResult.totalTouches),
        missionId: params.missionId || "",
        missionTitle: params.label || "",
        requirement: params.requirement || "",
      },
    });
  };

  const finalStyles = styles || fallbackStyles;

  return (
    <View style={finalStyles.pageWrap}>
      <View style={finalStyles.modalHeaderBar}>
        <Text style={finalStyles.modalHeaderBarText}>
          결제 수단 선택 ({cartTotalPrice.toLocaleString()}원)
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={finalStyles.modalCloseButton}
        >
          <Text style={finalStyles.modalCloseIcon}>X</Text>
        </Pressable>
      </View>
      <ScrollView style={finalStyles.modalContentScroll}>
        <Text style={finalStyles.stepTitle}>
          STEP2 결제방식을 선택해주세요.
        </Text>
        <View style={finalStyles.allianceButtonRow}>
          <AllianceButton
            name="모바일 페이"
            icon="📱"
            methodKey="kt"
            selectedMethod={selectedMethod}
            onPress={() =>
              handlePlaceholderAction("모바일 페이", "kt", setSelectedMethod)
            }
          />
          <AllianceButton
            name="모바일 쿠폰 멤버스 쿠폰"
            icon="🎫"
            methodKey="uwoo"
            selectedMethod={selectedMethod}
            onPress={() =>
              handlePlaceholderAction(
                "모바일 쿠폰 멤버스 쿠폰",
                "uwoo",
                setSelectedMethod
              )
            }
          />
          <AllianceButton
            name="이디야 카드결제"
            icon="💰"
            methodKey="app"
            selectedMethod={selectedMethod}
            onPress={() =>
              handlePlaceholderAction(
                "이디야 카드결제",
                "app",
                setSelectedMethod
              )
            }
          />
          <AllianceButton
            name="카드결제"
            icon="💳"
            methodKey="card"
            selectedMethod={selectedMethod}
            onPress={handleCardPaymentLogic}
          />
        </View>
      </ScrollView>
      <View style={finalStyles.modalFooter}>
        <View style={finalStyles.footerSummary}>
          <Text style={finalStyles.footerSummaryText}>
            주문금액: {cartTotalPrice.toLocaleString()}원
          </Text>
          <Text style={finalStyles.footerSummaryText}>
            - 할인금액: {discountPrice.toLocaleString()}원
          </Text>
        </View>
        <View style={finalStyles.footerTotal}>
          <Text style={finalStyles.footerTotalText}>결제금액:</Text>
          <Text style={finalStyles.footerTotalValue}>
            {cartTotalPrice.toLocaleString()}원
          </Text>
        </View>
      </View>
    </View>
  );
};

const fallbackStyles = StyleSheet.create({
  pageWrap: { flex: 1, backgroundColor: "#fff" },
  modalHeaderBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalHeaderBarText: { fontSize: 18, fontWeight: "bold" },
  modalCloseButton: { padding: 5 },
  modalCloseIcon: { fontSize: 18, color: "#666" },
  modalContentScroll: { flex: 1, padding: 20 },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  allianceButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  allianceButton: {
    width: "48%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginVertical: 5,
  },
  paymentButtonActive: { borderColor: "#007bff", borderWidth: 2 },
  allianceIcon: { fontSize: 30, marginBottom: 5 },
  allianceMainText: { fontSize: 14, fontWeight: "600", textAlign: "center" },
  allianceSubText: { fontSize: 12, color: "#999", textAlign: "center" },
  modalFooter: { borderTopWidth: 1, borderTopColor: "#eee", padding: 20 },
  footerSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  footerSummaryText: { fontSize: 14, color: "#666" },
  footerTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerTotalText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  footerTotalValue: { fontSize: 24, fontWeight: "bold", color: "#007bff" },
});

export default PaymentSelectionPage;
