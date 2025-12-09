// firebase/ai.ts
import { StudySessionSummary } from "@/components/StudySummaryScreen/StudySummaryview";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { doc, getDoc } from "firebase/firestore"; // Firestore 읽기 함수 추가
import { app, auth, db } from "./app"; // auth, db 추가

// AI 서비스 초기화
const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

// AI 모델 가져오기
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// 사용자 정보 타입 정의 (내부 사용용)
interface UserInfo {
  age?: string;
  gender?: string;
  kioskLevel?: string;
}

/**
 * 세션 데이터와 사용자 정보를 받아서 LLM에 넘길 프롬프트 텍스트를 만든다.
 */
function buildPrompt(session: StudySessionSummary, user?: UserInfo): string {
  const successRate =
    session.totalTouches > 0
      ? Math.round((session.successTouches / session.totalTouches) * 100)
      : 0;

  // 사용자 정보가 있으면 프롬프트에 추가
  const userDescription = user
    ? `- 사용자 정보: ${user.age}세 ${user.gender}, 키오스크 수준: ${user.kioskLevel}`
    : "- 사용자 정보: 정보 없음";

  return `
다음은 노인 대상 키오스크 학습 결과입니다.

${userDescription}
- 학습 주제: ${session.categoryName}
- 총 학습 시간: ${Math.round(session.totalSeconds / 60)}분 (${
    session.totalSeconds
  }초)
- 전체 터치 수: ${session.totalTouches}번
- 성공한 터치 수: ${session.successTouches}번
- 성공률: ${successRate}%

위 사용자 정보와 학습 결과를 바탕으로, 학습자의 이해도를 쉽고 부드럽게 설명하고,
다음 연습에서 무엇을 신경 쓰면 좋을지 '한 문장'으로, 존댓말로 요약해 주세요.
사용자의 연령대와 수준을 고려하여 너무 어려운 용어는 사용하지 말고 격려하는 어조로 작성해 주세요.
`;
}

/**
 * Firebase AI(Gemini)를 사용해서 한 줄 요약을 요청하는 함수
 */
export async function requestAiSummary(
  session: StudySessionSummary
): Promise<string> {
  // 1. 현재 로그인한 사용자의 추가 정보 가져오기
  let userInfo: UserInfo | undefined;
  const uid = auth.currentUser?.uid;

  if (uid) {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        userInfo = {
          age: data.age,
          gender: data.gender,
          kioskLevel: data.kioskLevel,
        };
        console.log("AI 요약을 위한 사용자 정보 로드 성공:", userInfo);
      }
    } catch (e) {
      console.log("사용자 정보 로드 실패 (기본 프롬프트 사용):", e);
    }
  }

  // 2. 사용자 정보와 함께 프롬프트 생성
  const prompt = buildPrompt(session, userInfo);

  console.log("[AI 요약 요청] prompt:\n", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("AI 응답:", text);

    return text;
  } catch (error) {
    console.error("AI 요약 생성 중 오류:", error);
    throw error;
  }
}

export async function getAiExplanation(query: string): Promise<string> {
  console.log(`AI에게 질문이 도착했습니다: ${query}`);

  // 실제 AI 호출 전에 네트워크 지연을 시뮬레이션합니다. (1.5초)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // --- [TODO] 여기에 실제 AI API 호출 로직을 구현하세요. ---
  // (예시 코드: 나중에 실제 API 연결 시 주석을 풀고 사용하세요.)

  try {
    const prompt = `당신은 키오스크를 연습하는 학습자에게
                     키오스크 사용법을 친절하게 가르쳐주는 전문가입니다. 
                     사용자가 궁금해하는 키오스크 관련 단어 "${query}"에 대해 
                     쉽고 자세하게 한국어로 설명해 주세요. (100자 이내)
                     
                     [설명할때 인사 생략]`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("AI 응답:", text);
    return text;
  } catch (error) {
    console.error("AI API 호출 오류:", error);
    return "AI 서비스 연결에 문제가 발생했습니다. API 키 및 설정이 올바른지 확인해주세요.";
  }
}
