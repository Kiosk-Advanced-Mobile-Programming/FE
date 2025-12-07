// app/(flow)/mcDonalds/select-menu.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useStudy } from '../context/study-context';
import styles from './select-menu.style';
import { Colors } from '@/components/mcDonalds/colors';
import { useCart } from './cart-context';
import { CATEGORIES, MENU_ITEMS } from './menu.data';

// 분리한 컴포넌트 import
import SelectMenuHome from '@/components/mcDonalds/SelectMenuHome'; 
import MenuItem from '@/components/mcDonalds/MenuItem';

export default function SelectMenuScreen() {
  const { startSession, recordTouch } = useStudy();
  const [activeCategoryId, setActiveCategoryId] = useState('home');
  const { items, getTotalPrice } = useCart();

  // 현재 카테고리 데이터 필터링
  const displayedItems = MENU_ITEMS.filter(item => item.category === activeCategoryId);
  const currentCategoryName = CATEGORIES.find(c => c.id === activeCategoryId)?.name;

  // 버거류인지 판단하는 간단한 함수 (카테고리 ID 확인)
  const checkIsSetMenu = (category: string) => {
    return category === 'burger' || category === 'mclunch' || category === 'recommend'; 
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      {/* 좌측 사이드바 (카테고리 탭) */}
      <View style={styles.sidebar}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setActiveCategoryId(category.id)}
              style={[
                styles.categoryItem,
                activeCategoryId === category.id && styles.categoryItemActive
              ]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                activeCategoryId === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </Pressable>
          ))}
          <Pressable style={styles.homeButton} onPress={() => router.dismissAll()}>
             <Text>🏠 처음으로</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* 우측 메인 콘텐츠 */} 
      <View style={styles.contentArea}>
        
        {/* activeCategoryId에 따라 컴포넌트 교체 */}
        {activeCategoryId === 'home' ? (
          // 분리한 홈 화면 컴포넌트 사용
          <SelectMenuHome onCategorySelect={setActiveCategoryId} />
        ) : (
          // 일반 메뉴 리스트
          <>
            <View style={styles.contentHeader}>
              <Text style={styles.headerTitle}>{currentCategoryName}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.menuGrid}>
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    imageSource={item.image} 
                    onPress={() => {
                      // 클릭 시, 해당 메뉴가 세트 선택이 필요한지 확인
                      const isSet = checkIsSetMenu(item.category);

                      router.push({
                        pathname: '/(flow)/mcDonalds/order-detail',
                        params: { 
                          id: item.id,
                          // "true" 또는 "false" 문자열로 전달
                          isSetMenu: isSet ? "true" : "false"
                        }
                      });
                    }}
                  />
                ))
              ) : (
                <View style={{ padding: 20 }}>
                  <Text style={{ color: '#999' }}>이 카테고리에는 아직 메뉴가 없어요.</Text>
                </View>
              )}
            </ScrollView>
          </>
        )}

        {/* 하단 장바구니 바 */}
        <View style={styles.footer}>
            <View style={styles.cartInfo}>
              <Text style={styles.countBadge}>{items.length}</Text>
              <Text style={styles.totalPrice}>₩ {getTotalPrice().toLocaleString()}</Text>
            </View>
            
            <Pressable 
              style={[styles.payButton, items.length === 0 && styles.payButtonDisabled]} 
              disabled={items.length === 0}
              onPress={() => router.push('/(flow)/mcDonalds/cart')}
            >
              <Text style={styles.payButtonText}>주문내역 확인</Text>
            </Pressable>
        </View>

      </View>
    </View>
  );
}