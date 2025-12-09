// app/(flow)/mcDonalds/order-detail.tsx
import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert, Modal } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styles from './order-detail.style';
import { MENU_ITEMS, SET_TYPES, SIDE_OPTIONS, DRINK_OPTIONS } from './menu.data';
import { useCart } from './cart-context';

export default function OrderDetailScreen() {
  const { id, isSetMenu } = useLocalSearchParams();
  const targetMenu = MENU_ITEMS.find((m) => m.id === Number(id));
  const { addToCart } = useCart();

  // ✨ [수정 1] 세트 메뉴 흐름인지 판단 (문자열 "true" 체크)
  const isSetFlow = isSetMenu === 'true';

  // ✨ [수정 2] 상태 초기값 설정
  // 세트 흐름이면 1단계(세트선택) 시작, 아니면 4단계(확인) 바로 시작
  const [step, setStep] = useState(isSetFlow ? 1 : 4); 

  // 세트 기본 선택 등
  const [selectedSetType, setSelectedSetType] = useState(() => {
    // 1) 세트 흐름이 아예 아닌 경우 (디저트 등) -> 무조건 단품
    if (!isSetFlow) {
        return SET_TYPES.find(t => t.id === 'single') || SET_TYPES[0];
    }

    // 2) 카테고리가 '맥런치(mclunch)'인 경우 -> '세트(normal)' 기본 선택
    if (targetMenu?.category === 'mclunch') {
        return SET_TYPES.find(t => t.id === 'normal') || SET_TYPES[1];
    }

    // 3) 그 외 버거(일반 버거, 추천 메뉴 등) -> '단품(single)' 기본 선택
    return SET_TYPES.find(t => t.id === 'single') || SET_TYPES[0];
  });

  const [selectedSide, setSelectedSide] = useState(SIDE_OPTIONS[0]);
  const [selectedDrink, setSelectedDrink] = useState(DRINK_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!targetMenu) return <View><Text>메뉴를 찾을 수 없습니다.</Text></View>;

  // === 가격 계산 함수 ===
  const calculatePrice = () => {
    let price = targetMenu.price + (selectedSetType.priceAdd ?? 0);
    
    if (selectedSetType.id !== 'single') {
      let sidePrice = selectedSide.price;
      if (selectedSetType.id === 'large' && selectedSide.id === 'fries_large') {
        sidePrice = 0;
      }
      price += sidePrice + selectedDrink.price;
    }
    return price;
  };

  const currentPrice = calculatePrice() * quantity;

  // === 이미지 선택 로직 ===
  const getCurrentBurgerImage = (setTypeId: string) => {
    if (setTypeId !== 'single' && targetMenu.setImage) {
      return targetMenu.setImage;
    }
    return targetMenu.image;
  };

  // === 세트 종류 선택 시 ===
  const handleSetSelect = (setType: typeof SET_TYPES[0]) => {
    setSelectedSetType(setType);

    if (setType.id === 'large') {
      const largeFries = SIDE_OPTIONS.find(s => s.id === 'fries_large');
      if (largeFries) setSelectedSide(largeFries);
    } else if (setType.id === 'normal') {
      const mediumFries = SIDE_OPTIONS.find(s => s.id === 'fries');
      if (mediumFries) setSelectedSide(mediumFries);
    }

    if (setType.id === 'single') {
      setStep(4);
    } else {
      setStep(2);
    }
  };

  // === 뒤로 가기 ===
  const goBack = () => {
    // ✨ [수정 3] 단품 흐름이면 바로 뒤로가기
    if (!isSetFlow) {
      router.back();
      return;
    }

    if (step === 1) router.back();
    else if (step === 4 && selectedSetType.id === 'single') setStep(1);
    else setStep((prev) => prev - 1);
  };

  // === 장바구니 담기 ===
  const handleAddToCart = () => {
    addToCart({
      menu: targetMenu,
      setType: selectedSetType,
      side: selectedSide,
      drink: selectedDrink,
      quantity: quantity,
      totalPrice: currentPrice,
    });

    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.back(); 
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      {/* ✨ [수정 4] 좌측 사이드바: isSetFlow가 true일 때만 렌더링 */}
      {isSetFlow && (
        <View style={styles.sidebar}>
          {['세트 선택', '사이드', '음료', '주문 확인'].map((label, index) => {
            const stepNum = index + 1;
            const isActive = step === stepNum;
            const isSkipped = selectedSetType.id === 'single' && (stepNum === 2 || stepNum === 3);
            
            return (
              <View key={stepNum} style={[styles.sidebarItem, isSkipped && { opacity: 0.3 }]}>
                <View style={[styles.stepCircle, isActive && styles.stepCircleActive]}>
                  {step > stepNum && !isSkipped && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.stepText, isActive && styles.stepTextActive]}>{label}</Text>
                {index < 3 && <View style={styles.line} />}
              </View>
            );
          })}
        </View>
      )}

      {/* === 우측 콘텐츠 === */}
      <View style={styles.content}>
        
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.menuTitle}>
            {targetMenu.name}
            {/* 단품 흐름이거나 단품 선택 시 라벨 숨기기 */}
            {selectedSetType.id !== 'single' ? ` - ${selectedSetType.label}` : ''}
          </Text>
          <Text style={styles.menuPriceInfo}>
            ₩{currentPrice.toLocaleString()}
          </Text>
        </View>

        {/* STEP 1: 세트/단품 선택 (세트 흐름일 때만 표시) */}
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
              {SIDE_OPTIONS.map((side) => {
                if (selectedSetType.id === 'large' && side.id === 'fries') return null;
                let displayPrice = side.price;
                if (selectedSetType.id === 'large' && side.id === 'fries_large') displayPrice = 0;

                return (
                  <Pressable
                    key={side.id}
                    style={[styles.card, selectedSide.id === side.id && styles.cardSelected]}
                    onPress={() => { setSelectedSide(side); setStep(3); }}
                  >
                    <Image source={side.image} style={styles.cardImage} />
                    <Text style={styles.cardName}>{side.name}</Text>
                    {displayPrice > 0 && <Text style={styles.optionPrice}>+{displayPrice}원</Text>}
                  </Pressable>
                );
              })}
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
                  onPress={() => { setSelectedDrink(drink); setStep(4); }}
                >
                  <Image source={drink.image} style={styles.cardImage} />
                  <Text style={styles.cardName}>{drink.name}</Text>
                  {drink.price > 0 && <Text style={styles.optionPrice}>+{drink.price}원</Text>}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* STEP 4: 최종 확인 (모든 흐름에서 사용) */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <View style={styles.finalView}>
              <Image 
                  source={getCurrentBurgerImage(selectedSetType.id)} 
                  style={{ width: 220, height: 220, resizeMode: 'contain', marginBottom: 20 }} 
              />
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>{targetMenu.name}</Text>
                {/* 단품이 아닐 때만 사이드/음료 표시 */}
                {selectedSetType.id !== 'single' && (
                  <>
                    <Text style={styles.summaryText}>+ {selectedSide.name}</Text>
                    <Text style={styles.summaryText}>+ {selectedDrink.name}</Text>
                  </>
                )}
              </View>
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

        {/* 하단 버튼 */}
        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={goBack}>
            <Text style={styles.cancelButtonText}>
              {/* 단품 흐름일 때는 무조건 '취소' 표시 */}
              {!isSetFlow || step === 1 || (step === 4 && selectedSetType.id === 'single') ? '취소' : '이전단계'}
            </Text>
          </Pressable>
          {step === 4 && (
            <Pressable style={styles.confirmButton} onPress={handleAddToCart}>
              <Text style={styles.confirmButtonText}>장바구니에 담기</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* 주문 완료 모달 */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successModalContainer}>
          <View style={styles.successCard}>
            <Text style={{ fontSize: 60, marginBottom: 10 }}>🛍️</Text> 
            <View style={styles.successCheckCircle}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight:'bold' }}>✓</Text>
            </View>
            
            <Text style={styles.successTitle}>
              주문 내역에 메뉴가 추가{'\n'}되었습니다
            </Text>
            
            <Text style={styles.successPrice}>
              ₩{currentPrice.toLocaleString()}
            </Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}