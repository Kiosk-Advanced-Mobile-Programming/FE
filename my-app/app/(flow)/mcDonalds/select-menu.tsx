import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styles from './select-menu.style';

// 아까 만든 재사용 컴포넌트 Import
import MenuItem from '@/components/mcDonalds/MenuItem'; 

import { CATEGORIES, MENU_ITEMS } from './menu.data';

export default function SelectMenuScreen() {
  const [activeCategoryId, setActiveCategoryId] = useState('recommend');

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
              // ✨ 재사용 컴포넌트 사용! ✨
              <MenuItem
                key={item.id}
                name={item.name}
                price={item.price}
                imageSource={item.image} 
                onPress={() => Alert.alert('담기', `${item.name}을 장바구니에 담았습니다.`)}
              />
            ))}
          </ScrollView>

          {/* === 3. 하단 장바구니 요약바 (Footer) === */}
          {/* 나중에 구현할 부분입니다 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>주문 내역 / 결제하기</Text>
          </View>

        </View>

      </View>
    </>
  );
}