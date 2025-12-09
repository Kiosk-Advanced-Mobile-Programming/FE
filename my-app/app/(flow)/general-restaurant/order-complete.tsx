// app/(flow)/general-restaurant/order-complete.tsx
import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useCart } from './cart-context';
import { useStudySession } from './study-session-context';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderComplete'>;

export default function OrderComplete({ navigation }: Props) {
  const { clear } = useCart();
  const { finish, registerTouch, reset } = useStudySession();

  useEffect(() => {
    clear();
    // 학습 세션 성공 종료
    finish('SUCCESS').catch(console.error);

    // 화면 빠져나갈 때 세션 리셋 (필요 없으면 지워도 됨)
    return () => {
      reset();
    };
  }, [clear, finish, reset]);

  const handleGoHome = () => {
    registerTouch(true);
    navigation.replace('StartGeneralRestaurant');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>주문이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          픽업 대기 번호를 확인하시고{'\n'}준비되면 음식을 받아가세요.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.infoText}>이 화면을 직원에게 보여주세요.</Text>

        <Pressable style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>처음으로</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc72c', // 맥도날드/키오스크 느낌 노랑
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  check: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '800',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 4,
    backgroundColor: '#da291c',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
