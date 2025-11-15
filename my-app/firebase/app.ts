// 초기 세팅 init 앱, 공용 app 인스턴스 생성

// firebase/app.ts 싱글턴으로 구현
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
