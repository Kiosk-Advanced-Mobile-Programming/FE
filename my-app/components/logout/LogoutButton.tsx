import { logout } from "@/firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./_LogoutButton.styles";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  // 다이얼로그 표시 여부 상태
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutPress = () => {
    setShowConfirm(true); // 다이얼로그 열기
  };

  const handleConfirmLogout = async () => {
    try {
      setLoading(true);
      setShowConfirm(false); // 다이얼로그 닫기
      await logout();

      // 로그아웃 성공 시 로그인 페이지로 이동
      router.replace("/(loginPage)/LoginPage");
    } catch (err: any) {
      console.error(err);
      // 에러 발생 시 간단한 alert나 콘솔 로그 (필요 시 에러 모달 추가 가능)
      alert("로그아웃 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false); // 다이얼로그 닫기
  };

  return (
    <>
      {/* 로그아웃 버튼 */}
      <Pressable
        onPress={handleLogoutPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        disabled={loading}
      >
        <Text style={styles.text}>
          {loading ? "로그아웃 중..." : "로그아웃"}
        </Text>
      </Pressable>

      {/* 커스텀 확인 다이얼로그 (Modal) */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>로그아웃</Text>
            <Text style={styles.dialogMessage}>
              정말 로그아웃 하시겠습니까?
            </Text>

            <View style={styles.dialogButtonRow}>
              {/* 취소 버튼 */}
              <Pressable
                onPress={handleCancel}
                style={[styles.dialogButton, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </Pressable>

              {/* 확인(로그아웃) 버튼 */}
              <Pressable
                onPress={handleConfirmLogout}
                style={[styles.dialogButton, styles.confirmButton]}
              >
                <Text style={styles.confirmButtonText}>로그아웃</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
