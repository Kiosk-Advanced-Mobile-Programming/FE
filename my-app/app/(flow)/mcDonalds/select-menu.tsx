import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styles from './select-menu.style';
import MenuItem from '@/components/mcDonalds/MenuItem'; 
import { CATEGORIES, MENU_ITEMS } from './menu.data';
import { useCart } from './cart-context';

export default function SelectMenuScreen() {
  const [activeCategoryId, setActiveCategoryId] = useState('recommend');
  const { items, getTotalPrice } = useCart(); // 장바구니 정보 가져오기

  // 선택된 카테고리의 메뉴만 필터링
  const displayedItems = MENU_ITEMS.filter(item => item.category === activeCategoryId);
  const currentCategoryName = CATEGORIES.find(c => c.id === activeCategoryId)?.name;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View style={styles.container}>
        
        {/* === 1. 좌측 사이드바 (카테고리) === */}
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
            
            {/* 홈으로 가기 버튼 (맨 아래나 위에 배치) */}
            <Pressable style={styles.homeButton} onPress={() => router.back()}>
              <Text>🏠 홈</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* === 2. 우측 메인 콘텐츠 (메뉴 그리드) === */}
        <View style={styles.contentArea}>
          
          {/* 헤더 */}
          <View style={styles.contentHeader}>
            <Text style={styles.headerTitle}>{currentCategoryName}</Text>
          </View>

          {/* 메뉴 리스트 */}
          <ScrollView contentContainerStyle={styles.menuGrid}>
            {displayedItems.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                price={item.price}
                imageSource={item.image} 
                
                // ✨ [핵심] 클릭 시 상세 페이지로 이동하며 ID 전달
                onPress={() => {
                  router.push({
                    pathname: '/(flow)/mcDonalds/order-detail', // 이동할 파일 경로 (폴더명 주의!)
                    params: { id: item.id } // 넘겨줄 데이터: 선택한 메뉴의 ID
                  });
                }}
              />
            ))}
          </ScrollView>

          {/* === 3. 하단 장바구니 요약바 (Footer) === */}
          {items.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.cartInfo}>
                <Text style={styles.countBadge}>{items.length}</Text>
                <Text style={styles.totalPrice}>₩ {getTotalPrice().toLocaleString()}</Text>
              </View>
              <Pressable 
                style={styles.payButton} 
                onPress={() => router.push('/(flow)/mcDonalds/cart')}
              >
                <Text style={styles.payButtonText}>주문내역 확인</Text>
              </Pressable>
            </View>
          )}
        </View>

      </View>
    </>
  );
}