// app/(flow)/general-restaurant/study-session-context.tsx
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  finishStudySession,
  startStudySession,
  StudyStatus,
} from "../../../firebase/study";

interface StudySessionContextValue {
  sessionId: string | null;
  categoryName: string | null;
  sessionName: string | null;
  totalTouches: number;
  successTouches: number;
  start: (category: string, session: string) => Promise<void>;
  registerTouch: (success: boolean) => void;
  finish: (status: StudyStatus) => Promise<void>;
  reset: () => void;
}

const StudySessionContext = createContext<StudySessionContextValue | null>(
  null
);

export function StudySessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [totalTouches, setTotalTouches] = useState(0);
  const [successTouches, setSuccessTouches] = useState(0);

  // 학습 시작: category + sessionName 전달, sessionId 받기
  const start = useCallback(async (category: string, session: string) => {
    setCategoryName(category);
    setSessionName(session);
    setTotalTouches(0);
    setSuccessTouches(0);

    category = "일반식당";
    session = "키오스크 기초 연습";

    const id = await startStudySession({
      categoryName: category,
      sessionName: session,
    });

    setSessionId(id);
  }, []);

  // 터치 기록
  const registerTouch = useCallback((success: boolean) => {
    setTotalTouches((prev) => prev + 1);
    if (success) {
      setSuccessTouches((prev) => prev + 1);
    }
  }, []);

  // 학습 종료: sessionId + totalTouches + successTouches + status 전달
  const finish = useCallback(
    async (status: StudyStatus) => {
      if (!sessionId) {
        console.warn("finishStudySession 호출 실패: sessionId 없음");
        return;
      }
      await finishStudySession(sessionId, totalTouches, successTouches, status);
    },
    [sessionId, totalTouches, successTouches]
  );

  const reset = () => {
    setSessionId(null);
    setCategoryName(null);
    setSessionName(null);
    setTotalTouches(0);
    setSuccessTouches(0);
  };

  return (
    <StudySessionContext.Provider
      value={{
        sessionId,
        categoryName,
        sessionName,
        totalTouches,
        successTouches,
        start,
        registerTouch,
        finish,
        reset,
      }}
    >
      {children}
    </StudySessionContext.Provider>
  );
}

export function useStudySession() {
  const ctx = useContext(StudySessionContext);
  if (!ctx) {
    throw new Error("useStudySession must be used within StudySessionProvider");
  }
  return ctx;
}
