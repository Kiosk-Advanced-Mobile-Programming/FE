// app/(flow)/general-restaurant/payment.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';
import { useStudySession } from './study-session-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;
type Method = 'card' | 'cash' | 'kakao';

export default function Payment({ navigation }: Props) {
  const [method, setMethod] = useState<Method>('card');
  const { totalPrice } = useCart();
  const { registerTouch } = useStudySession();

  const renderMethodButton = (id: Method, label: string) => {
    const active = method === id;
    return (
      <Pressable
        key={id}
        onPress={() => {
          registerTouch(true);
          setMethod(id);
        }}
        style={[styles.methodButton, active && styles.methodButtonActive]}
      >
        <Text style={[styles.methodText, active && styles.methodTextActive]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const handlePay = () => {
    registerTouch(true);
    navigation.navigate('OrderComplete');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>결제 수단을 선택하세요</Text>

        <View style={styles.methodGroup}>
          {renderMethodButton('card', '신용/체크카드')}
          {renderMethodButton('cash', '현금 결제')}
          {renderMethodButton('kakao', '카카오페이')}
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>결제 금액</Text>
          <Text style={styles.summaryPrice}>
            {totalPrice.toLocaleString()}원
          </Text>
        </View>

        <Pressable style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>결제하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc72c',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  methodGroup: {
    marginBottom: 24,
  },
  methodButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  methodButtonActive: {
    borderColor: '#da291c',
    backgroundColor: '#ffe4e0',
  },
  methodText: {
    fontSize: 16,
    color: '#333',
  },
  methodTextActive: {
    fontWeight: '700',
    color: '#da291c',
  },
  summaryBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  payButton: {
    backgroundColor: '#da291c',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
