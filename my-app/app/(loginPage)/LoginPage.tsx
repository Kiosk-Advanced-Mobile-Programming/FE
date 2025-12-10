import { auth } from "@/firebase/app";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground, // [추가]
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./_LoginPage.styles";

// [추가] 배경 이미지 경로 (경로 확인 필요)
const backgroundImage = require("../../assets/background.png");

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("알림", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("로그인 성공", "환영합니다!");
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "로그인에 실패했습니다.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "잘못된 이메일 형식입니다.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "가입되지 않은 이메일입니다.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "비밀번호가 일치하지 않습니다.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "이메일 또는 비밀번호를 확인해주세요.";
      }
      Alert.alert("오류", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoSignup = () => {
    router.push("/(loginPage)/SignupPage");
  };

  return (
    // [수정] 최상위 View -> ImageBackground로 변경
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover" // 배경 꽉 채우기
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          {/* 기존 디자인 유지 */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>KIOSK-APP</Text>
            <Text style={styles.subtitle}>
              디지털 취약계층을 위한 키오스크 교육
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>이메일</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력하세요"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>로그인</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleGoSignup}
            >
              <Text style={styles.signupButtonText}>회원가입 하러가기</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
