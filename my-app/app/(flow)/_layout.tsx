// app/(flow)/_layout.tsx
import { Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { recordTouch as recordEdiyaTouch } from "./ediya/globalState";
import { recordTouch as recordMegacoffeeTouch } from "./megacoffee/globalState";
// [추가] 맥도날드 터치 기록 함수 임포트
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
      <Slot />
    </View>
  );
}
