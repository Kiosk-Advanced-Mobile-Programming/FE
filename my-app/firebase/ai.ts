// firebase/ai.ts
// 세션 데이터를 받아서 Firebase AI(Gemini)로 한 줄 요약을 요청
import { StudySessionSummary } from "@/components/StudySummaryScreen/StudySummaryview";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "./app";

// AI 서비스 초기화
const ai = getAI(app, {
  backend: new GoogleAIBackend(),
});

// AI 모델 가져오기
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

/**
 * 세션 데이터를 받아서 LLM에 넘길 프롬프트 텍스트를 만든다.
 */
function buildPrompt(session: StudySessionSummary): string {
  const successRate =
    session.totalTouches > 0
      ? Math.round((session.successTouches / session.totalTouches) * 100)
      : 0;

  return `
다음은 노인 대상 키오스크 학습 결과입니다.

- 학습 주제: ${session.categoryName}
- 총 학습 시간: ${Math.round(session.totalSeconds / 60)}분 (${
    session.totalSeconds
  }초)
- 전체 터치 수: ${session.totalTouches}번
- 성공한 터치 수: ${session.successTouches}번
- 성공률: ${successRate}%

위 결과를 바탕으로, 학습자의 이해도를 쉽고 부드럽게 설명하고,
다음 연습에서 무엇을 신경 쓰면 좋을지 '한 문장'으로, 존댓말로 요약해 주세요.
너무 어려운 용어는 사용하지 말아 주세요.
`;
}

/**
 * Firebase AI(Gemini)를 사용해서 한 줄 요약을 요청하는 함수
 * 실제 Firebase AI JS SDK에 맞게 구현해야 함
 */
export async function requestAiSummary(
  session: StudySessionSummary
): Promise<string> {
  const prompt = buildPrompt(session);

  console.log("[AI 요약 요청] prompt:\n", prompt);

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  console.log(text);

  return text;
}
