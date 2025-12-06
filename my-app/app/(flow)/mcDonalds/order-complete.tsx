// app/(flow)/mcDonalds/order-complete.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { useCart } from './cart-context';

export default function OrderCompleteScreen() {
  const { clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 1000) + 5000; // 랜덤 주문번호 5000번대

  useEffect(() => {
    // 1. 장바구니 비우기
    clearCart();

    // 2. 3초 뒤 홈으로 이동
    const timer = setTimeout(() => {
      router.replace('/(flow)/mcDonalds/start-mcDonalds');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.content}>
        <Text style={styles.label}>주문</Text>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <View style={styles.receiptLine} />
        
        <Text style={styles.desc}>
          주문 내역이 주방으로 전달되었습니다.{'\n'}
          잠시만 기다려주세요.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  content: { 
    width: '70%', height: '50%', backgroundColor: '#f9f9f9', 
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 
  },
  label: { fontSize: 30, fontWeight: 'bold', marginBottom: 10 },
  orderNumber: { fontSize: 80, fontWeight: '900', color: '#333' },
  receiptLine: { 
    width: '80%', height: 2, backgroundColor: '#ddd', marginVertical: 30, 
    borderStyle: 'dashed', borderRadius: 1 
  },
  desc: { fontSize: 20, textAlign: 'center', color: '#555', lineHeight: 30 }
});