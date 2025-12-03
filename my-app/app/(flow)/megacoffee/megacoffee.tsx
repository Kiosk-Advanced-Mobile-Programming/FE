import { View, Text, Pressable, ScrollView, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from './megacoffee.styles'; // 스타일 파일 경로 확인

// ====================================================================
// ✅ 로컬 이미지 파일 require (정적 경로로 1:1 매핑)
// ID 1 ~ 28 (기존 메뉴) + ID 29 ~ 33 (푸드 메뉴)
// ====================================================================

// NOTE: Metro Bundler 제약으로 인해 동적 require가 불가능하므로, 
//       모든 이미지를 정적으로 require 합니다. 경로: '../../../assets/megaimages/'
const IMG_MEGA_1 = require('../../../assets/megaimages/mega1.png');
const IMG_MEGA_2 = require('../../../assets/megaimages/mega2.png');
const IMG_MEGA_3 = require('../../../assets/megaimages/mega3.png');
const IMG_MEGA_4 = require('../../../assets/megaimages/mega4.png');
const IMG_MEGA_5 = require('../../../assets/megaimages/mega5.png');
const IMG_MEGA_6 = require('../../../assets/megaimages/mega6.png');
const IMG_MEGA_7 = require('../../../assets/megaimages/mega7.png');
const IMG_MEGA_8 = require('../../../assets/megaimages/mega8.png');
const IMG_MEGA_9 = require('../../../assets/megaimages/mega9.png');
const IMG_MEGA_10 = require('../../../assets/megaimages/mega10.png');
const IMG_MEGA_11 = require('../../../assets/megaimages/mega11.png');
const IMG_MEGA_12 = require('../../../assets/megaimages/mega12.png');
const IMG_MEGA_13 = require('../../../assets/megaimages/mega13.png');
const IMG_MEGA_14 = require('../../../assets/megaimages/mega14.png');
const IMG_MEGA_15 = require('../../../assets/megaimages/mega15.png');
const IMG_MEGA_16 = require('../../../assets/megaimages/mega16.png');
const IMG_MEGA_17 = require('../../../assets/megaimages/mega17.png');
const IMG_MEGA_18 = require('../../../assets/megaimages/mega18.png');
const IMG_MEGA_19 = require('../../../assets/megaimages/mega19.png');
const IMG_MEGA_20 = require('../../../assets/megaimages/mega20.png');
const IMG_MEGA_21 = require('../../../assets/megaimages/mega21.png');
const IMG_MEGA_22 = require('../../../assets/megaimages/mega22.png');
const IMG_MEGA_23 = require('../../../assets/megaimages/mega23.png');
const IMG_MEGA_24 = require('../../../assets/megaimages/mega24.png');
const IMG_MEGA_25 = require('../../../assets/megaimages/mega25.png');
const IMG_MEGA_26 = require('../../../assets/megaimages/mega26.png');
const IMG_MEGA_27 = require('../../../assets/megaimages/mega27.png');
const IMG_MEGA_28 = require('../../../assets/megaimages/mega28.png');

// 💡 [푸드 메뉴용 이미지 추가] 
const IMG_MEGA_29 = require('../../../assets/megaimages/mega29.png');
const IMG_MEGA_30 = require('../../../assets/megaimages/mega30.png');
const IMG_MEGA_31 = require('../../../assets/megaimages/mega31.png');
const IMG_MEGA_32 = require('../../../assets/megaimages/mega32.png');
// NOTE: mega33.png 파일이 없으면 에러가 발생하므로, 임시로 mega32.png를 재사용합니다.
//       mega33.png 파일을 assets 폴더에 추가 후 아래 주석 해제 및 수정하세요.
// const IMG_MEGA_33 = require('../../../assets/megaimages/mega33.png'); 
const IMG_MEGA_33 = IMG_MEGA_32; 


// ====================================================================
// 장바구니 관련 타입 및 전역 상태 관리 정의 (export 유지)
// (생략 - 변경 없음)
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
interface OptionItem { name: string; menus: MenuItem[]; }
interface CategoryItem { name: string; options: OptionItem[]; }

// ====================================================================
// 🆕 수정된 메뉴 데이터 (푸드 카테고리 추가)
// ====================================================================

// 커피 - HOT (ID 1~5)
const coffeeHotMenus: MenuItem[] = [
    { id: 1, name: "헛개리카노 (H)", price: 2500, imageUrl: IMG_MEGA_1 }, 
    { id: 2, name: "에스프레소", price: 1500, imageUrl: IMG_MEGA_2 }, 
    { id: 3, name: "아메리카노 (H)", price: 2000, imageUrl: IMG_MEGA_3 }, 
    { id: 4, name: "꿀아메리카노 (H)", price: 3000, imageUrl: IMG_MEGA_4 }, 
    { id: 5, name: "콜드브루라떼 (H)", price: 4500, imageUrl: IMG_MEGA_5 }, 
];

// 커피 - ICE (ID 6~10)
const coffeeIceMenus: MenuItem[] = [
    { id: 6, name: "초코젤라또", price: 5000, imageUrl: IMG_MEGA_6 }, 
    { id: 7, name: "말차라떼 (I)", price: 4500, imageUrl: IMG_MEGA_7 }, 
    { id: 8, name: "헛개리카노 (I)", price: 2500, imageUrl: IMG_MEGA_8 }, 
    { id: 9, name: "메가리카노 (I)", price: 3000, imageUrl: IMG_MEGA_9 }, 
    { id: 10, name: "할메가커피 (I)", price: 3500, imageUrl: IMG_MEGA_10 }, 
];

// 티 - HOT (ID 11~13)
const teaHotMenus: MenuItem[] = [
    { id: 11, name: "상큼 리치티 (H)", price: 3500, imageUrl: IMG_MEGA_11 }, 
    { id: 12, name: "녹차 (H)", price: 3000, imageUrl: IMG_MEGA_12 }, 
    { id: 13, name: "사과유자차 (H)", price: 3800, imageUrl: IMG_MEGA_13 }, 
];

// 티 - ICE (ID 14~16)
const teaIceMenus: MenuItem[] = [
    { id: 14, name: "복숭아 아이스티 (I)", price: 3000, imageUrl: IMG_MEGA_14 }, 
    { id: 15, name: "얼그레이 (I)", price: 3200, imageUrl: IMG_MEGA_15 }, 
    { id: 16, name: "캐모마일 (I)", price: 3200, imageUrl: IMG_MEGA_16 }, 
];

// 에이드&주스 (ID 17~21)
const adeJuiceIceMenus: MenuItem[] = [
    { id: 17, name: "블루베리플럼주스", price: 4800, imageUrl: IMG_MEGA_17 }, 
    { id: 18, name: "콜드키위주스", price: 4500, imageUrl: IMG_MEGA_18 }, 
    { id: 19, name: "딸기주스", price: 4000, imageUrl: IMG_MEGA_19 }, 
    { id: 20, name: "딸기바나나주스", price: 4500, imageUrl: IMG_MEGA_20 }, 
    { id: 21, name: "라임모히또", price: 4200, imageUrl: IMG_MEGA_21 }, 
];

// 음료 - ICE (ID 22~25)
const drinkIceMenus: MenuItem[] = [
    { id: 22, name: "딸기라떼 (I)", price: 4500, imageUrl: IMG_MEGA_22 }, 
    { id: 23, name: "왕메가초코 (I)", price: 5500, imageUrl: IMG_MEGA_23 }, 
    { id: 24, name: "고구마라떼 (I)", price: 4500, imageUrl: IMG_MEGA_24 }, 
    { id: 25, name: "오레오초코라떼 (I)", price: 4800, imageUrl: IMG_MEGA_25 }, 
];

// 음료 - HOT (ID 26~28)
const drinkHotMenus: MenuItem[] = [
    { id: 26, name: "토피넛라떼 (H)", price: 4800, imageUrl: IMG_MEGA_26 }, 
    { id: 27, name: "고구마라떼 (H)", price: 4500, imageUrl: IMG_MEGA_27 }, 
    { id: 28, name: "핫초코 (H)", price: 4000, imageUrl: IMG_MEGA_28 }, 
];

// 💡 [새로운 푸드 메뉴 시작]

// 푸드 - 디저트 (ID 29~30)
const foodDessertMenus: MenuItem[] = [
    { id: 29, name: "매콤비빔주먹빵", price: 3500, imageUrl: IMG_MEGA_29 },
    { id: 30, name: "요거젤라또 초코베리믹스", price: 4500, imageUrl: IMG_MEGA_30 },
];

// 푸드 - 신상품 (ID 31~33)
const foodNewMenus: MenuItem[] = [
    { id: 31, name: "엠지씨네 계란물 치즈토스트", price: 4800, imageUrl: IMG_MEGA_31 },
    { id: 32, name: "에그베이컨 모닝버거", price: 4200, imageUrl: IMG_MEGA_32 },
    { id: 33, name: "치즈 품은 감자빵", price: 3900, imageUrl: IMG_MEGA_33 }, // IMG_MEGA_33 사용
];


// 최종 카테고리/옵션 구조 (푸드 카테고리 추가)
const MENU_DATA: CategoryItem[] = [
    { 
        name: '커피', 
        options: [ 
            { name: 'HOT', menus: coffeeHotMenus }, 
            { name: 'ICE', menus: coffeeIceMenus }, 
        ], 
    },
    { 
        name: '티', 
        options: [ 
            { name: 'HOT', menus: teaHotMenus }, 
            { name: 'ICE', menus: teaIceMenus }, 
        ], 
    },
    { 
        name: '에이드&주스', 
        options: [ 
            { name: 'ICE', menus: adeJuiceIceMenus }, 
        ], 
    },
    { 
        name: '음료', 
        options: [ 
            { name: 'ICE', menus: drinkIceMenus },
            { name: 'HOT', menus: drinkHotMenus },
        ], 
    },
    // 💡 [푸드 카테고리 추가]
    { 
        name: '푸드', 
        options: [ 
            { name: '디저트', menus: foodDessertMenus }, // ID 29-30
            { name: '신상품', menus: foodNewMenus }, // ID 31-33
        ], 
    },
];

// ====================================================================
// 메인 컴포넌트: Megacoffee (렌더링 로직은 그대로 유지)
// ====================================================================
export default function Megacoffee() {
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(MENU_DATA[0].name);
    const [selectedOptionName, setSelectedOptionName] = useState<string>(MENU_DATA[0].options[0].name);

    // 장바구니 아이템 배열 상태
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // 초기 장바구니 내용 로드
    useEffect(() => {
        setCartItems([...CART_STORAGE]);
    }, []);

    // 장바구니 업데이트 시 상태 갱신 함수
    const updateCartState = useCallback(() => {
        setCartItems([...CART_STORAGE]); 
    }, []);
    // 장바구니 업데이트 구독
    useCartUpdateSubscription(updateCartState);

    // 파생 상태: 장바구니 항목 개수
    const cartItemCount = useMemo(() => {
        return cartItems.length;
    }, [cartItems]);
    
    // 현재 선택된 카테고리/메뉴 계산 로직 (유지)
    const currentCategory = useMemo(() => {
        const found = MENU_DATA.find(cat => cat.name === selectedCategoryName);
        if (found) return found;
        
        // 찾지 못했을 경우 기본값 설정 및 옵션 초기화
        setSelectedCategoryName(MENU_DATA[0].name);
        setSelectedOptionName(MENU_DATA[0].options[0].name);
        return MENU_DATA[0];
    }, [selectedCategoryName]);

    // 카테고리 변경 시 옵션 초기화
    useEffect(() => {
        const defaultOption = currentCategory.options[0].name;
        if (selectedOptionName !== defaultOption) {
            setSelectedOptionName(defaultOption);
        }
    }, [selectedCategoryName, currentCategory]);

    const displayedMenus = useMemo(() => {
        const selectedOption = currentCategory.options.find(opt => opt.name === selectedOptionName);
        return selectedOption ? selectedOption.menus : [];
    }, [currentCategory, selectedOptionName]);

    // 장바구니 총액 계산
    const cartTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const optionCost = item.optionDetails.reduce((optTotal, opt) => optTotal + opt.price, 0);
            return total + (item.basePrice + optionCost) * item.quantity;
        }, 0);
    }, [cartItems]);

    // 장바구니 상세 페이지로 이동하는 함수
    const navigateToCartDetailPage = () => {
        if (cartItemCount > 0) {
            router.push('/(flow)/megacoffee/firstpopup');
        }
    };


    return (
        <View style={styles.wrap}>
            
            <View style={styles.topContainer}>
                {/* 1. Drink Type Row (상위 카테고리) */}
                <View style={[styles.drinkType, styles.drinkTypeFixedRow]}>
                    {MENU_DATA.map((category) => (
                        <Pressable
                            key={category.name}
                            onPress={() => setSelectedCategoryName(category.name)}
                            style={[styles.topOptionButtonFixed, selectedCategoryName === category.name && styles.topOptionButtonActive]}
                        >
                            <Text style={[styles.topText, selectedCategoryName === category.name && styles.topTextActive]}>{category.name}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* 2. Side Options Row (하위 옵션 메뉴) */}
                <View style={[styles.drinkTypeSide, styles.drinkTypeFixedRow]}>
                    {currentCategory.options.map((option) => (
                        <Pressable
                            key={option.name}
                            onPress={() => setSelectedOptionName(option.name)}
                            style={[styles.topOptionButtonFixed, selectedOptionName === option.name && styles.topOptionButtonActive]}
                        >
                            <Text style={[styles.topText, selectedOptionName === option.name && styles.topTextActive]}>{option.name}</Text>
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
                            // 메뉴 클릭 시 상세 화면으로 이동 (기존 로직 유지)
                            onPress={() => {
                                router.push({
                                    pathname: '/(flow)/megacoffee/megacoffeeoption', 
                                    params: { 
                                        name: item.name, 
                                        price: item.price.toString(), 
                                        category: selectedCategoryName, 
                                        option: selectedOptionName, 
                                    },
                                });
                            }}
                        >
                            <Image 
                                style={styles.menuImagePlaceholder} 
                                source={item.imageUrl} // 정적으로 require된 변수 사용
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
                <View style={styles.cartFooter}> 
                    
                    {/* === 왼쪽 영역: 상품 개수 및 가격 === */}
                    <View style={styles.cartInfoLeft}>
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                        </View>
                        <View>
                            <Text style={styles.cartCountText}>상품 {cartItemCount}개</Text>
                            <Text style={styles.cartPriceText}>{cartTotalPrice.toLocaleString()}원</Text>
                        </View>
                    </View>
                    
                    {/* === 오른쪽 영역: 결제하기 버튼 === */}
                    <Pressable 
                        style={styles.checkoutButton} 
                        onPress={navigateToCartDetailPage} 
                    >
                        <Text style={styles.checkoutButtonText}>결제하기</Text>
                    </Pressable>
                    
                </View>
            )}

        </View>
    );
}