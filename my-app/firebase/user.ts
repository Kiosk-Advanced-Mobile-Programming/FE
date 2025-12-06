import { doc, setDoc } from "firebase/firestore";
import { db } from "./app";

export interface UserProfile {
  email: string;
  nickname: string; // [추가] 닉네임 필드
  age: string;
  gender: "남성" | "여성";
  kioskLevel: "초급" | "중급" | "고급";
  createdAt: Date;
}

/**
 * 회원가입 후 추가 정보를 Firestore에 저장하는 함수
 */
export async function saveUserProfile(
  uid: string,
  profile: Omit<UserProfile, "createdAt">
) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(
      userRef,
      {
        ...profile,
        createdAt: new Date(),
      },
      { merge: true }
    );
    console.log("사용자 정보 저장 완료");
  } catch (error) {
    console.error("사용자 정보 저장 실패:", error);
    throw error;
  }
}
