import { loginWithEmail } from "@/firebase/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./_LoginPage.styles";

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
      // 로그인 성공 시 바로 이동 (dialog 없이)
      router.replace("/(tabs)/home");
    } catch (err: any) {
      setDialog({
        title: "로그인 실패",
        message: "이메일 또는 비밀번호를 확인해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignup = () => {
    // 회원가입 페이지로 이동
    router.push("/(loginPage)/SignupPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KIOSK-APP</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "로그인 중..." : "로그인"}
        </Text>
      </Pressable>

      {/* 회원가입 버튼: 이동 기능만 수행 */}
      <Pressable
        onPress={handleGoToSignup}
        disabled={loading}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>회원가입 하러가기</Text>
      </Pressable>

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
