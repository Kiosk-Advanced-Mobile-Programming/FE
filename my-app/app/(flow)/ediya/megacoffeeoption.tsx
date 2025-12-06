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
// 💡 [추가] 글로벌 상태 업데이트 함수 임포트
import { setMissionSuccess } from './globalState';

// --- [타입 및 데이터 정의] ---
interface MenuParams {
    id?: string; // id는 현재 사용되지 않지만 타입 정의에 포함
    name: string;
    price: string;
    category: string;
    option: string; // Hot/Ice
}

const TUMBLER_OPTIONS = [
    { name: 'HOT', price: 0, key: 'tumbler-hot' },
    { name: 'ICE', price: 0, key: 'tumbler-ice' },
];

const SHOT_OPTIONS = [
    { name: 'L', price: 0, key: 'light' },
    { name: 'EX', price: 500, key: 'add1shot' },
];

const SYRUP_OPTIONS = [
    { name: '추가', price: 0, key: 'vanilla' },
];

const TOPPING_OPTIONS = [
    { name: '추가', price: 700, key: 'whipping' },
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
    // ... (기존 옵션 디테일 추출 로직 유지) ...
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

    // 💡 미션 성공 여부 확인
    let isMissionSuccess = false;

    // level.tsx의 버튼 2 미션: '아메리카노(HOT), 샷(L) 선택 후 주문 담기'
    const requiredShotKey = 'light';
    const MISSION_ID = 'mission-easy';

    if (menuName === '아메리카노' && selectedOptions.shot === requiredShotKey) {
        // 미션 요구사항(샷(L) 선택)을 충족했을 경우
        isMissionSuccess = true;
    }

    // 🎯 [핵심 추가] 미션 성공 여부를 글로벌 상태에 저장
    setMissionSuccess(MISSION_ID, isMissionSuccess);
    console.log(`[미션 결과] 난이도 하 (샷:L 선택): ${isMissionSuccess}`);
    Alert.alert("주문 담기 완료", `미션 성공 여부: ${isMissionSuccess ? '성공 (true)' : '실패 (false)'}로 저장되었습니다.`);

    // ... (기존 장바구니 추가 로직 유지) ...
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