// app/(flow)/general-restaurant/study-session-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

import {
  startStudySession,
  finishStudySession,
  StudyStatus,
} from '../../../firebase/study';

interface StudySessionContextValue {
  sessionId: string | null;
  categoryName: string | null;
  sessionName: string | null;
  totalTouches: number;
  successTouches: number;

  start: (categoryName: string, sessionName: string) => Promise<void>;
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
  const [totalTouches, setTotalTouches] = useState<number>(0);
  const [successTouches, setSuccessTouches] = useState<number>(0);

  /** 학습 시작 — Firestore에 session 생성 */
  const start = useCallback(async (category: string, session: string) => {
    setCategoryName(category);
    setSessionName(session);
    setTotalTouches(0);
    setSuccessTouches(0);

    const id = await startStudySession({
      categoryName: category,
      sessionName: session,
    });

    setSessionId(id);
  }, []);

  /** 터치 카운트 */
  const registerTouch = useCallback((success: boolean) => {
    setTotalTouches((prev) => prev + 1);
    if (success) setSuccessTouches((prev) => prev + 1);
  }, []);

  /** 학습 종료 — Firestore 세션 업데이트 */
  const finish = useCallback(
    async (status: StudyStatus) => {
      if (!sessionId)
        return console.warn('No sessionId, cannot finish session');

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
  if (!ctx)
    throw new Error('useStudySession must be used within StudySessionProvider');
  return ctx;
}
