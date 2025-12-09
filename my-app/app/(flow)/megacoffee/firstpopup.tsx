import React from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './firstpopup.styles'; // 스타일 파일 경로 확인

// megacoffee.tsx에서 정의된 타입과 상태 관리 함수를 가져옵니다.
import { 
    CartItem, 
    CART_STORAGE,
    // notifyCartUpdate, // 더 이상 사용되지 않음
} from './megacoffee'; 


const CartDetailPage: React.FC = () => {
    // 💡 megacoffee 페이지에서 전달된 파라미터를 받습니다.
    const params = useLocalSearchParams();

    // 장바구니 상태는 CART_STORAGE에서 직접 가져옵니다.
    const cartItems: CartItem[] = CART_STORAGE;
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // 총 결제 금액 계산
    const cartTotalPrice = cartItems.reduce((total, item) => {
        const optionCost = item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0);
        return total + (item.basePrice + optionCost) * item.quantity;
    }, 0);


    // [수정] 결제 방식 선택 후 secondpopup으로 이동하는 핸들러
    const handlePaymentSelection = (type: 'eat_in' | 'take_out') => {
        // 실제 앱에서는 선택된 type을 secondpopup으로 넘겨주어 
        // 결제 요약 정보에 반영해야 합니다. (현재는 단순 이동)
        
        // secondpopup 경로로 이동
        router.push({ pathname: '/megacoffee/secondpopup', params: params });
    };


    return (
        <View style={styles.pageWrap}> 
            
            {/* 상단 헤더 바 (텍스트 및 닫기 버튼 평행 정렬) */}
            <View style={styles.modalHeaderBar}>
                {/* 왼쪽 공백을 채우기 위한 뷰 */}
                <View style={styles.headerSpacer} />
                
                <Text style={styles.modalHeaderBarText}>
                    주문 세부 내역을 다시 한번 확인하여 주세요
                </Text>
                
                {/* 오른쪽 닫기 버튼 */}
                <Pressable onPress={() => router.back()} style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseIcon}>X</Text> 
                </Pressable>
            </View>

            {/* 주문 항목 목록 */}
            <ScrollView style={styles.modalContentScroll}>
                {cartItems.map((item, index) => {
                    const itemOptionCost = item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0);
                    const itemTotalPrice = (item.basePrice + itemOptionCost) * item.quantity;
                    return (
                        <View key={index} style={styles.modalCartItem}>
                            
                            {/* 상품명 및 옵션 - 좌측 영역 */}
                            <View style={styles.modalItemDetails}> 
                                
                                {/* 상품명 (순번과 상품명 같은 열에 정렬) */}
                                <View style={styles.modalItemNameLine}>
                                    <Text style={styles.modalItemIndex}>{index + 1}.</Text>
                                    <Text style={styles.modalItemName}>{item.name}</Text>
                                    <Text style={styles.modalItemBasePrice}> ({item.basePrice.toLocaleString()}원)</Text>
                                </View>

                                {/* 옵션 상세 내역 (상품명 아래에 표시) */}
                                {item.optionDetails.length > 0 && (
                                    <View style={styles.modalOptionList}>
                                        {item.optionDetails.map((opt, optIndex) => (
                                            <View key={optIndex} style={styles.modalOptionItem}>
                                                <Text style={styles.modalOptionText}>- {opt.name}</Text>
                                                {opt.price > 0 && (
                                                    <Text style={styles.modalOptionPrice}> (+{opt.price.toLocaleString()}원)</Text>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                )}
                                
                            </View>

                            {/* 최종 가격 및 수량 - 우측 영역 (수량 조절 버튼 제거) */}
                            <View style={styles.modalItemControlWrap}>
                                {/* 수량 표시 */}
                                <Text style={styles.quantityTextNoControl}>{item.quantity}개</Text>
                                {/* 최종 가격 */}
                                <Text style={styles.modalItemPrice}>{itemTotalPrice.toLocaleString()}원</Text>
                            </View>
                        </View>
                    );
                })}
                
                <Text style={styles.modalNoticeText}>
                    ※ 매장 이용 시 일회용컵 사용 불가 ※
                </Text>

            </ScrollView>


            {/* 하단 요약 및 액션 버튼 */}
            <View style={styles.modalFooter}>
                <View style={styles.modalSummary}>
                    <View style={styles.modalSummaryRow}>
                        <Text style={styles.modalSummaryText}>총 수량</Text>
                        <Text style={styles.modalSummaryValue}>{cartItemCount}개</Text>
                    </View>
                    <View style={styles.modalSummaryRow}>
                        <Text style={styles.modalSummaryTextTotal}>총 결제금액</Text>
                        <Text style={styles.modalSummaryValueTotal}>{cartTotalPrice.toLocaleString()}원</Text>
                    </View>
                </View>

                <View style={styles.modalActionButtons}>
                    {/* 뒤로가기 버튼 */}
                    <Pressable style={styles.modalActionButtonBack} onPress={() => router.back()}>
                        <Text style={styles.modalActionButtonText}>&lt;</Text>
                    </Pressable>
                    {/* 먹고가기 버튼 */}
                    <Pressable 
                        style={styles.modalActionButtonEat}
                        onPress={() => handlePaymentSelection('eat_in')} // <-- secondpopup으로 이동
                    >
                        <Text style={styles.modalActionButtonText}>M</Text>
                        <Text style={styles.modalActionButtonSubText}>먹고가기 (다회용컵)</Text>
                    </Pressable>
                    {/* 포장하기 버튼 */}
                    <Pressable 
                        style={styles.modalActionButtonTakeout}
                        onPress={() => handlePaymentSelection('take_out')} // <-- secondpopup으로 이동
                    >
                        <Text style={styles.modalActionButtonText}>☕</Text>
                        <Text style={styles.modalActionButtonSubText}>포장하기 (일회용컵)</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}

export default CartDetailPage;