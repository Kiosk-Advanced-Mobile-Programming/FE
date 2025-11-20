import { loginWithEmail, signupWithEmail } from "@/firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./LoginPage.styles"; // 스타일 import

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const handleLogin = async () => {
    if (!email || !pw) {
      setDialog({
        title: "입력 오류",
        message: "이메일과 비밀번호를 입력하세요.",
      });
      return;
    }
    try {
      setLoading(true);
      await loginWithEmail(email, pw);
      setDialog({
        title: "로그인 성공",
        message: "학습을 시작할 수 있습니다.",
      });
      router.push("/(flow)/start");
    } catch (err: any) {
      setDialog({
        title: "로그인 실패",
        message: err.message ?? "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !pw) {
      setDialog({
        title: "입력 오류",
        message: "이메일과 비밀번호를 입력하세요.",
      });
      return;
    }
    try {
      setLoading(true);
      await signupWithEmail(email, pw);
      setDialog({
        title: "회원가입 성공",
        message: "이제 로그인할 수 있습니다.",
      });
    } catch (err: any) {
      setDialog({
        title: "회원가입 실패",
        message: err.message ?? "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KIOSK-APP</Text>

      {/* 이메일 입력 */}
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
      />

      {/* 로그인 버튼 */}
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "로그인 중..." : "로그인"}
        </Text>
      </Pressable>

      {/* 회원가입 버튼 */}
      <Pressable
        onPress={handleSignup}
        disabled={loading}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>
          {loading ? "가입 중..." : "회원가입"}
        </Text>
      </Pressable>

      {/* 커스텀 다이얼로그 */}
      <Modal
        visible={dialog !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDialog(null)}
      >
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>{dialog?.title}</Text>
            <Text style={styles.dialogMessage}>{dialog?.message}</Text>
            <Pressable
              onPress={() => setDialog(null)}
              style={styles.dialogButton}
            >
              <Text style={styles.dialogButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
