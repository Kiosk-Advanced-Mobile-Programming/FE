// app/(flow)/start.tsx
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import styles from './start.styels';

export default function StartScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>테스트 문구</Text>

      <Pressable
        style={styles.btnPrimary}
        onPress={() => router.push('/(flow)/select-cafe')}
      >
        <Text style={styles.btnText}>학습하기</Text>
      </Pressable>

      <Pressable
        style={styles.btnSecondary}
        onPress={() => router.push('/(flow)/select-cafe?mode=review')}
      >
        <Text style={styles.btnText}>학습 확인</Text>
      </Pressable>
    </View>
  );
}
