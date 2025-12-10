/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#6366F1"; // 보라색으로 변경
const tintColorDark = "#818CF8";

export const Colors = {
  light: {
    text: "#111827",
    textSecondary: "#6B7280",
    background: "#F9FAFB",
    white: "#FFFFFF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // 주요 색상
    primary: "#6366F1",
    primaryLight: "#818CF8",
    primaryLighter: "#E0E7FF",

    // 기능별 색상
    secondary: "#F59E0B",
    secondaryLight: "#FCD34D",
    secondaryLighter: "#FEF3C7",

    success: "#10B981",
    successLight: "#6EE7B7",
    successLighter: "#D1FAE5",

    info: "#3B82F6",
    infoLight: "#93C5FD",
    infoLighter: "#DBEAFE",

    error: "#EF4444",
    errorLight: "#FCA5A5",
    errorLighter: "#FEE2E2",

    // UI 요소
    border: "#E5E7EB",
    cardBorder: "#F3F4F6",
    shadow: "rgba(0, 0, 0, 0.06)",
  },
  dark: {
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    background: "#111827",
    white: "#1F2937",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    // 주요 색상 (다크모드)
    primary: "#818CF8",
    primaryLight: "#A5B4FC",
    primaryLighter: "#312E81",

    secondary: "#FBBF24",
    secondaryLight: "#FCD34D",
    secondaryLighter: "#78350F",

    success: "#34D399",
    successLight: "#6EE7B7",
    successLighter: "#064E3B",

    info: "#60A5FA",
    infoLight: "#93C5FD",
    infoLighter: "#1E3A8A",

    error: "#F87171",
    errorLight: "#FCA5A5",
    errorLighter: "#7F1D1D",

    border: "#374151",
    cardBorder: "#1F2937",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
