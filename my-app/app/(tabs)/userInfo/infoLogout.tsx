import LogoutButton from "@/components/logout/LogoutButton"; // 기존 로그아웃 버튼 재사용
import { auth } from "@/firebase/auth";
import { getUserProfile, UserProfile } from "@/firebase/user";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { styles } from "./_infoLogout.styles";

export default function InfoLogoutScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // 현재 로그인된 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // 1. Auth에서 이메일 가져오기
        const email = currentUser.email;

        // 2. Firestore에서 상세 프로필 가져오기
        const profile = await getUserProfile(currentUser.uid);

        if (profile) {
          setUserProfile({ ...profile, email: email || "" });
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>내 정보</Text>

      <View style={styles.infoContainer}>
        {/* 1. 아이디(이메일) */}
        <View style={styles.row}>
          <Text style={styles.label}>아이디</Text>
          <Text style={styles.value}>{userProfile?.email || "-"}</Text>
        </View>

        {/* 2. 비밀번호 (보안상 실제 비밀번호 접근 불가, UI만 구현) */}
        <View style={styles.row}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.passwordContainer}>
            <Text style={styles.value}>
              {showPassword ? "********" : "●●●●●●●●"}
            </Text>
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁️"}</Text>
            </Pressable>
          </View>
        </View>

        {/* 3. 닉네임 */}
        <View style={styles.row}>
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.value}>{userProfile?.nickname || "-"}</Text>
        </View>

        {/* 4. 나이 */}
        <View style={styles.row}>
          <Text style={styles.label}>나이</Text>
          <Text style={styles.value}>{userProfile?.age || "-"}</Text>
        </View>

        {/* 5. 성별 */}
        <View style={styles.row}>
          <Text style={styles.label}>성별</Text>
          <Text style={styles.value}>{userProfile?.gender || "-"}</Text>
        </View>

        {/* 6. 키오스크 레벨 */}
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>레벨</Text>
          <Text
            style={[styles.value, { color: "#0a7ea4", fontWeight: "bold" }]}
          >
            {userProfile?.kioskLevel || "초급"}
          </Text>
        </View>
      </View>

      {/* 7. 로그아웃 버튼 */}
      <View style={styles.logoutButtonContainer}>
        <LogoutButton />
      </View>
    </View>
  );
}
