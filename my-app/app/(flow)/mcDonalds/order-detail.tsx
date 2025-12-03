// app/(flow)/mcDonalds/order-detail.tsx
import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styles from './order-detail.style';
import { MENU_ITEMS, SET_TYPES, SIDE_OPTIONS, DRINK_OPTIONS } from './menu.data';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const targetMenu = MENU_ITEMS.find((m) => m.id === Number(id));

  // 상태 관리: 단계(1~4), 선택한 옵션들
  const [step, setStep] = useState(1);
  const [selectedSetType, setSelectedSetType] = useState(SET_TYPES[0]); // 기본: 세트
  const [selectedSide, setSelectedSide] = useState(SIDE_OPTIONS[0]);
  const [selectedDrink, setSelectedDrink] = useState(DRINK_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);

  if (!targetMenu) return <View><Text>메뉴를 찾을 수 없습니다.</Text></View>;

  // === 가격 계산 ===
  const calculatePrice = () => {
    // (selectedSetType.priceAdd ?? 0) -> priceAdd가 없으면 0을 더함
    let price = targetMenu.price + (selectedSetType.priceAdd ?? 0); 
    
    if (selectedSetType.id !== 'single') {
      price += selectedSide.price + selectedDrink.price;
    }
    return price;
  };

  // === 현재 세트 상태에 맞는 이미지 가져오기 ===
  const getCurrentBurgerImage = (setTypeId: string) => {
    if (setTypeId === 'normal' && targetMenu.setImages?.normal) return targetMenu.setImages.normal;
    if (setTypeId === 'large' && targetMenu.setImages?.large) return targetMenu.setImages.large;
    return targetMenu.image; // 기본(단품)
  };

  // === 세트 선택 시 로직 ===
  const handleSetSelect = (setType: typeof SET_TYPES[0]) => {
    setSelectedSetType(setType);
    if (setType.id === 'single') {
      setStep(4); // 단품 -> 바로 확인 화면(Step 4)으로 점프 🚀
    } else {
      setStep(2); // 세트 -> 사이드 선택(Step 2)으로 이동
    }
  };

  const goBack = () => {
    if (step === 1) router.back();
    else if (step === 4 && selectedSetType.id === 'single') setStep(1); // 단품 확인화면에서 뒤로가면 1단계로
    else setStep(prev => prev - 1);
  };

  const handleAddToCart = () => {
    Alert.alert("주문 완료", "주문 내역에 메뉴가 추가되었습니다", [{ text: "확인", onPress: () => router.back() }]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      {/* === [좌측] 사이드바 (단계 표시) === */}
      <View style={styles.sidebar}>
        {['세트 선택', '사이드', '음료', '주문 확인'].map((label, index) => {
          const stepNum = index + 1;
          const isActive = step === stepNum;
          // 단품 선택 시 2, 3단계는 흐리게 처리
          const isSkipped = selectedSetType.id === 'single' && (stepNum === 2 || stepNum === 3);
          
          return (
            <View key={stepNum} style={[styles.sidebarItem, isSkipped && { opacity: 0.3 }]}>
              <View style={[styles.stepCircle, isActive && styles.stepCircleActive]}>
                {step > stepNum && <Text style={{color:'white', fontSize: 10, fontWeight:'bold'}}>✓</Text>}
              </View>
              <Text style={[styles.stepText, isActive && styles.stepTextActive]}>{label}</Text>
              {index < 3 && <View style={styles.line} />}
            </View>
          );
        })}
      </View>

      {/* === [우측] 메인 콘텐츠 === */}
      <View style={styles.content}>
        
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.menuTitle}>
            {targetMenu.name} {selectedSetType.id !== 'single' ? `- ${selectedSetType.label}` : ''}
          </Text>
          <Text style={styles.menuPriceInfo}>
             ₩{calculatePrice().toLocaleString()} / {targetMenu.kcal} Kcal
          </Text>
        </View>

        {/* STEP 1: 세트 선택 */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.guideText}>세트로 주문하시겠습니까?</Text>
            <ScrollView contentContainerStyle={styles.grid}>
              {SET_TYPES.map((type) => (
                <Pressable
                  key={type.id}
                  style={[styles.card, selectedSetType.id === type.id && styles.cardSelected]}
                  onPress={() => handleSetSelect(type)}
                >
                  <Image source={getCurrentBurgerImage(type.id)} style={styles.cardImage} />
                  <Text style={styles.cardSubName}>{type.name}</Text>
                  <Text style={styles.cardPrice}>
                    ₩{(targetMenu.price + (type.priceAdd ?? 0)).toLocaleString()}
                  </Text>
                  <Text style={styles.cardKcal}>{targetMenu.kcal} Kcal</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* STEP 2: 사이드 선택 */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.guideText}>세트메뉴 사이드를 선택하세요</Text>
            <ScrollView contentContainerStyle={styles.grid}>
              {SIDE_OPTIONS.map((side) => (
                <Pressable
                  key={side.id}
                  style={[styles.card, selectedSide.id === side.id && styles.cardSelected]}
                  onPress={() => {
                    setSelectedSide(side);
                    setStep(3);
                  }}
                >
                  <Image source={side.image} style={styles.cardImage} />
                  <Text style={styles.cardName}>{side.name}</Text>
                  {side.price > 0 && <Text style={styles.optionPrice}>+{side.price}원</Text>}
                  <Text style={styles.cardKcal}>{side.kcal} Kcal</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* STEP 3: 음료 선택 */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.guideText}>세트메뉴 음료를 선택하세요</Text>
            <ScrollView contentContainerStyle={styles.grid}>
              {DRINK_OPTIONS.map((drink) => (
                <Pressable
                  key={drink.id}
                  style={[styles.card, selectedDrink.id === drink.id && styles.cardSelected]}
                  onPress={() => {
                    setSelectedDrink(drink);
                    setStep(4);
                  }}
                >
                  <Image source={drink.image} style={styles.cardImage} />
                  <Text style={styles.cardName}>{drink.name}</Text>
                  {drink.price > 0 && <Text style={styles.optionPrice}>+{drink.price}원</Text>}
                  <Text style={styles.cardKcal}>{drink.kcal} Kcal</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* STEP 4: 최종 확인 */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <View style={styles.finalView}>
               {/* 선택한 세트 타입에 맞는 이미지 */}
               <Image 
                  source={getCurrentBurgerImage(selectedSetType.id)} 
                  style={{ width: 220, height: 220, resizeMode: 'contain', marginBottom: 20 }} 
               />
               
               {/* 구성품 리스트 */}
               <View style={styles.summaryBox}>
                 <Text style={styles.summaryTitle}>{targetMenu.name}</Text>
                 {selectedSetType.id !== 'single' && (
                   <>
                     <Text style={styles.summaryText}>+ {selectedSide.name}</Text>
                     <Text style={styles.summaryText}>+ {selectedDrink.name}</Text>
                   </>
                 )}
               </View>

               {/* 수량 조절 */}
               <View style={styles.quantityContainer}>
                 <Pressable style={styles.qtyButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                   <Text style={styles.qtyText}>-</Text>
                 </Pressable>
                 <Text style={styles.qtyNumber}>{quantity}</Text>
                 <Pressable style={styles.qtyButton} onPress={() => setQuantity(quantity + 1)}>
                   <Text style={styles.qtyText}>+</Text>
                 </Pressable>
               </View>
            </View>
          </View>
        )}

        {/* 하단 푸터 */}
        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={goBack}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </Pressable>
          {step === 4 && (
            <Pressable style={styles.confirmButton} onPress={handleAddToCart}>
              <Text style={styles.confirmButtonText}>장바구니에 담기</Text>
            </Pressable>
          )}
        </View>

      </View>
    </View>
  );
}