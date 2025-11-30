// firebase/study.ts
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./app";

// 학습 시작 시 필요한 데이터 (카테고리 등)
export interface StudyStartData {
  categoryName: string; // 예: "카페", "식당"
}

// 학습 종료 시 업데이트할 결과 데이터
export interface StudyResultData {
  totalSeconds: number; // 총 소요 시간
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

    // 초기 데이터 저장 (시작 시간, 상태, 카테고리 등)
    // 결과 필드들은 아직 모르므로 0 또는 null로 초기화하거나 생략 가능합니다.
    // 여기서는 빈 값(0)으로 필드를 미리 생성해 둡니다.
    const docRef = await addDoc(sessionsRef, {
      category: data.categoryName, // stats.tsx 호환용 필드명
      categoryName: data.categoryName, // StudyDetailScreen.tsx 호환용
      status: "IN_PROGRESS", // 학습 중 상태
      startedAt: serverTimestamp(), // 시작 시간

      // 나중에 업데이트될 필드들 (빈 값으로 초기화)
      endedAt: null,
      totalSeconds: 0,
      totalTouches: 0,
      successTouches: 0,
    });

    console.log("학습 시작! 세션 생성됨:", docRef.id);
    return docRef.id; // 나중에 종료할 때 이 ID가 필요하므로 반환
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
  result: StudyResultData
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

    // 결과 데이터 업데이트 (종료 시간, 상태 변경, 결과 수치)
    await updateDoc(sessionDocRef, {
      status: "COMPLETED", // 학습 완료 상태로 변경
      endedAt: serverTimestamp(), // 종료 시간 기록
      totalSeconds: result.totalSeconds,
      totalTouches: result.totalTouches,
      successTouches: result.successTouches,
    });

    console.log("학습 종료! 결과 업데이트 완료:", sessionId);
  } catch (error) {
    console.error("학습 결과 업데이트 실패:", error);
    throw error;
  }
}
