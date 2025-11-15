// app/(tabs)/index.tsx (일부만)
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { loginWithEmail, signupWithEmail } from "@/firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !pw) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      await loginWithEmail(email, pw);
      Alert.alert("로그인 성공");
      console.log("로그인 성공");
      // 여기서 바로 학습 시작 화면으로 넘겨도 됨
      // router.push("/(flow)/start");
    } catch (err: any) {
      Alert.alert("로그인 실패", err.message);
      console.log("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !pw) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 입력하세요.");
      console.log("입력 오류", "이메일과 비밀번호를 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      await signupWithEmail(email, pw);
      Alert.alert("회원가입 성공", "이제 로그인할 수 있습니다.");
      console.log("회원가입 성공", "이제 로그인할 수 있습니다.");
    } catch (err: any) {
      Alert.alert("회원가입 실패", err.message);
      console.log("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
        KIOSK-APP
      </Text>

      {/* 이메일 입력 */}
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
        }}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
        }}
      />

      {/* 로그인 버튼 */}
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          backgroundColor: "#6d4aff",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "로그인 중..." : "로그인"}
        </Text>
      </Pressable>

      {/* 회원가입 버튼 */}
      <Pressable
        onPress={handleSignup}
        disabled={loading}
        style={{
          width: "100%",
          backgroundColor: "#4a8dff",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {loading ? "가입 중..." : "회원가입"}
        </Text>
      </Pressable>
    </View>
  );
}
