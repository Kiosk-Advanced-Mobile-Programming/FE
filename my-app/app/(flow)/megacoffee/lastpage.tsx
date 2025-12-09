import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
// 💡 스타일 파일 임포트 (파일명이 lastpage.styles.ts라고 가정)
import styles from "./lastpage.styles";

// 💡 전역 장바구니 데이터
import { CART_STORAGE } from "./megacoffee";

// 💡 [핵심 추가] 미션 성공 여부 확인 함수 임포트
import { endSessionAndGetResult } from "./globalState";

//firebase 학습 종료 데이터 저장 함수
import { finishStudySession } from "@/firebase/study";

// 총 가격 계산 함수
const calculateCartTotalPrice = () => {
  return CART_STORAGE.reduce((total, item) => {
    const optionCost = item.optionDetails.reduce(
      (optTotal, opt) => optTotal + opt.price,
      0
    );
    return total + (item.basePrice + optionCost) * item.quantity;
  }, 0);
};

/**
 * ***************백엔드 가져가시오************************************
 * 최종 미션 결과를 백엔드 서버로 전송합니다.
 * @param resultData - 백엔드로 보낼 데이터 객체
 */
// const sendMissionResultToBackend = async (resultData: {
//   categoryName: string;
//   sessionName: string;
//   totalTouches: number;
//   successTouches: number;
//   sessionStatus: "성공" | "실패";
// }) => {
//   // ❗️ 실제 백엔드 API 엔드포인트로 교체해야 합니다.
//   const API_ENDPOINT = "https://your-backend-api.com/mission-results";

//   console.log("--- 백엔드로 전송할 데이터 ---");
//   console.log(JSON.stringify(resultData, null, 2));
//   console.log("------------------------------------");

//   try {
//     const response = await fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(resultData),
//     });

//     if (!response.ok) {
//       throw new Error(`서버 응답 오류: ${response.status}`);
//     }

//     console.log("✅ 백엔드 전송 성공");
//   } catch (error) {
//     console.error("🔥 백엔드 전송 실패:", error);
//   }
// };

const CardPaymentTerminal: React.FC = () => {
  const params = useLocalSearchParams<{
    sessionId: string;
    requirement: string;
    label: string;
    missionId: string;
  }>();

  const cartTotalPrice = useMemo(calculateCartTotalPrice, []) || 5000;

  const handleCancelPayment = () => {
    router.back();
  };

  // 💡 [핵심 로직] 결제 승인(승인요청) 버튼 클릭 시 실행
  const handleApprovePayment = async () => {
    // 1. 💡 세션 종료 및 최종 데이터 결과 가져오기
    const finalResult = endSessionAndGetResult();

    // 2. 💡 백엔드로 보낼 데이터 객체 생성
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

    // // 3. 💡 생성된 함수를 호출하여 백엔드로 데이터 전송 (비동기)
    // await sendMissionResultToBackend(backendData);

    // // 4. 결과 페이지(result.tsx)로 이동
    router.push({
      pathname: "/(flow)/megacoffee/result",
      params: {
        isSuccess: String(finalResult.isSuccess),
        totalTouches: String(finalResult.totalTouches),
        missionId: params.missionId || "",
        missionTitle: params.label || "",
        requirement: params.requirement || "",
      },
    });
  };

  return (
    <View style={styles.pageWrap}>
      {/* 1. 상단 배너: 카드결제 & X 버튼 */}
      <View style={styles.modalHeaderBar}>
        <View style={styles.headerSpacer} />
        <Text style={styles.modalHeaderBarText}>카드 결제</Text>
        <Pressable
          style={styles.modalCloseButton}
          onPress={handleCancelPayment}
        >
          <Text style={styles.modalCloseIcon}>X</Text>
        </Pressable>
      </View>

      {/* 2. 중앙 내용: 총 주문 금액 및 할부일수 */}
      <View style={styles.contentContainer}>
        {/* 총 주문 금액 및 할부 정보 컨테이너 */}
        <View style={styles.summaryContainer}>
          {/* [1] 총 주문 금액 ROW */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKeyText}>총 주문 금액</Text>
            <Text style={styles.summaryValueText}>
              {cartTotalPrice.toLocaleString()}원
            </Text>
          </View>

          {/* [2] 할부일수 ROW */}
          <View style={[styles.summaryRow, styles.summaryRowLast]}>
            <Text style={styles.summaryKeyText}>할부일수</Text>
            <Text style={styles.summaryValueNormalText}>일시불</Text>
          </View>
        </View>

        {/* 카드 삽입/리더기 안내 메시지 */}
        <Text
          style={{
            fontSize: 18,
            color: "#333",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          카드를 단말기에 삽입해 주세요.
        </Text>
      </View>

      {/* 3. 하단 버튼 영역: 취소 및 승인요청 */}
      <View style={styles.actionButtonRow}>
        <Pressable
          style={[styles.actionButton, styles.cancelButton]}
          onPress={handleCancelPayment}
        >
          <Text style={styles.buttonText}>취소</Text>
        </Pressable>

        {/* 💡 승인요청 버튼에 로직 연결 */}
        <Pressable
          style={[styles.actionButton, styles.approveButton]}
          onPress={handleApprovePayment}
        >
          <Text style={styles.buttonText}>승인요청</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CardPaymentTerminal;
