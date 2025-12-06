// TestPage.tsx

import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router'; // 👈 Expo Router 임포트
import styles from './level.styles'; 

// 버튼 데이터 정의
const BUTTON_DATA = [
    { 
        id: 1, 
        label: '살펴보기', 
        route: '/(flow)/ediya/megacoffee', 
        requirement: '자유롭게 메뉴판을 탐색합니다.' 
    }, 
    { 
        id: 2, 
        label: '난이도: 하 (미션)', 
        route: '/(flow)/ediya/megacoffee', 
        // 👇 난이도 '하' 미션을 위한 상세 파라미터 정의
        params: { 
            // 미션 레벨
            missionLevel: 'easy', 
            
            // 필수 메뉴 및 온도
            targetMenu: '아메리카노', 
            targetOption: 'hot', // 'hot' 또는 'ice'
            
            // 샷 옵션 (light: L, add1shot: EX)
            targetShot: 'light', 
            
            // 기타 필수 옵션 (없으므로 null 또는 undefined로 설정)
            targetSyrup: undefined,
            targetTopping: undefined,
            targetTumbler: undefined,

            price: '3000', // 메뉴 선택을 위한 기본 정보 (MegacoffeeScreen에서 필요)
            category: '커피'    // 메뉴 선택을 위한 기본 정보 (MegacoffeeScreen에서 필요)
        },
        requirement: '요구사항: 아메리카노(HOT), 샷(L) 선택 후 주문 담기 (다른 추가 옵션 불가)' 
    },
    { 
        id: 3, 
        label: '난이도 : 중 (미션)',
        route : '/(flow)/ediya/megacoffee',
        params: { 
            // 미션 레벨
            missionLevel: 'medium',
            
            // 필수 메뉴 및 온도
            targetMenu: '버블 크림 밀크티', 
            targetOption: 'ice', 
            
            // 샷 옵션 (light: L, add1shot: EX)
            targetShot: 'add1shot', // 샷(EX)
            
            // 기타 필수 옵션 
            targetSyrup: undefined, // 시럽('추가')의 키
            targetTopping: undefined, 
            targetTumbler: undefined,

            price: '3000', // 메뉴 선택을 위한 기본 정보 (MegacoffeeScreen에서 필요)
            category: '커피'    // 메뉴 선택을 위한 기본 정보 (MegacoffeeScreen에서 필요)
        },
        // 💡 요구사항 텍스트
        requirement: '요구사항: 버블 크림 밀크티(ICE), 샷(EX), 시럽(추가) 선택 후 주문 담기 (다른 추가 옵션 불가)' 
    },
    { 
        id: 4, 
        label: '버튼 4 (난이도: 상)',
        requirement: '복합적인 옵션과 수량 조절이 필요합니다.' 
    },
];

/**
 * 화면 중앙에 4개의 버튼을 세로로 배치하는 테스트 페이지
 */
export default function TestPage() {
    
    // 버튼 클릭 핸들러
    const handlePress = (label: string, route?: string, params?: object) => {
        if (route) {
            // 💡 수정: params가 있으면 객체 형태로 push
            router.push({ pathname: route, params: params } as any);
        } else {
            // ... (나머지 알림 유지) ...
            Alert.alert('버튼 클릭', `${label}이(가) 클릭되었습니다! 학습 로직 시작 예정`);
        }
    };

    return (
        <View style={styles.container}>
            
            {/* 버튼들이 중앙에 모여 배치될 영역 */}
            <View style={styles.buttonGroup}>
            {BUTTON_DATA.map((button) => (
    <Pressable
        key={button.id}
        style={styles.button}
        onPress={() => handlePress(button.label, button.route, button.params)}
    >
        <Text style={styles.buttonText}>{button.label}</Text>
        {/* 💡 수정: button.requirement가 있을 경우에만 텍스트 렌더링 */}
        {button.requirement && <Text style={styles.buttonRequirement}>{button.requirement}</Text>}
    </Pressable>
))}
        </View>

        </View>
    );
}