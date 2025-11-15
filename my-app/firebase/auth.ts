// 로그인/ 회원가입 등 Auth 관련 로직
import { app } from "./app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

const auth = getAuth(app);

// 이메일 로그인
export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user; // 필요하면 user.uid 등 사용
}

// 이메일 회원가입
export async function signupWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// 로그아웃
export async function logout() {
  return await signOut(auth);
}

export { auth, User };
