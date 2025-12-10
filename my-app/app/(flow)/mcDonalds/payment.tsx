// app/(flow)/mcDonalds/payment.tsx
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useCart } from "./cart-context";
import { recordMcDonaldsSuccess } from "./globalState";

export default function PaymentScreen() {
  const router = useRouter();
  const { clearCart } = useCart();

  // [추가] sessionId 받기
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  const [isProcessing, setIsProcessing] = useState(false);

  // ✨ [추가] 준비 중 알림 모달 상태
  const [showAlertModal, setShowAlertModal] = useState(false);

  // ✨ [추가] 준비 중인 기능 클릭 시 실행
  const handleNotImplemented = () => {
    setShowAlertModal(true);
  };

  const handlePayment = () => {
    recordMcDonaldsSuccess();
    setIsProcessing(true);
    // 3초 후 주문 완료 화면으로 이동 (카드 결제 시뮬레이션)
    setTimeout(() => {
      setIsProcessing(false);
      // 완료 화면으로 이동
      router.push({
        pathname: "/(flow)/mcDonalds/order-complete",
        params: { sessionId: sessionId }, // [수정] 완료 화면으로 전달
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "결제" }} />

      <Text style={styles.title}>결제 방법을 선택해 주세요</Text>

      <View style={styles.optionsContainer}>
        {/* 카카오페이 - 클릭 시 준비 중 모달 띄움 */}
        <Pressable style={styles.optionCard} onPress={handleNotImplemented}>
          <View style={styles.iconBox}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>pay</Text>
          </View>
          <Text style={styles.optionText}>카카오페이</Text>
        </Pressable>

        {/* 모바일 상품권 - 클릭 시 준비 중 모달 띄움 */}
        <Pressable style={styles.optionCard} onPress={handleNotImplemented}>
          <View style={[styles.iconBox, { backgroundColor: "#eee" }]}>
            <Text style={{ fontSize: 30 }}>📱</Text>
          </View>
          <Text style={styles.optionText}>모바일 상품권</Text>
        </Pressable>

        {/* 신용카드 (기존 동작 유지) */}
        <Pressable style={styles.optionCard} onPress={handlePayment}>
          <View style={[styles.iconBox, { backgroundColor: "#FFBC0D" }]}>
            <Text style={{ fontSize: 30 }}>💳</Text>
          </View>
          <Text style={styles.optionText}>신용카드 결제</Text>
        </Pressable>
      </View>

      {/* 1. 카드 투입 모달 (Processing) */}
      <Modal visible={isProcessing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>IC신용/체크카드 사용시</Text>
            <Text style={styles.modalDesc}>
              카드를 화살표 방향으로 투입구에 넣어주세요
            </Text>
            <View style={styles.cardSlotPlaceholder}>
              <Text style={{ fontSize: 50 }}>⬇️ 💳</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✨ 2. [추가] 준비 중 알림 모달 */}
      <Modal visible={showAlertModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: 250 }]}>
            <Text style={{ fontSize: 40, marginBottom: 10 }}>🚧</Text>
            <Text style={styles.modalTitle}>준비 중인 기능입니다</Text>
            <Text style={styles.modalDesc}>
              현재는 신용카드 결제만 가능합니다.
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowAlertModal(false)}
            >
              <Text style={styles.closeButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    width: "100%",
  },
  optionCard: {
    width: "45%",
    height: 180,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FAE100",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  optionText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    height: 400,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  cardSlotPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  // ✨ [추가] 모달 닫기 버튼 스타일
  closeButton: {
    backgroundColor: "#D52B1E", // 맥도날드 레드
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
