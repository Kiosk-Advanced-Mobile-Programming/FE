import { Stack } from "expo-router";
import React from "react";
import { CartProvider } from "./cart-context";

export default function McDonaldsLayout() {
  return (
    // 맥도날드 폴더 내의 모든 화면에서 카트 기능을 사용할 수 있도록 Provider로 감싸줍니다.
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 개별 화면 설정 (필요시 추가) */}
        <Stack.Screen name="start-mcDonalds" />
        <Stack.Screen name="select-menu" />
        <Stack.Screen name="order-detail" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="order-complete" />
      </Stack>
    </CartProvider>
  );
}
