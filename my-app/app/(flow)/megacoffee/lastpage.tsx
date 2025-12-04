import React, { useMemo } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import styles from './lastpage.styles'; 

import { 
    CART_STORAGE,
} from './megacoffee'; 

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

    const handleApprovePayment = () => {
        Alert.alert(
            "결제 승인 완료", 
            `총 ${cartTotalPrice.toLocaleString()}원의 카드 결제가 승인되었습니다.`,
            [{
                text: "확인", 
                onPress: () => {
                    CART_STORAGE.length = 0; 
                    router.replace('/megacoffee/megacoffee'); 
                }
            }]
        );
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
                    
                    {/* [1] 총 주문 금액 ROW: Key(좌상단) - Value(우상단) */}
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryKeyText}>총 주문 금액</Text>
                        <Text style={styles.summaryValueText}>
                            {cartTotalPrice.toLocaleString()}원
                        </Text>
                    </View>

                    {/* [2] 할부일수 ROW: Key(좌) - Value(우) */}
                    <View style={[styles.summaryRow, styles.summaryRowLast]}>
                        <Text style={styles.summaryKeyText}>할부일수</Text>
                        {/* 일시불은 일반 텍스트 스타일 적용 */}
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