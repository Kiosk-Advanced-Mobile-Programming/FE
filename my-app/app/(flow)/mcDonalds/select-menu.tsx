// app/(flow)/order-menu.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { Stack } from 'expo-router';
import styles from './select-menu.style';
import { CATEGORIES, MENU_ITEMS } from './menu.data'; // 데이터 import

export default function OrderMenuScreen() {
  // 1. 현재 선택된 카테고리 상태 (기본값: 'recommend')
  const [activeCategoryId, setActiveCategoryId] = useState('recommend');

  // 2. 현재 카테고리에 맞는 메뉴만 필터링
  const displayedItems = MENU_ITEMS.filter(
    (item) => item.category === activeCategoryId
  );

  // 3. 현재 카테고리 이름 찾기 (헤더 표시용)
  const currentCategoryName = CATEGORIES.find(c => c.id === activeCategoryId)?.name;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* 전체 컨테이너 (가로 배치) */}
      <View style={styles.container}>
        
        {/* === [좌측] 사이드바 (카테고리 목록) === */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => setActiveCategoryId(category.id)}
                // 선택된 상태면 스타일을 다르게 적용 (배경색 변경 등)
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
          </ScrollView>
        </View>

        {/* === [우측] 메인 콘텐츠 (메뉴 그리드) === */}
        <View style={styles.contentArea}>
          
          {/* 우측 상단 헤더 (맥도날드 로고 + 카테고리명) */}
          <View style={styles.contentHeader}>
            {/* 로고 이미지가 있다면 <Image ... /> 사용 */}
            <Text style={styles.logoText}>M</Text> 
            <Text style={styles.headerTitle}>{currentCategoryName}</Text>
          </View>

          {/* 메뉴 리스트 스크롤 */}
          <ScrollView contentContainerStyle={styles.menuGrid}>
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <Pressable key={item.id} style={styles.menuCard}>
                  {/* 신제품 뱃지 */}
                  {item.isNew && (
                    <View style={styles.badge}><Text style={styles.badgeText}>신제품</Text></View>
                  )}
                  
                  {/* 이미지 영역 (임시 회색 박스) */}
                  <View style={styles.imagePlaceholder} />
                  
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>₩{item.price.toLocaleString()}</Text>
                  <Text style={styles.menuKcal}>{item.kcal} Kcal</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.emptyText}>해당 카테고리에 메뉴가 없습니다.</Text>
            )}
          </ScrollView>
        </View>

      </View>
    </>
  );
}