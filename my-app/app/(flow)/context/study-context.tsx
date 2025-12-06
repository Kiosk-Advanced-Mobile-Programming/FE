{/*todo
  StudyContext 수정: firebase/study.ts의 함수(startStudySession, finishStudySession)를 연결했습니다.

select-menu.tsx: startSession("빅맥주문하기")를 호출하고, 카테고리 탭 클릭 시 정답 여부를 체크합니다.

MenuItem.tsx: 메뉴 이름(name)을 확인하여 "빅맥"인 경우에만 recordTouch(true)를 호출합니다.

payment.tsx: 결제 완료 직전에 endSession()을 호출하여 최종 통계를 DB로 보냅니다.z
  */}  
import React, { createContext, useContext, useState } from 'react';
// ✨ [수정 1] 실제 Firebase 함수 임포트 (경로는 프로젝트 구조에 맞게 수정)
import { startStudySession, finishStudySession } from "@/firebase/study"; 

type StudyContextType = {
  sessionId: string | null;
  totalTouches: number;
  successTouches: number;
  startSession: (sessionName: string) => Promise<void>;
  endSession: () => Promise<void>;
  recordTouch: (isSuccess: boolean) => void;
};

const StudyContext = createContext<StudyContextType | null>(null);

export const StudyProvider = ({ children, categoryName = "맥도날드" }: { children: React.ReactNode, categoryName?: string }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [totalTouches, setTotalTouches] = useState(0);
  const [successTouches, setSuccessTouches] = useState(0);

  // 1. 학습 시작
  const startSession = async (sessionName: string) => {
    try {
      // ✨ [수정 2] 실제 DB에 시작 데이터 전송
      const id = await startStudySession({ categoryName, sessionName });
      console.log(`학습 시작됨! Session ID: ${id}`);
      
      setSessionId(id);
      setTotalTouches(0); 
      setSuccessTouches(0); 
    } catch (e) {
      console.error("세션 시작 실패 (로그인 확인 필요):", e);
    }
  };

  // 2. 학습 종료
  const endSession = async () => {
    if (!sessionId) {
      console.warn("종료할 세션 ID가 없습니다.");
      return;
    }
    try {
      // ✨ [수정 3] 실제 DB에 결과 데이터 전송
      await finishStudySession(sessionId, {
        totalTouches,
        successTouches
      });
      console.log("학습 데이터 전송 완료");
      setSessionId(null); // 세션 초기화
    } catch (e) {
      console.error("데이터 전송 실패:", e);
    }
  };

  // 3. 터치 기록 (변경 없음)
  const recordTouch = (isSuccess: boolean) => {
    setTotalTouches((prev) => prev + 1);
    if (isSuccess) {
      setSuccessTouches((prev) => prev + 1);
    }
  };

  return (
    <StudyContext.Provider value={{ sessionId, totalTouches, successTouches, startSession, endSession, recordTouch }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) throw new Error('useStudy must be used within a StudyProvider');
  return context;
};