// app/(tabs)/index.tsx (일부만)
import LogoutButton from "@/components/logout/LogoutButton";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeTab() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>홈</Text>
      <Pressable onPress={() => router.push("/(flow)/start")}>
        <Text
          style={{
            padding: 12,
            backgroundColor: "#6d4aff",
            color: "white",
            borderRadius: 10,
          }}
        >
          카오스크 학습 시작
        </Text>
        <LogoutButton />
      </Pressable>
    </View>
  );
}
