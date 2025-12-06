import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import styles from './lastpage.styles';

// megacoffee.tsx에서 정의된 타입과 전역 상태를 재사용하여 정보 표시
import {
    CART_STORAGE,
    // 필요한 경우 OptionDetail 타입을 여기에 추가
} from './megacoffee';

// 💡 [수정] 전역 미션 상태를 가져오는 함수 임포트
import { getMissionSuccess, getMissionDetails } from './globalState';

// ====================================================================
// 타입 정의
// ====================================================================

type PaymentMethodType = 'card' | 'app' | 'kt' | 'uwoo' | 'pay' | 'coupon' | null;

// ====================================================================
// 임시 데이터 및 로직
// ====================================================================

// 임시 결제 정보 계산 함수
const calculateCartSummary = () => {
    // 실제 장바구니 데이터를 기반으로 계산
    const cartTotalPrice = CART_STORAGE.reduce((total, item) =>
        total + item.basePrice * item.quantity + item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0) * item.quantity
    , 0) || 5000;
    const discountPrice = 0; // 임시 할인 금액
    return { cartTotalPrice, discountPrice };
};

// 범용적인 Placeholder 액션 핸들러
const handlePlaceholderAction = (
    name: string,
    methodType: PaymentMethodType,
    setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethodType>>
) => {
    setSelectedMethod(methodType);
    Alert.alert("기능 미구현", `${name} 결제/할인 기능은 현재 구현되지 않았습니다.`);
};

// 💡 [수정] 미션 성공 여부 확인 및 페이지 이동 로직
const handleCardPaymentLogic = () => {

    const MISSION_ID = 'mission-easy';

    // 1. 저장된 미션 상태를 불러옵니다.
    const isMissionSuccess = getMissionSuccess(MISSION_ID);

    // 2. 결과 페이지로 이동 (Params 전달)
    // router.replace를 사용하여 결제 페이지를 스택에서 제거하고 결과 페이지로 이동
    router.replace({
        pathname: '/(flow)/ediya/result', // 💡 사용자 설정 결과 페이지 주소
        params: {
            isSuccess: isMissionSuccess ? 'true' : 'false', // boolean을 문자열로 전달
            missionId: MISSION_ID // 미션 ID를 전달하여 결과 페이지에서 미션 내용 조회
        } as any
    });
};

// ====================================================================
// 컴포넌트 분리
// ====================================================================

// 3. 제휴 할인 버튼 섹션 Props (Layer 1)
interface AllianceButtonProps {
    name: string;
    icon: string;
    subText?: string;
    methodKey: PaymentMethodType;
    selectedMethod: PaymentMethodType;
    onPress: () => void;
}

const AllianceButton: React.FC<AllianceButtonProps> = ({ name, icon, subText, methodKey, selectedMethod, onPress }) => (
    <TouchableOpacity
        // ❌ [오류 수정] otherButtonActive 대신 paymentButtonActive 사용
        style={[styles.allianceButton, selectedMethod === methodKey && styles.paymentButtonActive]}
        onPress={onPress}
    >
        <Text style={styles.allianceIcon}>{icon}</Text>
        <Text style={styles.allianceMainText}>{name}</Text>
        {subText && <Text style={styles.allianceSubText}>{subText}</Text>}
    </TouchableOpacity>
);

// (LargePayButton, SimplePayItem, CouponPayButton 등 사용되지 않는 컴포넌트 정의는 생략)


// ====================================================================
// 메인 컴포넌트
// ====================================================================

const PaymentSelectionPage: React.FC = () => {
    const { cartTotalPrice, discountPrice } = calculateCartSummary();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('card'); // 기본값 'card'로 설정

    // Note: lastpage.styles.ts 파일이 없어서 스타일을 사용할 수 없습니다.
    // 임시로 View에 기본 스타일을 적용하여 화면이 깨지는 것을 방지합니다.

    const fallbackStyles = StyleSheet.create({
        pageWrap: { flex: 1, backgroundColor: '#fff' },
        modalHeaderBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
        modalHeaderBarText: { fontSize: 18, fontWeight: 'bold' },
        modalCloseButton: { padding: 5 },
        modalCloseIcon: { fontSize: 18, color: '#666' },
        modalContentScroll: { flex: 1, padding: 20 },
        stepTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' },
        allianceButtonRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
        allianceButton: { width: '48%', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', marginVertical: 5 },
        paymentButtonActive: { borderColor: '#007bff', borderWidth: 2 },
        allianceIcon: { fontSize: 30, marginBottom: 5 },
        allianceMainText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
        allianceSubText: { fontSize: 12, color: '#999', textAlign: 'center' },
        modalFooter: { borderTopWidth: 1, borderTopColor: '#eee', padding: 20 },
        footerSummary: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
        footerSummaryText: { fontSize: 14, color: '#666' },
        footerTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        footerTotalText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
        footerTotalValue: { fontSize: 24, fontWeight: 'bold', color: '#007bff' },
    });

    // styles 대신 fallbackStyles 사용
    const finalStyles = styles || fallbackStyles;

    return (
        <View style={finalStyles.pageWrap}>

            {/* 1. 최상단바 (결제수단을 선택해주세요와 X 버튼) - Layer 0 */}
            <View style={finalStyles.modalHeaderBar}>
                {/* ❌ [오류 수정] modalHeaderBarText 사용 */}
                <Text style={finalStyles.modalHeaderBarText}>
                    결제 수단 선택 ({cartTotalPrice.toLocaleString()}원)
                </Text>
                {/* 닫기 버튼 */}
                {/* ❌ [오류 수정] modalCloseButton 사용 */}
                <Pressable onPress={() => router.back()} style={finalStyles.modalCloseButton}>
                    {/* ❌ [오류 수정] modalCloseIcon 사용 */}
                    <Text style={finalStyles.modalCloseIcon}>X</Text>
                </Pressable>
            </View>

            {/* 메인 콘텐츠 스크롤 영역 */}
            <ScrollView style={finalStyles.modalContentScroll}>

                {/* 2. 텍스트: STEP2 결제방식을 선택해주세요 */}
                <Text style={finalStyles.stepTitle}>STEP2 결제방식을 선택해주세요.</Text>

                {/* 3. 버튼: KT, T우주, 이디야 카드결제, 카드결제 - Layer 1 */}
                <View style={finalStyles.allianceButtonRow}>
                    <AllianceButton
                        name="모바일 페이" icon="📱" methodKey="kt"
                        selectedMethod={selectedMethod}
                        onPress={() => handlePlaceholderAction('모바일 페이', 'kt', setSelectedMethod)}
                    />
                    <AllianceButton
                        name="모바일 쿠폰 멤버스 쿠폰" icon="🎫" methodKey="uwoo"
                        selectedMethod={selectedMethod}
                        onPress={() => handlePlaceholderAction('모바일 쿠폰 멤버스 쿠폰', 'uwoo', setSelectedMethod)}
                    />
                    <AllianceButton
                        name="이디야 카드결제" icon="💰" methodKey="app"
                        selectedMethod={selectedMethod}
                        onPress={() => handlePlaceholderAction('이디야 카드결제', 'app', setSelectedMethod)}
                    />
                    {/* 🎯 [핵심 수정] 카드 결제 버튼을 미션 결과 확인 로직에 연결 */}
                    <AllianceButton
                        name="카드결제" icon="💳" methodKey="card"
                        selectedMethod={selectedMethod}
                        // 💡 미션 성공 여부 확인 후 /result 페이지로 이동
                        onPress={handleCardPaymentLogic}
                    />
                </View>

                {/* 기타 결제 수단이 있다면 여기에 추가 */}

            </ScrollView>

            {/* 8. 주문금액 총 값 - Layer 5 (Footer) */}
            <View style={finalStyles.modalFooter}>
                <View style={finalStyles.footerSummary}>
                    <Text style={finalStyles.footerSummaryText}>주문금액: {cartTotalPrice.toLocaleString()}원</Text>
                    <Text style={finalStyles.footerSummaryText}>- 할인금액: {discountPrice.toLocaleString()}원</Text>
                </View>
                <View style={finalStyles.footerTotal}>
                    <Text style={finalStyles.footerTotalText}>결제금액:</Text>
                    <Text style={finalStyles.footerTotalValue}>{cartTotalPrice.toLocaleString()}원</Text>
                </View>
            </View>

        </View>
    );
}

export default PaymentSelectionPage;