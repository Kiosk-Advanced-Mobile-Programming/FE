// level.tsx
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router'; 
import styles from './level.styles'; 

const BUTTON_DATA = [
    { 
        id: 1, 
        label: '살펴보기', 
        route: '/(flow)/megacoffee/startPage', 
        requirement: '자유롭게 메뉴판을 탐색합니다.',
        params: {} 
    }, 
    { 
        id: 2, 
        label: '난이도: 하 (미션)', 
        route: '/(flow)/megacoffee/startPage', 
        // 💡 핵심: 'easy'라는 꼬리표를 달아줍니다.
        params: { missionLevel: 'easy' }, 
        requirement: '요구사항: 아메리카노(HOT) 주문 담기' 
    },
    { 
        id: 3, 
        label: '난이도 : 중 (미션)',
        route: '/(flow)/megacoffee/startPage', 
        params: { missionLevel: 'medium' },
        requirement: '고구마라뗴 (HOT) 텀블러에 담아가기' 
    },
    { 
        id: 4,
        label: '버튼 4 (난이도: 상)',
        route: '/(flow)/megacoffee/startPage', 
        requirement: '할메가커피 (ICE) 연하게 + 초코토핑 추가하기' 
    },
];

export default function TestPage() {
    
    const handlePress = (label: string, route?: string, params?: object) => {
        if (route) {
            router.push({ pathname: route, params: params } as any);
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
                        onPress={() => handlePress(button.label, button.route, button.params)}
                    >
                        <Text style={styles.buttonText}>{button.label}</Text>
                        {button.requirement && <Text style={styles.buttonRequirement}>{button.requirement}</Text>}
                    </Pressable>
                ))}
            </View>
        </View>
    );
}