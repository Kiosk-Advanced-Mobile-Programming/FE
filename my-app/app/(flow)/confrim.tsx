// app/(flow)/confirm.tsx
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './confirm.styles';

export default function Confirm() {
  const { category, brand, mode } = useLocalSearchParams();

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>학습 확인</Text>
      <Text style={styles.box}>
        선택: {category} / {brand}
      </Text>

      <Text style={styles.modeText}>모드: {mode ?? '기본'}</Text>

      <Pressable
        style={styles.primary}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.btnText}>완료하고 홈으로</Text>
      </Pressable>
    </View>
  );
}
