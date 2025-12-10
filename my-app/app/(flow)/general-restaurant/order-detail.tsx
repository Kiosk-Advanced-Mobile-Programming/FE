// app/(flow)/general-restaurant/order-detail.tsx
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { MENU_ITEMS } from './menu.data';
import { useCart } from './cart-context';
import { useStudySession } from './study-session-context';
import styles from './order-detail.style';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export default function OrderDetail({ route, navigation }: Props) {
  const { itemId } = route.params;
  const item = MENU_ITEMS.find((m) => m.id === itemId);
  const { addItem } = useCart();
  const { registerTouch } = useStudySession();

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>존재하지 않는 메뉴입니다.</Text>
      </View>
    );
  }

  const handleAdd = () => {
    registerTouch(true);
    addItem(item);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {/* 이미지가 있다면 */}
      {'image' in item && item.image && (
        <Image source={item.image} style={styles.image} />
      )}

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
      <Text style={styles.desc}>
        키오스크 연습용 설명 텍스트입니다. 실제 매장에서는 토핑, 양 조절 등을
        선택할 수 있습니다.
      </Text>

      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>장바구니에 담기</Text>
      </Pressable>
    </View>
  );
}
