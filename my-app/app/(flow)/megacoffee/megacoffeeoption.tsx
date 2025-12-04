import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo } from 'react';
// [수정] megacoffee.tsx에서 CART_STORAGE, notifyCartUpdate, CartItem 타입을 정확히 Named Import
import { 
    CART_STORAGE, 
    notifyCartUpdate, 
    CartItem,
    OptionDetail 
} from './megacoffee'; 
import optionStyles from './megacoffeeoption.styles'; // 옵션 스타일 임포트

// --- [타입 및 데이터 정의] ---
interface MenuParams {
    id?: string; // id는 현재 사용되지 않지만 타입 정의에 포함
    name: string;
    price: string;
    category: string;
    option: string; // Hot/Ice
}

const TUMBLER_OPTIONS = [
    { name: '텀블러', price: 0, key: 'tumbler' },
];

const SHOT_OPTIONS = [
    { name: '연하게', price: 0, key: 'light' },
    { name: '샷 추가', price: 500, key: 'add1shot' },
    { name: '2샷 추가', price: 1000, key: 'add2shot' },
];

const SYRUP_OPTIONS = [
    { name: '바닐라 시럽', price: 500, key: 'vanilla' },
    { name: '헤이즐넛 시럽', price: 500, key: 'hazelnut' },
    { name: '카라멜 시럽', price: 500, key: 'caramel' },
    { name: '시럽 미추가', price: 0, key: 'noSyrup' },
];

const TOPPING_OPTIONS = [
    { name: '휘핑 추가', price: 700, key: 'whipping' },
    { name: '초콜릿 토핑', price: 500, key: 'chocoTop' },
    { name: '치즈 폼', price: 1000, key: 'cheeseFoam' },
];

// 옵션 버튼 컴포넌트
const OptionButton = ({ option, isSelected, onPress }: { option: { name: string, price: number, key: string }, isSelected: boolean, onPress: () => void }) => (
    <Pressable
        style={[
            optionStyles.optionButton,
            isSelected && optionStyles.optionButtonActive,
            optionStyles.optionButtonFiveCol
        ]}
        onPress={onPress}
    >
        <Text style={[optionStyles.optionText, isSelected && optionStyles.optionTextActive]}>
            {option.name}
        </Text>
        {option.price > 0 && (
            <Text style={[optionStyles.optionPriceText, isSelected && optionStyles.optionTextActive]}>
                +{option.price.toLocaleString()}원
            </Text>
        )}
    </Pressable>
);

// --- [메인 컴포넌트] ---

export default function MegacoffeeOptionScreen() {
    const params = useLocalSearchParams() as unknown as MenuParams;
    const { name: menuName, price: basePriceStr, category, option } = params;
    
    const basePrice = parseInt(basePriceStr || '0', 10);
    
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
        tumbler: '',
        shot: '',
        syrup: '',
        topping: '',
    });

    // 최종 가격 계산 로직
    const finalPrice = useMemo(() => {
        let addedCost = 0;

        const optionsMap = {
            tumbler: TUMBLER_OPTIONS,
            shot: SHOT_OPTIONS,
            syrup: SYRUP_OPTIONS,
            topping: TOPPING_OPTIONS,
        };

        (Object.keys(optionsMap) as Array<keyof typeof optionsMap>).forEach(group => {
            const selectedKey = selectedOptions[group];
            if (selectedKey) {
                const opt = optionsMap[group].find(o => o.key === selectedKey);
                addedCost += opt ? opt.price : 0;
            }
        });

        return basePrice + addedCost;

    }, [basePrice, selectedOptions]);


    const handleOptionSelect = (group: keyof typeof selectedOptions, key: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            // 같은 키를 다시 누르면 선택 해제 (토글)
            [group]: prev[group] === key ? '' : key,
        }));
    };
    
    const handleClose = () => {
        router.back();
    };

    // 주문 담기 핸들러
    const handleOrder = () => {
        // 1. 선택된 옵션 디테일 추출
        const optionDetails: OptionDetail[] = []; // OptionDetail 타입 사용
        const optionsMap = {
            tumbler: TUMBLER_OPTIONS,
            shot: SHOT_OPTIONS,
            syrup: SYRUP_OPTIONS,
            topping: TOPPING_OPTIONS,
        };

        (Object.keys(optionsMap) as Array<keyof typeof optionsMap>).forEach(group => {
            const selectedKey = selectedOptions[group];
            if (selectedKey) {
                const opt = optionsMap[group].find(o => o.key === selectedKey);
                if (opt) {
                    optionDetails.push({
                        name: opt.name,
                        price: opt.price
                    });
                }
            }
        });
        
        // 2. 장바구니에 추가할 아이템 객체 생성 (CartItem 타입 사용)
        const newItem: CartItem = {
            name: `${menuName} (${option === 'hot' ? 'H' : 'I'})`,
            quantity: 1,
            basePrice: basePrice,
            optionDetails: optionDetails,
        };

        // 3. 임시 전역 장바구니에 아이템 추가
        CART_STORAGE.push(newItem);
        
        // 4. megacoffee 화면에 업데이트 알림
        notifyCartUpdate();

        Alert.alert("주문 담기 완료", `${newItem.name}이 장바구니에 추가되었습니다.`);

        // 5. 옵션 화면 닫기
        router.back();
    };

    return (
        <View style={optionStyles.wrap}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={optionStyles.scrollContent}>
                
                {/* 1. 닫기 버튼 및 타이틀 */}
                <View style={[optionStyles.rowContainer, optionStyles.headerRow]}>
                    <Text style={optionStyles.titleText}>{`${category} > ${option === 'hot' ? 'HOT' : 'ICE'}`}</Text>
                    <Pressable onPress={handleClose} style={optionStyles.closeButton}>
                        <Text style={optionStyles.closeButtonText}>X</Text>
                    </Pressable>
                </View>

                {/* 2. 음료 정보 및 가격 */}
                <View style={[optionStyles.rowContainer, optionStyles.menuInfoRow]}>
                    <View style={optionStyles.menuDetailLeft}>
                        <View style={optionStyles.menuImagePlaceholder} />
                        <Text style={optionStyles.menuNameText}>{menuName} ({option === 'hot' ? 'H' : 'I'})</Text>
                    </View>
                    <View style={optionStyles.menuDetailRight}>
                        <Text style={optionStyles.priceLabel}>총 가격</Text>
                        <Text style={optionStyles.priceText}>{finalPrice.toLocaleString()}원</Text>
                    </View>
                </View>
                
                {/* 3. 텀블러 옵션 */}
                <View style={[optionStyles.rowContainer, optionStyles.optionSectionRow]}>
                    <Text style={optionStyles.optionSectionTitle}>선택옵션: 텀블러(개인컵사용)</Text>
                    <View style={optionStyles.optionRow}>
                        {TUMBLER_OPTIONS.map(opt => (
                            <OptionButton
                                key={opt.key}
                                option={opt}
                                isSelected={selectedOptions.tumbler === opt.key}
                                onPress={() => handleOptionSelect('tumbler', opt.key)}
                            />
                        ))}
                    </View>
                </View>

                {/* 4. 샷/농도 옵션 */}
                <View style={[optionStyles.rowContainer, optionStyles.optionSectionRow]}>
                    <Text style={optionStyles.optionSectionTitle}>선택옵션: 샷/농도</Text>
                    <View style={optionStyles.optionRow}>
                        {SHOT_OPTIONS.map(opt => (
                            <OptionButton
                                key={opt.key}
                                option={opt}
                                isSelected={selectedOptions.shot === opt.key}
                                onPress={() => handleOptionSelect('shot', opt.key)}
                            />
                        ))}
                    </View>
                </View>
                
                {/* 5. 시럽 옵션 */}
                <View style={[optionStyles.rowContainer, optionStyles.optionSectionRow]}>
                    <Text style={optionStyles.optionSectionTitle}>선택옵션: 시럽 추가</Text>
                    <View style={optionStyles.optionRow}>
                        {SYRUP_OPTIONS.map(opt => (
                            <OptionButton
                                key={opt.key}
                                option={opt}
                                isSelected={selectedOptions.syrup === opt.key}
                                onPress={() => handleOptionSelect('syrup', opt.key)}
                            />
                        ))}
                    </View>
                </View>

                {/* 6. 토핑 옵션 */}
                <View style={[optionStyles.rowContainer, optionStyles.optionSectionRow]}>
                    <Text style={optionStyles.optionSectionTitle}>선택옵션: 토핑 선택</Text>
                    <View style={optionStyles.optionRow}>
                        {TOPPING_OPTIONS.map(opt => (
                            <OptionButton
                                key={opt.key}
                                option={opt}
                                isSelected={selectedOptions.topping === opt.key}
                                onPress={() => handleOptionSelect('topping', opt.key)}
                            />
                        ))}
                    </View>
                </View>
                
                <View style={optionStyles.spacer} />

            </ScrollView>

            {/* 7. 버튼 컨테이너 (하단 고정) */}
            <View style={[optionStyles.rowContainer, optionStyles.buttonRow]}>
                <Pressable style={optionStyles.cancelButton} onPress={handleClose}>
                    <Text style={optionStyles.buttonText}>취소</Text>
                </Pressable>
                <Pressable style={optionStyles.orderButton} onPress={handleOrder}>
                    <Text style={optionStyles.buttonText}>주문 담기 ({finalPrice.toLocaleString()}원)</Text>
                </Pressable>
            </View>

        </View>
    );
}