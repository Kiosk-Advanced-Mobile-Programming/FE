// payment.tsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

type Method = 'card' | 'cash' | 'kakao';

export default function Payment({ navigation }: Props) {
  const [method, setMethod] = useState<Method>('card');
  const { totalPrice } = useCart();

  const renderButton = (id: Method, label: string) => {
    const active = method === id;
    return (
      <Pressable
        onPress={() => setMethod(id)}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: active ? '#da291c' : '#ccc',
          backgroundColor: active ? '#ffe4e0' : '#fff',
          marginBottom: 8,
        }}
      >
        <Text>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        결제 수단을 선택해주세요.
      </Text>
      {renderButton('card', '신용/체크카드')}
      {renderButton('cash', '현금')}
      {renderButton('kakao', '카카오페이')}

      <View style={{ flex: 1 }} />

      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        결제 금액: {totalPrice.toLocaleString()}원
      </Text>
      <Pressable
        style={{
          backgroundColor: '#da291c',
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('OrderComplete')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          결제 진행
        </Text>
      </Pressable>
    </View>
  );
}
