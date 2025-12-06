// firebase/study.ts
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc, // 1. 데이터를 읽어오기 위해 getDoc 추가
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./app";
import { updateUserLevel } from "./user"; // user.ts에서 함수 임포트

// 학습 시작 시 필요한 데이터 (카테고리 등)
export interface StudyStartData {
  categoryName: string; // 맥도날드, 메가커피
  sessionName: string; // 맥도날드 치즈추가
}

export type StudyStatus = "SUCCESS" | "FAIL" | "IN_PROGRESS";

// 학습 종료 시 업데이트할 결과 데이터
export interface StudyResultData {
  totalTouches: number; // 전체 터치 수
  successTouches: number; // 성공 터치 수
}

/**
 * 1. 학습 시작 시 호출: 문서를 생성하고 초기 상태를 저장합니다.
 * 반환값: 생성된 세션 ID (sessionId)
 */
export async function startStudySession(data: StudyStartData): Promise<string> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    // users/{uid}/sessions 경로 참조
    const sessionsRef = collection(db, "users", user.uid, "sessions");

    const docRef = await addDoc(sessionsRef, {
      category: data.categoryName,
      sessionName: data.sessionName,
      status: "IN_PROGRESS",
      startedAt: serverTimestamp(), // 서버 기준 시간 저장

      endedAt: null,
      totalSeconds: 0,
      totalTouches: 0,
      successTouches: 0,
    });

    console.log("학습 시작! 세션 생성됨:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("학습 세션 생성 실패:", error);
    throw error;
  }
}

/**
 * 2. 학습 종료 시 호출: 결과를 해당 세션 문서에 업데이트합니다.
 */
export async function finishStudySession(
  sessionId: string,
  totalTouches: number,
  successTouches: number,
  status: StudyStatus
) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    if (!sessionId) {
      throw new Error("세션 ID가 없습니다.");
    }

    // 업데이트할 문서 참조
    const sessionDocRef = doc(db, "users", user.uid, "sessions", sessionId);

    // 1. 현재 저장된 문서 가져오기
    const sessionSnap = await getDoc(sessionDocRef);

    if (!sessionSnap.exists()) {
      throw new Error("세션을 찾을 수 없습니다.");
    }

    const data = sessionSnap.data();

    // 2. 시간 차이 계산 (현재 시간 - 시작 시간)
    let calculatedSeconds = 0;
    if (data.startedAt) {
      const now = new Date();
      // Firestore Timestamp는 .toDate() 메서드로 JS Date 객체 변환 가능
      const startTime = data.startedAt.toDate();
      const diffInMillis = now.getTime() - startTime.getTime(); // 밀리초 차이
      calculatedSeconds = Math.floor(diffInMillis / 1000); // 초 단위로 변환 (내림)
    }

    // -----------------------------------------------------------

    // 1. 결과 데이터 업데이트 (status 포함)
    await updateDoc(sessionDocRef, {
      status: status, // 받아온 상태 저장 (SUCCESS or FAIL)
      endedAt: serverTimestamp(),
      totalSeconds: calculatedSeconds,
      totalTouches: totalTouches,
      successTouches: successTouches,
    });

    console.log(`학습 종료! 결과 업데이트 완료: ${sessionId}, 상태: ${status}`);

    // 2. 레벨업 로직 (성공 횟수 카운트)
    // users/{uid}/sessions 컬렉션에서 status가 SUCCESS인 문서의 개수를 셉니다.
    const sessionsRef = collection(db, "users", user.uid, "sessions");
    const q = query(sessionsRef, where("status", "==", "SUCCESS"));

    // 서버 사이드 카운팅 (비용 효율적)
    const snapshot = await getCountFromServer(q);
    const successCount = snapshot.data().count;

    console.log(`현재까지 성공한 학습 수: ${successCount}`);

    // 레벨 판단 로직
    // 20개 이상 -> 고급
    // 10개 이상 -> 중급
    // 그 외 -> 변경 없음 (또는 초급 유지)
    if (successCount >= 20) {
      await updateUserLevel(user.uid, "고급");
    } else if (successCount >= 10) {
      await updateUserLevel(user.uid, "중급");
    }
  } catch (error) {
    console.error("학습 결과 업데이트 실패:", error);
    throw error;
  }
}
