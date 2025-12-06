// --- [1. 미션 결과 상태 관리 (Result 페이지용)] ---
export interface Mission {
    id: string; 
    title: string; 
    requirement: string; 
    isSuccess: boolean; 
}

export const MISSION_STATUS: Record<string, Mission> = {
    'mission-easy': {
        id: 'mission-easy',
        title: '난이도: 하 (버튼 2)',
        requirement: '아메리카노(HOT), 샷(L) 선택 후 주문 담기',
        isSuccess: false,
    },
    'mission-medium': {
        id: 'mission-medium',
        title: '난이도: 중 (버튼 3)',
        requirement: '버블 크림 밀크티(ICE), 샷(EX), 시럽(추가) 선택 후 주문 담기', 
        isSuccess: false,
    },
};

export const setMissionSuccess = (missionId: string, isSuccess: boolean) => {
    if (MISSION_STATUS[missionId]) {
        MISSION_STATUS[missionId].isSuccess = isSuccess;
        console.log(`[Global State Update] ${missionId} 결과 업데이트 -> ${isSuccess}`);
    }
};

// 결과 페이지 등에서 사용
export const getMissionDetails = (missionId: string): Mission | undefined => {
    return MISSION_STATUS[missionId];
};

export const getMissionSuccess = (missionId: string): boolean => {
    return MISSION_STATUS[missionId]?.isSuccess || false;
};


// --- [2. 💡 현재 수행 중인 미션 설정 (화면 이동용)] ---
// 이 부분이 새로 추가된 핵심 로직입니다.

export interface MissionConfig {
    level: 'easy' | 'medium';
    targetMenu: string;
    targetOption: string; // hot/ice
    targetShot?: string;  // light / add1shot
    targetSyrup?: string; // vanilla
    targetTopping?: string;
    targetTumbler?: string;
}

// 현재 활성화된 미션을 저장할 변수
let currentActiveMission: MissionConfig | null = null;

// 레벨 페이지에서 미션 시작할 때 호출
export const setCurrentMission = (config: MissionConfig) => {
    currentActiveMission = config;
    console.log('[Global State] 현재 미션 설정됨:', config);
};

// 옵션 페이지에서 정답 확인할 때 호출
export const getCurrentMission = (): MissionConfig | null => {
    return currentActiveMission;
};

// 미션 초기화
export const clearCurrentMission = () => {
    currentActiveMission = null;
};