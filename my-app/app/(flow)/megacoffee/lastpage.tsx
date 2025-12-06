import React, { useMemo } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
// 💡 스타일 파일 임포트 (파일명이 lastpage.styles.ts라고 가정)
import styles from './lastpage.styles'; 

// 💡 전역 장바구니 데이터
import { 
    CART_STORAGE,
} from './megacoffee'; 

// 💡 [핵심 추가] 미션 성공 여부 확인 함수 임포트
import { getMissionSuccess } from './globalState';

// 총 가격 계산 함수
const calculateCartTotalPrice = () => {
    return CART_STORAGE.reduce((total, item) => {
        const optionCost = item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0);
        return total + (item.basePrice + optionCost) * item.quantity;
    }, 0);
};

const CardPaymentTerminal: React.FC = () => {
    const cartTotalPrice = useMemo(calculateCartTotalPrice, []) || 5000;

    const handleCancelPayment = () => {
        router.back(); 
    };

    // 💡 [핵심 로직] 결제 승인(승인요청) 버튼 클릭 시 실행
    const handleApprovePayment = () => {
        
        // 1. 어떤 미션을 성공했는지 확인 (눈속임 전략 대응)
        // Easy, Medium, Hard 중 하나라도 true면 성공으로 처리
        const isEasySuccess = getMissionSuccess('mission-easy');
        const isMediumSuccess = getMissionSuccess('mission-medium');
        const isHardSuccess = getMissionSuccess('mission-hard');

        let finalSuccess = false;
        let finalMissionId = 'mission-easy'; // 기본값

        if (isEasySuccess) {
            finalSuccess = true;
            finalMissionId = 'mission-easy';
        } else if (isMediumSuccess) {
            finalSuccess = true;
            finalMissionId = 'mission-medium';
        } else if (isHardSuccess) {
            finalSuccess = true;
            finalMissionId = 'mission-hard';
        }

        console.log(`[LastPage] 결제 시도 -> 성공여부: ${finalSuccess}, ID: ${finalMissionId}`);

        // 2. 결과 페이지(result.tsx)로 이동
        // 💡 경로 주의: 파일 구조에 맞춰 '/(flow)/ediya/result' 로 설정했습니다.
        router.push({
            pathname: '/(flow)/megacoffee/result',
            params: {
                isSuccess: String(finalSuccess), // boolean -> string 변환
                missionId: finalMissionId
            }
        });
    };

    return (
        <View style={styles.pageWrap}>
            
            {/* 1. 상단 배너: 카드결제 & X 버튼 */}
            <View style={styles.modalHeaderBar}>
                <View style={styles.headerSpacer} /> 
                <Text style={styles.modalHeaderBarText}>카드 결제</Text>
                <Pressable style={styles.modalCloseButton} onPress={handleCancelPayment}>
                    <Text style={styles.modalCloseIcon}>X</Text>
                </Pressable>
            </View>
            
            {/* 2. 중앙 내용: 총 주문 금액 및 할부일수 */}
            <View style={styles.contentContainer}>
                
                {/* 총 주문 금액 및 할부 정보 컨테이너 */}
                <View style={styles.summaryContainer}>
                    
                    {/* [1] 총 주문 금액 ROW */}
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKeyText}>총 주문 금액</Text>
                        <Text style={styles.summaryValueText}>
                            {cartTotalPrice.toLocaleString()}원
                        </Text>
                    </View>

                    {/* [2] 할부일수 ROW */}
                    <View style={[styles.summaryRow, styles.summaryRowLast]}>
                        <Text style={styles.summaryKeyText}>할부일수</Text>
                        <Text style={styles.summaryValueNormalText}>
                            일시불
                        </Text>
                    </View>
                    
                </View>

                {/* 카드 삽입/리더기 안내 메시지 */}
                <Text style={{ fontSize: 18, color: '#333', marginTop: 20, textAlign: 'center' }}>
                    카드를 단말기에 삽입해 주세요.
                </Text>

            </View>

            {/* 3. 하단 버튼 영역: 취소 및 승인요청 */}
            <View style={styles.actionButtonRow}>
                <Pressable 
                    style={[styles.actionButton, styles.cancelButton]} 
                    onPress={handleCancelPayment}
                >
                    <Text style={styles.buttonText}>취소</Text>
                </Pressable>

                {/* 💡 승인요청 버튼에 로직 연결 */}
                <Pressable 
                    style={[styles.actionButton, styles.approveButton]} 
                    onPress={handleApprovePayment}
                >
                    <Text style={styles.buttonText}>승인요청</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default CardPaymentTerminal;