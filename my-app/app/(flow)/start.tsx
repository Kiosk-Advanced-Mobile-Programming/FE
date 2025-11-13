// app/(flow)/start.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function StartScreen() {
  return (
    <View style={s.wrap}>
      <Text style={s.title}>테스트 문구</Text>

      <Pressable
        style={s.btnPrimary}
        onPress={() => router.push('/(flow)/select-cafe')}
      >
        <Text style={s.btnText}>학습하기</Text>
      </Pressable>

      <Pressable
        style={s.btnSecondary}
        onPress={() => router.push('/(flow)/select-cafe?mode=review')}
      >
        <Text style={s.btnText}>학습 확인</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'white',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  btnPrimary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#6d4aff',
  },
  btnSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#8a7cf6',
  },
  btnText: { color: 'white', fontWeight: '600' },
});
