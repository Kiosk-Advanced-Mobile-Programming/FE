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
  const currentCategoryName = CATEGORIES.find(c => c.id === activeCategoryId)?.name;

  // 해피밀용
  const isMorningTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 시간을 소수점으로 변환 (예: 10시 30분 -> 10.5)
    const currentTime = hour + minute / 60;

    // 새벽 4시(4.0)부터 오전 10시 30분(10.5) 사이인지 체크
    return currentTime >= 4.0 && currentTime < 10.5;
  };

  // 현재 아침 시간인지 여부 (true/false)
  const isMorning = isMorningTime();

  // 필터링 로직
  const displayedItems = MENU_ITEMS.filter((item) => {
    // 1. 카테고리 일치 여부
    if (item.category !== activeCategoryId) return false;

    // 2. 시간 제한 확인 (validTime이 있는 경우만 체크)
    if (item.validTime) {
      // 아침 메뉴인데, 지금이 아침이 아니면 -> 숨김
      if (item.validTime === 'morning' && !isMorning) return false;
      
      // 일반 메뉴인데, 지금이 아침이면 -> 숨김
      if (item.validTime === 'regular' && isMorning) return false;
    }

    return true;
  });

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
                
                //  클릭 시 상세 페이지로 이동하며 ID 전달
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
            <View style={styles.footer}>
              <View style={styles.cartInfo}>
                <Text style={styles.countBadge}>{items.length}</Text>
                <Text style={styles.totalPrice}>₩ {getTotalPrice().toLocaleString()}</Text>
              </View>

              <Pressable 
                // 1. items가 0개면 disabled 스타일 적용
                style={[
                  styles.payButton, 
                  items.length === 0 && styles.payButtonDisabled
                ]} 
                // 2. items가 0개면 클릭 기능 비활성화
                disabled={items.length === 0}
                onPress={() => router.push('/(flow)/mcDonalds/cart')}
              >
                <Text style={styles.payButtonText}>주문내역 확인</Text>
              </Pressable>
            </View>
        </View>

      </View>
    </>
  );
}