import { View, Text, Pressable, ScrollView, Alert, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from './megacoffee.styles'; // 스타일 파일 경로 확인

// ====================================================================
// ✅ 로컬 이미지 파일 require (정적 경로로 1:1 매핑) - 생략 없이 유지
// ====================================================================
const IMG_MEGA_1 = require('../../../assets/ediyaimages/ediya1.png');
const IMG_MEGA_2 = require('../../../assets/ediyaimages/ediya2.png');
const IMG_MEGA_3 = require('../../../assets/ediyaimages/ediya3.png');
const IMG_MEGA_4 = require('../../../assets/ediyaimages/ediya4.png');
const IMG_MEGA_5 = require('../../../assets/ediyaimages/ediya5.png');
const IMG_MEGA_6 = require('../../../assets/ediyaimages/ediya6.png');
const IMG_MEGA_7 = require('../../../assets/ediyaimages/ediya7.png');
const IMG_MEGA_8 = require('../../../assets/ediyaimages/ediya8.png');
const IMG_MEGA_9 = require('../../../assets/ediyaimages/ediya9.png');
const IMG_MEGA_10 = require('../../../assets/ediyaimages/ediya10.png');
const IMG_MEGA_11 = require('../../../assets/ediyaimages/ediya11.png');
const IMG_MEGA_12 = require('../../../assets/ediyaimages/ediya12.png');
const IMG_MEGA_13 = require('../../../assets/ediyaimages/ediya13.png');
const IMG_MEGA_14 = require('../../../assets/ediyaimages/ediya14.png');
const IMG_MEGA_15 = require('../../../assets/ediyaimages/ediya15.png');
const IMG_MEGA_16 = require('../../../assets/ediyaimages/ediya16.png');
const IMG_MEGA_17 = require('../../../assets/ediyaimages/ediya17.png');
const IMG_MEGA_18 = require('../../../assets/ediyaimages/ediya18.png');
const IMG_MEGA_19 = require('../../../assets/ediyaimages/ediya19.png');
const IMG_MEGA_20 = require('../../../assets/ediyaimages/ediya20.png');
const IMG_MEGA_21 = require('../../../assets/ediyaimages/ediya21.png');
const IMG_MEGA_22 = require('../../../assets/ediyaimages/ediya22.png');
const IMG_MEGA_23 = require('../../../assets/ediyaimages/ediya23.png');
const IMG_MEGA_24 = require('../../../assets/ediyaimages/ediya24.png');
const IMG_MEGA_25 = require('../../../assets/ediyaimages/ediya25.png');
const IMG_MEGA_26 = require('../../../assets/ediyaimages/ediya26.png');
const IMG_MEGA_27 = require('../../../assets/ediyaimages/ediya27.png');
const IMG_MEGA_28 = require('../../../assets/ediyaimages/ediya28.png');
const IMG_MEGA_29 = require('../../../assets/ediyaimages/ediya29.png');
const IMG_MEGA_30 = require('../../../assets/ediyaimages/ediya30.png');
const IMG_MEGA_31 = require('../../../assets/ediyaimages/ediya31.png');
const IMG_MEGA_32 = require('../../../assets/ediyaimages/ediya32.png');


// ====================================================================
// 장바구니 관련 타입 및 전역 상태 관리 정의
// ====================================================================
export interface OptionDetail {
    name: string;
    price: number;
}

export interface CartItem {
    name: string;
    quantity: number;
    basePrice: number;
    optionDetails: OptionDetail[];
}

export const CART_STORAGE: CartItem[] = []; 
let updateCallbacks: (() => void)[] = [];

export const notifyCartUpdate = () => {
    updateCallbacks.forEach(cb => cb());
};

const useCartUpdateSubscription = (callback: () => void) => {
    useEffect(() => {
        updateCallbacks.push(callback);
        return () => {
            updateCallbacks = updateCallbacks.filter(cb => cb !== callback);
        };
    }, [callback]);
};

// --- [데이터 구조 정의] ---
interface MenuItem { 
    id: number; 
    name: string; 
    price: number; 
    imageUrl: any; 
}
interface CategoryItem { 
    name: string; 
    menus: MenuItem[]; 
}

// 이미지 배열 - 생략 없이 유지
const ALL_MEGA_IMAGES = [
    IMG_MEGA_1, IMG_MEGA_2, IMG_MEGA_3, IMG_MEGA_4, IMG_MEGA_5, IMG_MEGA_6, IMG_MEGA_7, IMG_MEGA_8,
    IMG_MEGA_9, IMG_MEGA_10, IMG_MEGA_11, IMG_MEGA_12, IMG_MEGA_13, IMG_MEGA_14, IMG_MEGA_15, IMG_MEGA_16,
    IMG_MEGA_17, IMG_MEGA_18, IMG_MEGA_19, IMG_MEGA_20, IMG_MEGA_21, IMG_MEGA_22, IMG_MEGA_23, IMG_MEGA_24,
    IMG_MEGA_25, IMG_MEGA_26, IMG_MEGA_27, IMG_MEGA_28, IMG_MEGA_29, IMG_MEGA_30, IMG_MEGA_31, IMG_MEGA_32,
];
const BASE_PRICE = 3000; 

// ====================================================================
// 8개의 카테고리 데이터 (요청에 따라 직접 정의) - 생략 없이 유지
// ====================================================================

// helper function: 메뉴 객체 생성
const createMenuItem = (globalIdx: number, name: string): MenuItem => ({
    id: globalIdx + 1,
    name: name,
    price: BASE_PRICE + ((globalIdx + 1) % 5) * 100, // 기존 가격 책정 로직 유지
    imageUrl: ALL_MEGA_IMAGES[globalIdx],
});

let currentImageIdx = 0;

export const MENU_DATA: CategoryItem[] = [
    {
        name: '커피',
        menus: [
            createMenuItem(currentImageIdx++, '헤이즐넛 젤라또 카페모카'),
            createMenuItem(currentImageIdx++, '콜드블루'),
            createMenuItem(currentImageIdx++, '흑상 콜드브루'),
            createMenuItem(currentImageIdx++, '아메리카노'),
        ]
    },
    {
        name: '베버리지',
        menus: [
            createMenuItem(currentImageIdx++, '멜팅피스타치오'),
            createMenuItem(currentImageIdx++, '너티 초콜릿'),
            createMenuItem(currentImageIdx++, '딸기자두 요구르트'),
            createMenuItem(currentImageIdx++, '치즈폼 딸기라떼'),
        ]
    },
    {
        name: '블렌딩 티',
        menus: [
            createMenuItem(currentImageIdx++, '딸기감귤티'),
            createMenuItem(currentImageIdx++, '아샷추 복숭아'),
            createMenuItem(currentImageIdx++, '아망추 복숭아'),
            createMenuItem(currentImageIdx++, '버블 크림 밀크티'),
        ]
    },
    {
        name: '플랫치노',
        menus: [
            createMenuItem(currentImageIdx++, '딸기 요거트 플랫치노'),
            createMenuItem(currentImageIdx++, '꿀복숭이 플랫치노'),
            createMenuItem(currentImageIdx++, '초콜릿 칩 블랫치노'),
            createMenuItem(currentImageIdx++, '민트 초콜릿 칩 플랫치노'),
        ]
    },
    {
        name: '쉐이크&에이드',
        menus: [
            createMenuItem(currentImageIdx++, '자몽 포멜로 에이드'),
            createMenuItem(currentImageIdx++, '머스캣 모히토 에이드'),
            createMenuItem(currentImageIdx++, '감귤 레몬 에이드'),
            createMenuItem(currentImageIdx++, '초코쿠키 쉐이크'),
        ]
    },
    {
        name: '디카페인',
        menus: [
            createMenuItem(currentImageIdx++, '헤이즐넛 젤라또 카페모카'),
            createMenuItem(currentImageIdx++, '헤이즐넛 아메리카노'),
            createMenuItem(currentImageIdx++, '디카페인 아포가토 오리지널'),
            createMenuItem(currentImageIdx++, '디카페인 에스프레소'),
        ]
    },
    {
        name: '빙수',
        menus: [
            createMenuItem(currentImageIdx++, '망고 그래놀라 빙수'),
            createMenuItem(currentImageIdx++, '팥 인절미 빙수'),
            createMenuItem(currentImageIdx++, '초당 옥수수 빙수'),
            createMenuItem(currentImageIdx++, '옥수수 크런치 눈꽃빙수'),
        ]
    },
    {
        name: '아이스크림',
        menus: [
            createMenuItem(currentImageIdx++, '카라멜 크런치'),
            createMenuItem(currentImageIdx++, '멜로우 초코'),
            createMenuItem(currentImageIdx++, '허니 치즈 그래놀라'),
            createMenuItem(currentImageIdx++, '든든 베리 망고'),
        ]
    },
];


// 1~4 카테고리와 5~8 카테고리를 분리합니다.
const TOP_ROW_CATEGORIES = MENU_DATA.slice(0, 4);    
const BOTTOM_ROW_CATEGORIES = MENU_DATA.slice(4, 8); 


// ====================================================================
// 메인 컴포넌트: Megacoffee
// ====================================================================
export default function Megacoffee() {
    // 💡 selectedCategoryName만 필요합니다.
    const params = useLocalSearchParams();

    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(MENU_DATA[0].name);

    // 장바구니 아이템 배열 상태 (유지)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    useEffect(() => {
        setCartItems([...CART_STORAGE]);
    }, []);
    const updateCartState = useCallback(() => {
        setCartItems([...CART_STORAGE]); 
    }, []);
    useCartUpdateSubscription(updateCartState);

    const cartItemCount = useMemo(() => cartItems.length, [cartItems]);
    
    // 현재 선택된 카테고리를 찾습니다.
    const currentCategory = useMemo(() => {
        return MENU_DATA.find(cat => cat.name === selectedCategoryName) || MENU_DATA[0];
    }, [selectedCategoryName]);

    // 표시될 메뉴 목록은 선택된 카테고리의 menus 속성입니다.
    const displayedMenus = useMemo(() => {
        return currentCategory.menus;
    }, [currentCategory]);

    // 장바구니 총액 계산 (유지)
    const cartTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const optionCost = item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0);
            return total + (item.basePrice + optionCost) * item.quantity;
        }, 0);
    }, [cartItems]);

    // 장바구니 상세 페이지로 이동하는 함수 (유지)
    const navigateToCartDetailPage = () => {
        if (cartItemCount > 0) {
            // firstpopup으로 이동
            router.push({ pathname: '/(flow)/ediya/firstpopup', params: params }); 
        }
    };

    // 💡 [추가] 장바구니 초기화 핸들러
    const handleClearCart = () => {
        Alert.alert(
            "장바구니 초기화",
            "장바구니의 모든 메뉴를 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                { 
                    text: "삭제", 
                    onPress: () => {
                        // 1. 전역 장바구니 데이터 초기화
                        CART_STORAGE.length = 0;
                        // 2. 상태 업데이트를 알림
                        notifyCartUpdate();
                        Alert.alert("완료", "장바구니가 초기화되었습니다.");
                    },
                    style: "destructive"
                }
            ]
        );
    };


    return (
        <View style={styles.wrap}>
            
            <View style={styles.topContainer}>
                {/* 1. 상단 4개 버튼 (Category 1~4) */}
                <View style={[styles.drinkType, styles.drinkTypeFixedRow]}>
                    {TOP_ROW_CATEGORIES.map((category) => (
                        <Pressable
                            key={category.name}
                            onPress={() => setSelectedCategoryName(category.name)}
                            style={[styles.topOptionButtonFixed, selectedCategoryName === category.name && styles.topOptionButtonActive]}
                        >
                            <Text style={[styles.topText, selectedCategoryName === category.name && styles.topTextActive]}>{category.name}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* 2. 하단 4개 버튼 (Category 5~8) */}
                <View style={[styles.drinkTypeSide, styles.drinkTypeFixedRow]}>
                    {BOTTOM_ROW_CATEGORIES.map((category) => (
                        <Pressable
                            key={category.name}
                            onPress={() => setSelectedCategoryName(category.name)}
                            style={[styles.topOptionButtonFixed, selectedCategoryName === category.name && styles.topOptionButtonActive]}
                        >
                            <Text style={[styles.topText, selectedCategoryName === category.name && styles.topTextActive]}>{category.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* 3. Menu Grid (실제 메뉴 목록) */}
            <ScrollView style={styles.contentContainer}>
                <View style={styles.menuGrid}>
                    {displayedMenus.map((item) => (
                        <Pressable
                            key={item.id}
                            style={styles.menuContainer}
                            // 메뉴 클릭 시 상세 화면으로 이동
                            onPress={() => {
                                router.push({
                                    pathname: '/(flow)/ediya/megacoffeeoption', 
                                    params: {
                                        ...params,
                                        id: String(item.id),
                                        name: item.name, 
                                        price: item.price.toString(), 
                                        // 💡 카테고리만 전달하고 옵션은 생략합니다.
                                        category: selectedCategoryName, 
                                        option: 'ICE', // 기본값으로 'ICE' 또는 'hot/ice' 선택을 위한 값 전달 (옵션 화면에서 선택)
                                    },
                                });
                            }}
                        >
                            <Image 
                                style={styles.menuImagePlaceholder} 
                                source={item.imageUrl}
                                resizeMode="cover" 
                            />
                            
                            <Text style={styles.menuTextName}>{item.name}</Text>
                            <Text style={styles.menuTextPrice}>{item.price.toLocaleString()}원</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            
            {/* 4. 장바구니 하단 컨테이너 */}
            {cartItemCount > 0 && (
                <View style={[styles.cartFooter, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}> 
                    
                    {/* === 왼쪽 영역: 상품 개수 및 가격 + 초기화 버튼 === */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.cartInfoLeft}>
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                            </View>
                            <View>
                                <Text style={styles.cartCountText}>상품 {cartItemCount}개</Text>
                                <Text style={styles.cartPriceText}>{cartTotalPrice.toLocaleString()}원</Text>
                            </View>
                        </View>
                        
                        {/* 💡 [추가된 부분] 장바구니 초기화 버튼 */}
                        <Pressable 
                            style={[{ 
                                paddingHorizontal: 10, 
                                paddingVertical: 8, 
                                backgroundColor: '#f0f0f0', // 연한 회색 배경
                                borderRadius: 5,
                                marginLeft: 10, // 기존 정보와 간격
                                height: 40, // 높이 조정
                                justifyContent: 'center',
                            }]} 
                            onPress={handleClearCart}
                        >
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666' }}>초기화</Text>
                        </Pressable>
                    </View>
                    
                    {/* === 오른쪽 영역: 결제하기 버튼 === */}
                    <Pressable 
                        style={[styles.checkoutButton, { flex: 0, paddingHorizontal: 30 }]} 
                        onPress={navigateToCartDetailPage} 
                    >
                        <Text style={styles.checkoutButtonText}>결제하기</Text>
                    </Pressable>
                    
                </View>
            )}

        </View>
    );
}