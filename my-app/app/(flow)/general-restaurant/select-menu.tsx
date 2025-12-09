// select-menu.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import styles from './select-menu.style';
import { CATEGORIES, MENU_ITEMS, MenuItem, CategoryId } from './menu.data';
import { useCart } from './cart-context';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectMenu'>;

export default function SelectMenu({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>('kimbap');
  const { addItem, items, totalPrice } = useCart();

  const filtered = MENU_ITEMS.filter((i) => i.categoryId === selectedCategory);

  const renderItem = ({ item }: ListRenderItemInfo<MenuItem>) => (
    <Pressable
      style={styles.menuCard}
      onPress={() => navigation.navigate('OrderDetail', { itemId: item.id })}
    >
      {/* 메뉴 이미지 */}
      <Image source={item.image} style={styles.menuImage} />

      {/* 메뉴 텍스트 정보 */}
      <View>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
        {item.spicy && <Text style={styles.spicy}>매운맛 🔥</Text>}
      </View>

      {/* 담기 버튼 (상세로 안 넘어가게 이벤트 전파 막기) */}
      <Pressable
        style={styles.addButton}
        onPress={(e) => {
          e.stopPropagation();
          addItem(item);
        }}
      >
        <Text style={styles.addButtonText}>담기</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* 카테고리 탭 */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => {
          const active = c.id === selectedCategory;
          return (
            <Pressable
              key={c.id}
              onPress={() => setSelectedCategory(c.id)}
              style={[
                styles.categoryButton,
                active && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  active && styles.categoryTextActive,
                ]}
              >
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 메뉴 그리드 */}
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />

      {/* 하단 장바구니 요약 영역 */}
      <View style={styles.footer}>
        <Text>
          담은 메뉴 {items.length}개 · {totalPrice.toLocaleString()}원
        </Text>
        <Pressable
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>장바구니 보기</Text>
        </Pressable>
      </View>
    </View>
  );
}
