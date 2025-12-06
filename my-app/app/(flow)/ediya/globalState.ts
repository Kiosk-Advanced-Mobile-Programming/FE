export interface Mission {
    id: string; // 미션 식별자 (예: 'mission-easy')
    title: string; // 미션 제목 (예: '난이도: 하')
    requirement: string; // 미션 요구사항 (예: '아메리카노(HOT), 샷(L) 선택 후 주문 담기')
    isSuccess: boolean; // 성공 여부
}

// 초기 미션 상태 (level.tsx의 버튼 2 미션을 여기에 매핑)
export const MISSION_STATUS: Record<string, Mission> = {
    'mission-easy': {
        id: 'mission-easy',
        title: '난이도: 하 (버튼 2)',
        requirement: '아메리카노(HOT), 샷(L) 선택 후 주문 담기',
        isSuccess: false,
    },
    // 나중에 'mission-medium', 'mission-hard' 등을 여기에 추가할 수 있습니다.
};

/**
 * 특정 미션의 성공 상태를 설정하는 함수
 * @param missionId 설정할 미션의 ID
 * @param isSuccess 성공 여부 (true/false)
 */
export const setMissionSuccess = (missionId: string, isSuccess: boolean) => {
    if (MISSION_STATUS[missionId]) {
        MISSION_STATUS[missionId].isSuccess = isSuccess;
        console.log(`[Global State Update] ${missionId} 상태가 ${isSuccess}로 업데이트되었습니다.`);
    } else {
        console.error(`[Global State Error] 알 수 없는 Mission ID: ${missionId}`);
    }
};

/**
 * 특정 미션의 상세 정보 (성공 여부 포함)를 가져오는 함수
 * @param missionId 확인할 미션의 ID
 * @returns 미션 객체 (Mission)
 */
export const getMissionDetails = (missionId: string): Mission | undefined => {
    return MISSION_STATUS[missionId];
};

/**
 * 특정 미션의 성공 여부(boolean)만 빠르게 가져오는 함수
 * @param missionId 확인할 미션의 ID
 * @returns 성공 여부 (boolean)
 */
export const getMissionSuccess = (missionId: string): boolean => {
    return MISSION_STATUS[missionId]?.isSuccess || false;
};