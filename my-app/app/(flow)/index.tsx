import LogoutButton from "@/components/logout/LogoutButton";
import { auth, db } from "@/firebase/app";
import { useFocusEffect } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 사용자 데이터 타입 정의
interface UserData {
  email: string;
  nickname: string;
  age: string;
  gender: string;
  kioskLevel: string;
}

export default function UserInfoScreen() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUserInfo = async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            setLoading(false);
            return;
          }

          // Firestore에서 추가 정보 가져오기
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists() && isActive) {
            const data = userSnap.data();
            setUserData({
              email: user.email || "",
              // 닉네임이 없으면 "null" 문자열 표시 (요청사항)
              nickname: data.nickname || "null",
              age: data.age || "-",
              gender: data.gender || "-",
              kioskLevel: data.kioskLevel || "초급",
            });
          }
        } catch (e) {
          console.error("내 정보 불러오기 실패", e);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchUserInfo();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6d4aff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>내 정보</Text>

      {/* 정보 표시 카드 */}
      <View style={styles.card}>
        {/* 1. 유저 아이디 (이메일) */}
        <View style={styles.row}>
          <Text style={styles.label}>아이디</Text>
          <Text style={styles.value}>{userData?.email}</Text>
        </View>

        <View style={styles.separator} />

        {/* 2. 비밀번호 (가림 표시) */}
        <View style={styles.row}>
          <Text style={styles.label}>비밀번호</Text>
          <Text style={styles.value}>●●●●●●</Text>
        </View>

        <View style={styles.separator} />

        {/* 3. 닉네임 */}
        <View style={styles.row}>
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.value}>{userData?.nickname}</Text>
        </View>

        <View style={styles.separator} />

        {/* 4. 나이 */}
        <View style={styles.row}>
          <Text style={styles.label}>나이</Text>
          <Text style={styles.value}>{userData?.age}세</Text>
        </View>

        <View style={styles.separator} />

        {/* 5. 성별 */}
        <View style={styles.row}>
          <Text style={styles.label}>성별</Text>
          <Text style={styles.value}>{userData?.gender}</Text>
        </View>

        <View style={styles.separator} />

        {/* 6. 키오스크 레벨 */}
        <View style={styles.row}>
          <Text style={styles.label}>학습 레벨</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{userData?.kioskLevel}</Text>
          </View>
        </View>
      </View>

      {/* 7. 로그아웃 버튼 */}
      <View style={styles.logoutContainer}>
        <LogoutButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  levelBadge: {
    backgroundColor: "#E3D7FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  levelText: {
    color: "#6d4aff",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoutContainer: {
    marginTop: 10,
  },
});
