import { signupWithEmail } from "@/firebase/auth";
import { saveUserProfile } from "@/firebase/user";
import { router, Stack } from "expo-router"; // [수정] Stack 추가
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./_SignupPage.styles";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"남성" | "여성">("남성");
  const [level, setLevel] = useState<"초급" | "중급" | "고급">("초급");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !pw || !age || !nickname) {
      alertMsg("모든 정보를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      // 1. Firebase Auth 회원가입
      const user = await signupWithEmail(email, pw);

      if (user) {
        // 2. Firestore에 추가 정보 저장
        await saveUserProfile(user.uid, {
          email,
          nickname,
          age,
          gender,
          kioskLevel: level,
        });

        alertMsg("회원가입 성공! 로그인해주세요.");
        router.back(); // 로그인 페이지로 돌아가기
      }
    } catch (err: any) {
      console.log(err);
      alertMsg("회원가입 실패: " + (err.message || "오류가 발생했습니다."));
    } finally {
      setLoading(false);
    }
  };

  const alertMsg = (msg: string) => {
    if (Platform.OS === "web") {
      window.alert(msg);
    } else {
      Alert.alert("알림", msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* [추가] 헤더 설정: 제목을 '회원가입'으로, 뒤로가기 버튼 텍스트 설정 */}
      <Stack.Screen
        options={{
          title: "뒤로가기", // 헤더 중앙 제목
          headerBackTitle: "뒤로가기", // iOS 뒤로가기 버튼 텍스트
          headerShadowVisible: false, // 헤더 하단 그림자 제거 (깔끔하게)
          headerStyle: { backgroundColor: "#fff" }, // 헤더 배경색
          headerTintColor: "#333", // 헤더 글자색
        }}
      />

      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        placeholder="example@email.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="6자리 이상 입력"
        placeholderTextColor="#999"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />

      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="앱에서 사용할 별명"
        placeholderTextColor="#999"
        value={nickname}
        onChangeText={setNickname}
      />

      <Text style={styles.label}>나이</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 65"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>성별</Text>
      <View style={styles.row}>
        {["남성", "여성"].map((g) => (
          <Pressable
            key={g}
            style={[styles.selectButton, gender === g && styles.selectedButton]}
            onPress={() => setGender(g as any)}
          >
            <Text
              style={[
                styles.selectButtonText,
                gender === g && styles.selectedButtonText,
              ]}
            >
              {g}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>키오스크 익숙함 정도</Text>
      <View style={styles.row}>
        {["초급", "중급", "고급"].map((l) => (
          <Pressable
            key={l}
            style={[styles.selectButton, level === l && styles.selectedButton]}
            onPress={() => setLevel(l as any)}
          >
            <Text
              style={[
                styles.selectButtonText,
                level === l && styles.selectedButtonText,
              ]}
            >
              {l}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.submitButton}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? "가입 처리 중..." : "가입하기"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
