// app/(flow)/_layout.tsx
import { router, Stack, usePathname } from "expo-router";
import { recordTouch as recordEdiyaTouch } from "./ediya/globalState";
import { recordTouch as recordMegacoffeeTouch } from "./megacoffee/globalState";
// [추가] 맥도날드 터치 기록 함수 임포트
import { Pressable, Text, View } from "react-native";
import { recordMcDonaldsTouch } from "./mcDonalds/globalState";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FlowLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }} // 배경색 지정 권장 (안전 영역 색상)
      edges={['top', 'bottom']} // 상단(상태바)과 하단(시스템바) 모두 보호
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
              style={{ paddingHorizontal: 12, paddingVertical: 0 }}
            >
              {/* <Text style={{ fontSize: 18 }}> ⬅️ 뒤로가기</Text> */}
              <Ionicons name="arrow-back" size={28} color="black" />
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
    </SafeAreaView>
  );
}
