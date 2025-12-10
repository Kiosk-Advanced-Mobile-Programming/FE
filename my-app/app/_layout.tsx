// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  // 앱의 진입점을 'index'로 명시
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* 1. 로그인 페이지를 스택의 가장 위에 정의 (혹은 index) */}
        <Stack.Screen
          name="(loginPage)/LoginPage"
          options={{ headerShown: false }}
        />

        {/* 2. 그 다음 탭과 나머지 정의 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(flow)" options={{ headerShown: false }} />
        {/* ... */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
