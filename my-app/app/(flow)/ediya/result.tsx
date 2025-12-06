import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
// 💡 미션 상세 정보를 가져오는 함수 임포트
// [수정] 현재 파일(app/(flow)/ediya/result.tsx)에서 globalState를 가져오는 경로를 명확히 가정합니다.
import { getMissionDetails } from './globalState'; 

// 💡 [추가] 장바구니 초기화 로직을 megacoffee.tsx 또는 cart.module.ts에서 가져옴
// **[필수] 아래 경로를 실제 CART_STORAGE와 notifyCartUpdate가 정의된 파일 경로로 수정하세요.**
// 현재는 megacoffee.tsx에 정의되어 있다고 가정합니다.
import { CART_STORAGE, notifyCartUpdate } from './megacoffee'; 

// ====================================================================
// 스타일 정의 (result.styles.ts 역할)
// ====================================================================
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // 💡 [개선] 배경색을 밝은 회색으로 설정하여 흰색 카드와 대비되도록 합니다.
        backgroundColor: '#f0f0f5', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: width * 0.9,
        maxWidth: 400,
        backgroundColor: 'white', // 카드 배경은 흰색
        borderRadius: 16,
        padding: 30,
        // 💡 [개선] 그림자 효과를 강화하여 입체감을 부여합니다.
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        alignItems: 'center',
    },
    icon: {
        // 💡 [개선] 아이콘 크기 유지
        fontSize: 80,
        marginBottom: 20,
    },
    titleSuccess: {
        // 💡 [개선] 제목 크기를 적절히 유지
        fontSize: 28, 
        fontWeight: '900', // 더 굵게
        color: '#28A745', // 더 선명한 녹색
        marginBottom: 10,
    },
    titleFailure: {
        // 💡 [개선] 제목 크기를 적절히 유지
        fontSize: 28,
        fontWeight: '900', // 더 굵게
        color: '#DC3545', // 더 선명한 붉은색
        marginBottom: 10,
    },
    missionTitle: {
        // 💡 [개선] 미션 제목을 강조하기 위해 크기와 굵기를 조정
        fontSize: 20,
        fontWeight: '700',
        color: '#212529', // 거의 검은색
        marginBottom: 8,
    },
    missionRequirement: {
        // 💡 [개선] 요구사항 텍스트 크기를 키우고 가독성 유지
        fontSize: 16, 
        color: '#6C757D', // 부드러운 회색
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    separator: {
        height: 1,
        width: '80%', // 구분선 너비를 줄여 디자인 개선
        backgroundColor: '#E9ECEF',
        marginVertical: 20,
    },
    backButton: {
        // 💡 [개선] 확실한 버튼 디자인 (버튼 형식 명확화)
        width: '100%',
        paddingVertical: 18, // 패딩 증가
        backgroundColor: '#6C5CE7', // 보라색 계열 (강조색)
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20, // 마진 증가
        // 버튼 그림자 추가
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // 추가: 미션 ID 표시 (디버깅용)
    missionIdText: {
        fontSize: 12,
        color: '#ADB5BD',
        marginTop: 15,
    }
});

// ====================================================================
// 타입 정의
// ====================================================================

interface ResultParams {
    isSuccess: string; // 'true' 또는 'false' 문자열로 전달
    missionId: string; // 미션 식별자 (예: 'mission-easy')
}

// ====================================================================
// 메인 컴포넌트
// ====================================================================

export default function ResultPage() {
    // lastpage.tsx에서 전달받은 파라미터를 사용합니다.
    const params = useLocalSearchParams() as unknown as ResultParams;
    
    // 문자열 'true'/'false'를 boolean 값으로 변환
    const isSuccess = params.isSuccess === 'true';
    const missionId = params.missionId || 'mission-easy'; // 기본값 설정

    // 전역 상태에서 미션 상세 정보를 가져옵니다.
    const missionDetails = getMissionDetails(missionId); 
    
    const missionTitle = missionDetails?.title || '미션 결과';
    const missionRequirement = missionDetails?.requirement || '미션 내용 정보를 찾을 수 없습니다.';
    
    // 첫 페이지 (./level)로 돌아가는 핸들러
    const handleGoHome = () => {
        // 1. 💡 [추가된 로직] 장바구니 데이터 초기화
        CART_STORAGE.length = 0;

        // 2. 💡 [추가된 로직] 장바구니 화면에 상태 변경 알림
        notifyCartUpdate(); 
        
        // 3. Expo Router의 replace를 사용하여 이전 스택을 지우고 미션 선택 화면으로 이동합니다.
        router.replace('./level'); // 현재 result.tsx가 (flow)/ediya 안에 있으므로 ./level로 이동
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                
                {/* 미션 성공/실패 아이콘 */}
                <Text style={styles.icon}>
                    {isSuccess ? '🎉' : '😓'}
                </Text>

                {/* 미션 성공/실패 타이틀 */}
                <Text style={isSuccess ? styles.titleSuccess : styles.titleFailure}>
                    {isSuccess ? '미션 성공!' : '미션 실패'}
                </Text>

                <View style={styles.separator} />
                
                {/* 미션 내용 */}
                <Text style={styles.missionTitle}>
                    {missionTitle}
                </Text>
                
                {/* 미션 성공 여부 */}
                <Text style={styles.missionRequirement}>
                    {missionRequirement}
                </Text>

                {/* 첫 페이지로 돌아가기 버튼 */}
                <Pressable onPress={handleGoHome} style={styles.backButton}>
                    <Text style={styles.backButtonText}>첫 페이지로 돌아가기 (미션 선택 화면)</Text>
                </Pressable>
                
                {/* 디버깅 정보 (필요시) */}
                <Text style={styles.missionIdText}>
                    {`Mission ID: ${missionId}`}
                </Text>
            </View>
        </View>
    );
}