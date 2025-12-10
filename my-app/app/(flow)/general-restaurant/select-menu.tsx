// app/(flow)/general-restaurant/select-menu.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
  Image, // ★ 추가
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import styles from './select-menu.style';
import { CATEGORIES, MENU_ITEMS, MenuItem, CategoryId } from './menu.data';
import { useCart } from './cart-context';
import { useStudySession } from './study-session-context';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectMenu'>;

export default function SelectMenu({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>('kimbap');
  const { addItem, items, totalPrice } = useCart();
  const { registerTouch } = useStudySession();

  const filtered = MENU_ITEMS.filter((i) => i.categoryId === selectedCategory);

  const renderItem = ({ item }: ListRenderItemInfo<MenuItem>) => (
    <Pressable
      style={styles.menuCard}
      onPress={() => {
        registerTouch(true);
        navigation.navigate('OrderDetail', { itemId: item.id });
      }}
    >
      {/* ★ 썸네일 이미지 */}
      <Image source={item.image} style={styles.menuImage} resizeMode="cover" />

      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
        {item.spicy && <Text style={styles.spicy}>매운맛 🔥</Text>}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => {
          registerTouch(true);
          addItem(item);
        }}
      >
        <Text style={styles.addButtonText}>담기</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((c) => {
          const active = c.id === selectedCategory;
          return (
            <Pressable
              key={c.id}
              onPress={() => {
                registerTouch(true);
                setSelectedCategory(c.id);
              }}
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

      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />

      <View style={styles.footer}>
        <Text>
          담은 메뉴 {items.length}개 · {totalPrice.toLocaleString()}원
        </Text>
        <Pressable
          style={styles.cartButton}
          onPress={() => {
            registerTouch(true);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.cartButtonText}>장바구니 보기</Text>
        </Pressable>
      </View>
    </View>
  );
}
