// app/(flow)/mcDonalds/cart.tsx
import React from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { useCart } from './cart-context';
import { Colors } from '@/components/mcDonalds/colors';

export default function CartScreen() {
  const { items, getTotalPrice } = useCart();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '주문 내역' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>주문 내역을 확인해주세요</Text>
      </View>

      <ScrollView style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Image source={item.menu.image} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.menu.name} 
                {item.setType.id !== 'single' && ` - ${item.setType.label}`}
              </Text>
              {item.setType.id !== 'single' && (
                <Text style={styles.itemDetails}>
                  {item.side.name}, {item.drink.name}
                </Text>
              )}
              <View style={styles.priceRow}>
                <Text style={styles.quantity}>수량 {item.quantity}</Text>
                <Text style={styles.price}>₩ {item.totalPrice.toLocaleString()}</Text>
              </View>
            </View>
            <Pressable style={styles.deleteButton} onPress={() => {/* 삭제 로직 (생략) */}}>
              <Text style={styles.deleteText}>취소</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>총 주문 합계</Text>
          <Text style={styles.totalValue}>₩ {getTotalPrice().toLocaleString()}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.addMoreButton} onPress={() => router.back()}>
            <Text style={styles.addMoreText}>추가 주문</Text>
          </Pressable>
          <Pressable 
            style={styles.orderButton} 
            onPress={() => router.push('/(flow)/mcDonalds/payment')}
          >
            <Text style={styles.orderText}>주문 완료</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  list: { flex: 1, padding: 15 },
  itemCard: {
    flexDirection: 'row', backgroundColor: 'white', padding: 15, marginBottom: 15,
    borderRadius: 8, alignItems: 'center'
  },
  itemImage: { width: 80, height: 80, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemDetails: { fontSize: 12, color: '#666', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  quantity: { fontSize: 14, color: '#333' },
  price: { fontSize: 16, fontWeight: 'bold' },
  deleteButton: { 
    position: 'absolute', top: 10, right: 10, 
    borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 
  },
  deleteText: { fontSize: 12, color: '#666' },
  footer: { backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 20 },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#D52B1E' },
  buttonRow: { flexDirection: 'row', gap: 15, height: 60 },
  addMoreButton: { 
    flex: 1, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 4 
  },
  addMoreText: { fontSize: 18, fontWeight: 'bold' },
  orderButton: { 
    flex: 2, backgroundColor: '#FFBC0D', justifyContent: 'center', alignItems: 'center', borderRadius: 4 
  },
  orderText: { fontSize: 20, fontWeight: 'bold' },
});