// components/mcDonalds/SelectMenuHome.tsx
import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native'; // StyleSheet 추가
import { router } from 'expo-router';
import MenuItem from './MenuItem'; 
import { MENU_ITEMS } from '../../app/(flow)/mcDonalds/menu.data'; 
import styles from '../../app/(flow)/mcDonalds/select-menu.style'; 

type SelectMenuHomeProps = {
  onCategorySelect: (categoryId: string) => void;
};

// 버거류인지 판단하는 간단한 함수 (카테고리 ID 확인)
const checkIsSetMenu = (category: string) => {
  return category === 'burger' || category === 'mclunch' || category === 'recommend'; 
  // todo 'recommend' 안에서도 버거인 것만 거르는 로직 추가 가능
};

const SelectMenuHome = ({ onCategorySelect }: SelectMenuHomeProps) => {
  return (
    <ScrollView style={styles.homeContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.homeTitle}>메뉴 알아보기</Text>

      {/* 1. 상단 2x2 바로가기 그리드 */}
      <View style={styles.homeGrid}>
        <Pressable style={styles.homeCard} onPress={() => onCategorySelect('recommend')}>
          <View>
            <Text style={styles.homeCardTitle}>추천메뉴</Text>
            <Text style={styles.homeCardIcon}>⭐</Text>
          </View>
        </Pressable>

        <Pressable style={styles.homeCard} onPress={() => onCategorySelect('mclunch')}>
          <View>
            <Text style={styles.homeCardTitle}>맥런치</Text>
            <Text style={styles.homeCardIcon}>🍔</Text>
          </View>
        </Pressable>

        <Pressable style={styles.homeCard} onPress={() => onCategorySelect('happy_snack')}>
           <View>
            <Text style={styles.homeCardTitle}>이달의{'\n'}해피스낵</Text>
            <Text style={styles.homeCardIcon}>🍟</Text>
          </View>
        </Pressable>

        <Pressable style={styles.homeCard} onPress={() => onCategorySelect('mccafe')}>
           <View>
            <Text style={styles.homeCardTitle}>커피&디저트</Text>
            <Text style={styles.homeCardIcon}>☕</Text>
          </View>
        </Pressable>
      </View>

      {/* 2. 프로모션 배너 영역 */}
      <View style={styles.bannerArea}>
        <Pressable onPress={() => onCategorySelect('happy_snack')}>
          <Image
            source={require('@assets/images/mcDonalds/banner_long/long_happysnack.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </Pressable>
        <Pressable onPress={() => onCategorySelect('dessert')}>
            <Image
            source={require('@assets/images/mcDonalds/banner_long/long_strawberry.jpg')}
            style={styles.bannerImage}
            resizeMode="cover"
            />
        </Pressable>
      </View>

      {/* 3. 인기 메뉴 */}
      <Text style={styles.sectionTitle}>인기 메뉴</Text>
      

      <View style={localStyles.popularGrid}>
        {MENU_ITEMS.slice(0, 4).map((item) => {
          // ★ 여기서 버거 여부 판단
          const isSetMenu = checkIsSetMenu(item.category); 

          return (
            <MenuItem
              key={item.id}
              name={item.name}
              price={item.price}
              imageSource={item.image}
              onPress={() => router.push({
                pathname: '/(flow)/mcDonalds/order-detail',
                params: { 
                  id: item.id,
                  // ★ 핵심: 세트 메뉴 여부를 '문자열'로 전달 ("true" or "false")
                  isSetMenu: isSetMenu ? "true" : "false" 
                }
              })}
            />
          );
        })}
      </View>
      
      {/* 하단 여백 */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

// 이 파일 내부에서만 쓸 스타일을 추가로 정의 (기존 styles와 충돌 방지)
const localStyles = StyleSheet.create({
  popularGrid: {
    flexDirection: 'row',       // 가로 배치
    flexWrap: 'wrap',           // 공간 부족 시 줄바꿈
    justifyContent: 'space-between', // 양쪽 끝 정렬 (중간 여백 자동)
    paddingHorizontal: 5,       // 좌우 살짝 여백 (선택사항)
    marginBottom: 20,
  }
});

export default SelectMenuHome;