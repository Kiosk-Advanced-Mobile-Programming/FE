// level.tsx
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router'; 
import styles from './level.styles';
// 💡 [추가] 세션 시작 함수 임포트
import { startSession } from './globalState'; 

const BUTTON_DATA = [
    { 
        id: 1, 
        label: '살펴보기', 
        route: '/(flow)/megacoffee/startPage', 
        requirement: '자유롭게 메뉴판을 탐색합니다.',
        sessionName: '메가커피살펴보기',
        successTouches: 0,
    }, 
    { 
        id: 2, 
        label: '난이도:하(미션)', 
        route: '/(flow)/megacoffee/startPage', 
        requirement: '요구사항: 아메리카노(HOT) 주문 담기',
        sessionName: '아메리카노주문',
        successTouches: 7, // 임의의 성공 터치 수
    },
    { 
        id: 3, 
        label: '난이도:중(미션)',
        route: '/(flow)/megacoffee/startPage', 
        requirement: '고구마라떼 (HOT) 텀블러에 담아가기',
        sessionName: '고구마라떼텀블러주문',
        successTouches: 10, // 임의의 성공 터치 수
    },
    { 
        id: 4,
        label: '난이도:상(미션)',
        route: '/(flow)/megacoffee/startPage', 
        requirement: '할메가커피 (ICE) 연하게 + 초코토핑 추가하기',
        sessionName: '할메가커피옵션추가',
        successTouches: 10, // 임의의 성공 터치 수
    },
];

export default function TestPage() {
    
    const handlePress = (buttonData: typeof BUTTON_DATA[0]) => {
        // 1. 💡 세션 시작 (터치 카운트 초기화 및 데이터 저장)
        startSession({
            sessionName: buttonData.sessionName,
            successTouches: buttonData.successTouches,
            missionId: `mission-${buttonData.id}`,
        });

        // 2. 💡 다음 페이지로 이동
        // 파라미터는 이제 세션 관리에 직접 사용되지 않지만, result 페이지 표시 등을 위해 전달할 수 있습니다.
        // label(미션제목), requirement(요구사항)을 함께 전달합니다.
        router.push({ pathname: buttonData.route, params: { ...buttonData, missionId: `mission-${buttonData.id}` } } as any);
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