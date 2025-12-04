// order-complete.tsx
import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderComplete'>;

export default function OrderComplete({ navigation }: Props) {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffc72c',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 16 }}>
        주문이 완료되었습니다!
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
        픽업 대기 번호를 확인하시고 음식을 받아가세요.
      </Text>

      <Pressable
        style={{
          backgroundColor: '#da291c',
          paddingHorizontal: 40,
          paddingVertical: 14,
          borderRadius: 999,
        }}
        onPress={() => navigation.replace('StartGeneralRestaurant')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          처음 화면으로
        </Text>
      </Pressable>
    </View>
  );
}
