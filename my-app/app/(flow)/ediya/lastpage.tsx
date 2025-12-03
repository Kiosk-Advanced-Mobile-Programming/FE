import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
// [수정] 올바른 스타일 파일을 임포트하도록 경로 수정
import styles from './lastpage.styles'; 

// megacoffee.tsx에서 정의된 타입과 전역 상태를 재사용하여 정보 표시
import { 
    CART_STORAGE,
} from './megacoffee'; 

// ====================================================================
// 타입 정의
// ====================================================================

// 선택 가능한 결제 수단 타입 정의 (스타일링 목적)
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
    // Alert 메시지를 해당 버튼의 이름으로 명확하게 표시
    Alert.alert("기능 미구현", `${name} 결제/할인 기능은 현재 구현되지 않았습니다.`);
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
        style={[styles.allianceButton, selectedMethod === methodKey && styles.paymentButtonActive]}
        onPress={onPress}
    >
        <Text style={styles.allianceIcon}>{icon}</Text>
        <Text style={styles.allianceMainText}>{name}</Text>
        {subText && <Text style={styles.allianceSubText}>{subText}</Text>}
    </TouchableOpacity>
);

// 5. 카드결제 / 앱카드 섹션 Props (Layer 2)
interface LargePayButtonProps {
    icon: string;
    mainText: string;
    subText: string; // 카드 결제는 subText 필요
    methodKey: PaymentMethodType;
    selectedMethod: PaymentMethodType;
    onPress: () => void;
}

const LargePayButton: React.FC<LargePayButtonProps> = ({ icon, mainText, subText, methodKey, selectedMethod, onPress }) => (
    <TouchableOpacity 
        style={[styles.largePayButton, selectedMethod === methodKey && styles.paymentButtonActive]}
        onPress={onPress}
    >
        <Text style={styles.largePayIcon}>{icon}</Text>
        <Text style={styles.largePayText}>{mainText}</Text>
        <Text style={styles.largePaySubText}>{subText}</Text>
    </TouchableOpacity>
);

// 6. 간편 결제 버튼 (Grid Item) Props (Layer 3)
interface SimplePayItemProps {
    name: string;
    icon: string;
    selectedMethod: PaymentMethodType;
    onPress: () => void;
}

const SimplePayItem: React.FC<SimplePayItemProps> = ({ name, icon, selectedMethod, onPress }) => (
    <TouchableOpacity
        style={[styles.smallPayButton, selectedMethod === 'pay' && styles.paymentButtonActive]}
        onPress={onPress}
    >
        <Text style={styles.smallPayIcon}>{icon}</Text>
        <Text style={styles.smallPayText}>{name}</Text>
    </TouchableOpacity>
);

// 7. 쿠폰/선물페이 버튼 Props (Layer 4)
interface CouponPayButtonProps {
    icon: string;
    mainText: string;
    methodKey: PaymentMethodType;
    selectedMethod: PaymentMethodType;
    onPress: () => void;
}

const CouponPayButton: React.FC<CouponPayButtonProps> = ({ icon, mainText, methodKey, selectedMethod, onPress }) => (
    <TouchableOpacity 
        style={[styles.otherButton, selectedMethod === methodKey && styles.paymentButtonActive]}
        onPress={onPress}
    >
        <Text style={styles.otherButtonIcon}>{icon}</Text>
        <Text style={styles.otherButtonText}>{mainText}</Text>
    </TouchableOpacity>
);

// ====================================================================
// 메인 컴포넌트
// ====================================================================

const PaymentSelectionPage: React.FC = () => {
    const { cartTotalPrice, discountPrice } = calculateCartSummary();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);

    // [요구사항] 카드 결제 버튼만 활성화 로직
    const handleCardPayment = (method: 'card' | 'app') => {
        setSelectedMethod(method);
        Alert.alert("카드 결제 요청", `키오스크의 결제 장치에 ${method === 'card' ? '카드' : '앱카드 QR/바코드'}를 인식시켜주세요.`);
    };

    // 간편 결제 버튼 목록 (Layer 3)
    const simplePayButtons = [
        { name: '카카오페이', icon: 'K', methodKey: 'pay' as PaymentMethodType },
        { name: 'PAYCO', icon: 'P', methodKey: 'pay' as PaymentMethodType },
        { name: '네이버페이', icon: 'N', methodKey: 'pay' as PaymentMethodType },
        { name: '제로페이', icon: 'Z', methodKey: 'pay' as PaymentMethodType },
        { name: 'BC북페이', icon: 'B', methodKey: 'pay' as PaymentMethodType },
        { name: '하나페이', icon: 'H', methodKey: 'pay' as PaymentMethodType },
        { name: 'KB페이', icon: 'K', methodKey: 'pay' as PaymentMethodType },
    ];


    return (
        <View style={styles.pageWrap}> 
            
            {/* 1. 최상단바 (결제수단을 선택해주세요와 X 버튼) - Layer 0 */}
            <View style={styles.modalHeaderBar}>
                <Text style={styles.modalHeaderBarText}>
                    결제 수단 선택 ({cartTotalPrice.toLocaleString()}원)
                </Text>
                {/* 닫기 버튼 */}
                <Pressable onPress={() => router.back()} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseIcon}>X</Text> 
                </Pressable>
            </View>

            {/* 메인 콘텐츠 스크롤 영역 */}
            <ScrollView style={styles.modalContentScroll}>

                {/* 2. 텍스트: STEP1 제휴할인을 선택해주세요 */}
                <Text style={styles.stepTitle}>STEP2 결제방식을 선택해주세요.</Text>

                {/* 3. 버튼: KT, T우주 - Layer 1 (4열이 꽉 차게 변경됨) */}
                <View style={styles.allianceButtonRow}>
                    <AllianceButton
                        name="모바일 페이" icon="" subText="" methodKey="kt" 
                        selectedMethod={selectedMethod}
                        // [수정] onPress 인수 수정
                        onPress={() => handlePlaceholderAction('모바일 페이', 'kt', setSelectedMethod)}
                    />
                    <AllianceButton
                        name="모바일 쿠폰 멤버스 쿠폰" icon="" methodKey="uwoo" 
                        selectedMethod={selectedMethod}
                        // [수정] onPress 인수 수정
                        onPress={() => handlePlaceholderAction('모바일 쿠폰 멤버스 쿠폰', 'uwoo', setSelectedMethod)}
                    />
                    <AllianceButton
                        name="이디야 카드결제" icon="" methodKey="app" 
                        selectedMethod={selectedMethod}
                        // [수정] onPress 인수 수정
                        onPress={() => handlePlaceholderAction('이디야 카드결제', 'app', setSelectedMethod)}
                    />
                    <AllianceButton
                        name="카드결제" icon="" methodKey="card" 
                        selectedMethod={selectedMethod}
                        // [수정] onPress 인수 수정
                        onPress={() => handlePlaceholderAction('카드결제', 'card', setSelectedMethod)}
                    />
                </View>

            </ScrollView>

            {/* 8. 주문금액 총 값 - Layer 5 (Footer) */}
            <View style={styles.modalFooter}>
                <View style={styles.footerSummary}>
                    <Text style={styles.footerSummaryText}>주문금액: {cartTotalPrice.toLocaleString()}원</Text>
                    <Text style={styles.footerSummaryText}>- 할인금액: {discountPrice.toLocaleString()}원</Text>
                </View>
                <View style={styles.footerTotal}>
                    <Text style={styles.footerTotalText}>결제금액:</Text>
                    <Text style={styles.footerTotalValue}>{cartTotalPrice.toLocaleString()}원</Text>
                </View>
            </View>

        </View>
    );
}

export default PaymentSelectionPage;