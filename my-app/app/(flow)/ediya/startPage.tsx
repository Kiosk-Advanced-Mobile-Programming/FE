import { View, Pressable, Image, StyleSheet } from 'react-native'; 
import { router } from 'expo-router';
import React from 'react';
import styles from './startPage.styles'; // startPage.styles.ts 파일을 불러옴

// 이미지 파일 경로 정의 (megacoffee.tsx에서 사용하던 경로를 동일하게 사용)
// 실제 프로젝트 구조에 맞게 경로를 조정해주세요.
const MEGA_START_IMAGE = require('../../../assets/ediyaimages/ediyaStart.png');

export default function StartPage() {
    // 클릭 시 megacoffee.tsx 화면으로 이동하는 함수
    const navigateToMainScreen = () => {
        // 'replace'를 사용하여 StartPage를 히스토리에서 제거하고 메인 화면으로 전환합니다.
        // 메가커피 메인 화면 경로: '/(flow)/megacoffee'
        router.replace('/ediya/megacoffee'); 
    };

    return (
        // 화면 전체를 덮는 Pressable 컨테이너
        // 이 화면의 아무 곳이나 클릭하면 메인 화면으로 넘어갑니다.
        <Pressable 
            style={styles.fullScreenContainer} 
            onPress={navigateToMainScreen} 
        >
            <Image
                source={MEGA_START_IMAGE} // 로컬 이미지 경로 사용
                style={styles.popupImageStyle}
            />
        </Pressable>
    );
}