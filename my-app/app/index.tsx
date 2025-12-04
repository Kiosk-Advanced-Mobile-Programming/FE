// 앱실행 시 젤 첨으로 뜨는 페이지

// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // 앱 실행 시 바로 로그인 페이지로 리다이렉트
  return <Redirect href="/(loginPage)/LoginPage" />;
}
