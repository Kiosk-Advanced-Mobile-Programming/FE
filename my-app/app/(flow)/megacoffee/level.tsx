import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router'; 
import styles from './level.styles'; 
// 💡 Global State 함수 임포트
import { setCurrentMission, MissionConfig } from './globalState';

// 버튼 데이터 정의
const BUTTON_DATA = [
    { 
        id: 1, 
        label: '살펴보기', 
        route: '/(flow)/megacoffee/startPage', 
        requirement: '자유롭게 메뉴판을 탐색합니다.',
        missionConfig: null 
    }, 
    { 
        id: 2, 
        label: '난이도: 하 (미션)', 
        route: '/(flow)/megacoffee/startPage', 
        // 💡 하 난이도 설정
        missionConfig: { 
            level: 'easy', 
            targetMenu: '아메리카노', 
            targetOption: 'hot', 
            targetShot: 'light', 
            targetSyrup: undefined,
            targetAdd : undefined,
        } as MissionConfig,
        requirement: '요구사항: 아메리카노(HOT), 사이즈(L) 선택 후 주문 담기' 
    },
    { 
        id: 3, 
        label: '난이도 : 중 (미션)',
        route : '/(flow)/megacoffee/startPage',
        // 💡 중 난이도 설정 (시럽, 샷 추가)
        missionConfig: { 
            level: 'medium',
            targetMenu: '버블 크림 밀크티', 
            targetOption: 'ice', 
            targetShot: 'add1shot', // 샷추가(EX) 키값
            targetSyrup: 'vanilla', // 바닐라 시럽 키값
            targetAdd : undefined,
        } as MissionConfig,
        requirement: '요구사항: 버블 크림 밀크티(ICE), 사이즈(EX) 선택 후 주문 담기' 
    },
    { 
        id: 4, 
        label: '버튼 4 (난이도: 상)',
        route : '/(flow)/megacoffee/startPage',
        requirement: '요구사항 : 디카페인 에스프레소(HOT), 사이즈(L), 시럽추가 후 주문 담기',
        
        
        missionConfig: null
    },
];

export default function TestPage() {
    
    const handlePress = (button: typeof BUTTON_DATA[0]) => {
        // 1. 미션이 설정된 버튼이면 Global State에 저장
        if (button.missionConfig) {
            setCurrentMission(button.missionConfig);
        } else {
            console.log('미션 모드 아님 (자유 모드)');
        }

        // 2. 페이지 이동 (파라미터 없이 이동하여 깔끔함)
        if (button.route) {
            router.push(button.route as any);
        } else {
            Alert.alert('알림', '준비 중입니다.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonGroup}>
                {BUTTON_DATA.map((button) => (
                    <Pressable
                        key={button.id}
                        style={styles.button}
                        onPress={() => handlePress(button)}
                    >
                        <Text style={styles.buttonText}>{button.label}</Text>
                        {button.requirement && <Text style={styles.buttonRequirement}>{button.requirement}</Text>}
                    </Pressable>
                ))}
            </View>
        </View>
    );
}