// app/(flow)/megacoffee/globalState.ts

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
 * 세션 활성화 여부와 관계없이 터치 횟수를 기록하고 콘솔에 출력합니다.
 */
export const recordTouch = () => {
    touchCount++;
    console.log(`터치${touchCount}`);
};

/**
 * level.tsx에서 미션 버튼을 누를 때 호출됩니다.
 * 터치 횟수를 초기화하고, 현재 미션 정보를 저장합니다.
 */
export const startSession = (data: { sessionName: string; successTouches: number; missionId: string; }) => {
    console.log('세션 시작! 터치 횟수를 초기화합니다.');
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
        categoryName: '메가커피', // 고정값
        sessionName: currentSessionData?.sessionName || 'unknown',
        totalTouches: touchCount,
        successTouches: currentSessionData?.successTouches || 0,
        isSuccess: missionResult ?? false, // 💡 저장된 미션 결과 사용
    };
    currentSessionData = null; // 세션 정보 초기화
    return result;
};

/**
 * [NEW] 장바구니 내용을 기반으로 현재 미션의 성공 여부를 평가합니다.
 * 이 함수는 이제 megacoffeeoption.tsx에서 호출됩니다.
 */
export const getMissionId = (): string | null => {
    return currentSessionData?.missionId || null;
};

export const setMissionResult = (isSuccess: boolean) => {
    missionResult = isSuccess;
    console.log(`[Mission] 미션 결과 저장됨: ${isSuccess}`);
};