// 환경변수 + config 관리하는 파일

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// AI 연결 테스트하던 코드
// import { initializeApp } from "firebase/app";
// import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// // TODO(developer) Replace the following with your app's Firebase configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "...",
//   measurementId: "...",
// };

// // Initialize FirebaseApp
// const firebaseApp = initializeApp(firebaseConfig);

// // Initialize the Gemini Developer API backend service
// const ai = getAI(firebaseApp, {
//   backend: new GoogleAIBackend(),
// });

// // Create a `GenerativeModel` instance with a model that supports your use case
// export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// // Wrap in an async function so you can use await
// async function run() {
//   // Provide a prompt that contains text
//   const prompt = "Write a story about a magic backpack.";

//   // To generate text output, call generateContent with the text input
//   const result = await model.generateContent(prompt);

//   const response = result.response;
//   const text = response.text();
//   console.log(text);
// }

//run();
