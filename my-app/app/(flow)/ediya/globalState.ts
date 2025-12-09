// app/(flow)/ediya/globalState.ts

// =================================================================
// 1. 전역 변수 (앱이 켜져있는 동안 유지됨)
// =================================================================
let touchCount = 0;
let isSessionActive = false; // 세션(레벨 선택 후)이 활성화되었는지 여부
let missionResult: boolean | null = null; // 💡 미션 성공/실패 결과 저장

// 현재 세션 정보 저장
let currentSessionData: {
    sessionName: string;
    missionId: string; // 💡 미션 채점을 위해 ID 추가
    successTouches: number;
} | null = null;

// =================================================================
// 2. 핵심 로직 함수들 (Export)
// =================================================================

/**
 * 터치가 발생할 때마다 호출됩니다.
 */
export const recordTouch = () => {
    // ediya 세션이 활성화된 경우에만 카운트합니다.
    if (isSessionActive) {
        touchCount++;
        console.log(`[EDIYA] 터치${touchCount}`);
    }
};

/**
 * level.tsx에서 미션 버튼을 누를 때 호출됩니다.
 */
export const startSession = (data: { sessionName: string; successTouches: number; missionId: string; }) => {
    console.log('[EDIYA] 세션 시작! 터치 횟수를 초기화합니다.');
    touchCount = 0; // 터치 카운트 초기화
    isSessionActive = true;
    missionResult = null; // 💡 세션 시작 시 미션 결과 초기화
    currentSessionData = data;
};

/**
 * lastpage.tsx에서 최종 결과를 생성할 때 호출됩니다.
 */
export const endSessionAndGetResult = () => {
    isSessionActive = false;
    const result = {
        categoryName: '이디야', // 💡 카테고리 이름 변경
        sessionName: currentSessionData?.sessionName || 'unknown',
        totalTouches: touchCount,
        successTouches: currentSessionData?.successTouches || 0,
        isSuccess: missionResult ?? false, // 💡 저장된 미션 결과 사용
    };
    currentSessionData = null; // 세션 정보 초기화
    return result;
};

/**
 * megacoffeeoption.tsx에서 현재 미션 ID를 가져오기 위해 호출됩니다.
 */
export const getMissionId = (): string | null => {
    return currentSessionData?.missionId || null;
};

/**
 * megacoffeeoption.tsx에서 미션 결과를 저장하기 위해 호출됩니다.
 */
export const setMissionResult = (isSuccess: boolean) => {
    missionResult = isSuccess;
    console.log(`[EDIYA Mission] 미션 결과 저장됨: ${isSuccess}`);
};