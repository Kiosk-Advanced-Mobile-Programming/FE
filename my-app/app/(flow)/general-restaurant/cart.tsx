// app/(flow)/general-restaurant/cart.tsx
import React from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';
import { useStudySession } from './study-session-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function Cart({ navigation }: Props) {
  const { items, changeQuantity, removeItem, totalPrice } = useCart();
  const { registerTouch } = useStudySession();

  if (items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Text>장바구니가 비어 있습니다.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: '#555' }}>
                {item.price.toLocaleString()}원
              </Text>
            </View>
            <TextInput
              style={{
                width: 50,
                height: 32,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                textAlign: 'center',
                marginRight: 8,
              }}
              keyboardType="number-pad"
              value={String(item.quantity)}
              onChangeText={(text) => {
                const q = Number(text) || 0;
                changeQuantity(item.id, q);
              }}
            />
            <Pressable
              onPress={() => {
                registerTouch(false); // 삭제는 실패/오류 측정용으로 false로 넣어봄
                removeItem(item.id);
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                backgroundColor: '#eee',
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text>삭제</Text>
            </Pressable>
          </View>
        )}
      />

      <View
        style={{
          paddingTop: 12,
          borderTopWidth: 1,
          borderColor: '#ddd',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>
          합계: {totalPrice.toLocaleString()}원
        </Text>
        <Pressable
          style={{
            backgroundColor: '#da291c',
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderRadius: 999,
          }}
          onPress={() => {
            registerTouch(true);
            navigation.navigate('Payment');
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            결제하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
