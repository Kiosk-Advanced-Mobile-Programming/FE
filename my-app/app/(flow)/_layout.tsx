// app/(flow)/_layout.tsx
import { router, Stack, usePathname } from "expo-router";
import { recordTouch as recordEdiyaTouch } from "./ediya/globalState";
import { recordTouch as recordMegacoffeeTouch } from "./megacoffee/globalState";
// [추가] 맥도날드 터치 기록 함수 임포트
import { Pressable, Text, View } from "react-native";
import { recordMcDonaldsTouch } from "./mcDonalds/globalState";

export default function FlowLayout() {
  const pathname = usePathname();

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponderCapture={() => {
        if (pathname.includes("/megacoffee")) {
          recordMegacoffeeTouch();
        } else if (pathname.includes("/ediya")) {
          recordEdiyaTouch();
        } else if (pathname.includes("/mcDonalds")) {
          // 맥도날드 경로일 때 터치 기록
          recordMcDonaldsTouch();
        }
        return false;
      }}
    >
      <Stack
        screenOptions={{
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingHorizontal: 12, paddingVertical: 6 }}
            >
              <Text style={{ fontSize: 18 }}> ⬅️ 뒤로가기</Text>
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
    </View>
  );
}
