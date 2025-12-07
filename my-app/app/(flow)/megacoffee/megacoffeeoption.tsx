import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { 
    CART_STORAGE, 
    notifyCartUpdate, 
    CartItem,
    OptionDetail 
} from './megacoffee'; 
// 💡 [추가] 미션 ID를 가져오고 결과를 저장하는 함수 임포트
import { getMissionId, setMissionResult } from './globalState';

import optionStyles from './megacoffeeoption.styles'; // 옵션 스타일 임포트

// --- [타입 및 데이터 정의] ---
interface MenuParams {
    id?: string; 
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

    // 💡 [수정됨] 주문 담기 버튼을 눌렀을 때만 실행되도록 함수 안으로 이동
    const handleOrder = () => {
        
        // 💡 [추가된 로직] 미션 성공 여부 판별
        const missionId = getMissionId();
        let isSuccess = false;

        if (missionId) {
            // 난이도 하 (mission-2): 아메리카노(H) (ID: 3)를 담았을 때 성공
            // 💡 메뉴 이름 대신 고유 ID로 비교하여 더 정확하게 판별합니다.
            if (missionId === 'mission-2' && params.id === '3' && option === 'hot') {
                isSuccess = true;
            }
            // 난이도 중 (mission-3): 고구마라떼 (H) (ID: 27) + 텀블러 옵션
            else if (
                missionId === 'mission-3' &&
                params.id === '27' &&
                option === 'hot' &&
                selectedOptions.tumbler === 'tumbler'
            ) {
                isSuccess = true;
            }
            // 난이도 상 (mission-4): 할메가커피 (I) (ID: 10) + 연하게 옵션 + 초코토핑 옵션
            else if (
                missionId === 'mission-4' &&
                params.id === '10' &&
                option === 'ice' &&
                selectedOptions.shot === 'light' && 
                selectedOptions.topping === 'chocoTop'
            ) {
                isSuccess = true;
            }
        } else {
            // 미션 모드가 아니면 (살펴보기) 무조건 성공으로 처리
            isSuccess = true;
        }

        // 💡 중요: 미션 성공 시에만 결과를 업데이트합니다.
        // 이렇게 하면, 미션과 관련 없는 다른 아이템을 담았을 때
        // 이미 성공한 미션 결과가 false로 덮어씌워지는 것을 방지할 수 있습니다.
        if (isSuccess) {
        setMissionResult(isSuccess);
        }

        // 1. 선택된 옵션들을 바탕으로 상세 정보 배열을 생성합니다.
        // 이 로직은 미션 성공 여부와 관계없이, 장바구니에 정확한 정보를 담기 위해 필요합니다.
        const optionDetails: OptionDetail[] = [];
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
        
        // 2. 장바구니에 추가할 새로운 아이템 객체를 생성합니다.
        const newItem: CartItem = {
            name: `${menuName} (${option === 'hot' ? 'H' : 'I'})`,
            quantity: 1,
            basePrice: basePrice,
            optionDetails: optionDetails,
        };

        // 3. 생성된 아이템을 전역 장바구니(CART_STORAGE)에 추가합니다.
        CART_STORAGE.push(newItem);
        // 4. 장바구니에 변경사항이 있음을 다른 컴포넌트에 알립니다.
        notifyCartUpdate();

        Alert.alert("주문 완료", `${newItem.name}이(가) 장바구니에 담겼습니다.`);

        // 5. 옵션 선택 화면을 닫고 이전 화면(메뉴판)으로 돌아갑니다.
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