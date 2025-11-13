// app/(flow)/confirm.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function Confirm() {
  const { category, brand, mode } = useLocalSearchParams();

  return (
    <View style={s.wrap}>
      <Text style={s.title}>학습 확인</Text>
      <Text style={s.box}>
        선택: {category} / {brand}
      </Text>
      <Text style={{ marginBottom: 20 }}>모드: {mode ?? '기본'}</Text>

      <Pressable style={s.primary} onPress={() => router.replace('/(tabs)')}>
        <Text style={s.btnText}>완료하고 홈으로</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 16 },
  box: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#eadcff',
    marginBottom: 8,
  },
  primary: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#6d4aff',
    alignSelf: 'flex-start',
  },
  btnText: { color: 'white', fontWeight: '700' },
});
