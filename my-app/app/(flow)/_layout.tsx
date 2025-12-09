// app/(flow)/_layout.tsx
import { Stack } from "expo-router";
// 1. CartProvider 임포트 (경로가 mcDonalds 폴더 안에 있다고 가정)
import { CartProvider } from "./mcDonalds/cart-context";

export default function FlowLayout() {
  return (
    // 2. Provider로 감싸기
    <CartProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShown: false, // 상단 flow스택 안보이게함
        }}
      />
    </CartProvider>
  );
}
