// cart.tsx
import React from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function Cart({ navigation }: Props) {
  const { items, changeQuantity, removeItem, totalPrice } = useCart();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      {items.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>담긴 메뉴가 없습니다.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {item.name}
                  </Text>
                  <Text>{item.price.toLocaleString()}원</Text>
                </View>
                <TextInput
                  style={{
                    width: 40,
                    height: 32,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    textAlign: 'center',
                    marginRight: 8,
                  }}
                  keyboardType="number-pad"
                  value={String(item.quantity)}
                  onChangeText={(text) =>
                    changeQuantity(item.id, Math.max(0, Number(text) || 0))
                  }
                />
                <Pressable onPress={() => removeItem(item.id)}>
                  <Text style={{ color: '#da291c' }}>삭제</Text>
                </Pressable>
              </View>
            )}
          />

          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#ddd',
              paddingTop: 12,
              marginTop: 12,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 12 }}>
              합계: {totalPrice.toLocaleString()}원
            </Text>
            <Pressable
              style={{
                backgroundColor: '#da291c',
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Payment')}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                결제하기
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
