// app/(flow)/mcDonalds/payment.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Modal } from 'react-native';
import { router, Stack } from 'expo-router';
import { Colors } from '@/components/mcDonalds/colors';

export default function PaymentScreen() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // 3초 후 주문 완료 화면으로 이동 (카드 결제 시뮬레이션)
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/(flow)/mcDonalds/order-complete');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '결제' }} />
      
      <Text style={styles.title}>결제 방법을 선택해 주세요</Text>

      <View style={styles.optionsContainer}>
        {/* 카카오페이 */}
        <Pressable style={styles.optionCard}>
          <View style={styles.iconBox}><Text style={{fontWeight:'bold', fontSize: 20}}>pay</Text></View>
          <Text style={styles.optionText}>카카오페이</Text>
        </Pressable>

        {/* 모바일 상품권 */}
        <Pressable style={styles.optionCard}>
          <View style={[styles.iconBox, {backgroundColor: '#eee'}]}>
             <Text>📱</Text>
          </View>
          <Text style={styles.optionText}>모바일 상품권</Text>
        </Pressable>

        {/* 신용카드 (이것만 동작) */}
        <Pressable style={styles.optionCard} onPress={handlePayment}>
          <View style={[styles.iconBox, {backgroundColor: '#FFBC0D'}]}>
             <Text style={{fontSize: 30}}>💳</Text>
          </View>
          <Text style={styles.optionText}>신용카드 결제</Text>
        </Pressable>
      </View>

      {/* 카드 투입 모달 (Processing) - 스크린샷 042408 참고 */}
      <Modal visible={isProcessing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>IC신용/체크카드 사용시</Text>
            <Text style={styles.modalDesc}>카드를 화살표 방향으로 투입구에 넣어주세요</Text>
            {/* 실제로는 여기에 카드 투입구 이미지를 넣습니다 */}
            <View style={styles.cardSlotPlaceholder}>
               <Text style={{fontSize: 50}}>⬇️ 💳</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 50 },
  optionsContainer: { flexDirection: 'row', gap: 20 },
  optionCard: { 
    width: 200, height: 250, borderWidth: 1, borderColor: '#ddd', 
    alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 8 
  },
  iconBox: { 
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#FAE100', 
    alignItems: 'center', justifyContent: 'center', marginBottom: 20 
  },
  optionText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { 
    width: '80%', height: '60%', backgroundColor: 'white', 
    alignItems: 'center', justifyContent: 'center', borderRadius: 16 
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#D52B1E', marginBottom: 10 },
  modalDesc: { fontSize: 18, marginBottom: 30 },
  cardSlotPlaceholder: { 
    width: 200, height: 200, backgroundColor: '#f0f0f0', 
    alignItems: 'center', justifyContent: 'center', borderRadius: 8 
  }
});