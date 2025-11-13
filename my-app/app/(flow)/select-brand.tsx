// app/(flow)/select-brand.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const brandsBy = {
  식당: ['한식', '분식'],
  카페: ['메가 커피', '이디야'],
} as const;

export default function SelectBrand() {
  const { category, mode } = useLocalSearchParams<{
    category?: keyof typeof brandsBy;
    mode?: string;
  }>();
  const brands = category ? brandsBy[category] : [];

  return (
    <View style={s.wrap}>
      <Text style={s.title}>{category ?? '선택'} 키오스크를 배우실까요?</Text>
      <View style={{ gap: 12 }}>
        {brands.map((b) => (
          <Pressable
            key={b}
            style={[s.btn, b === '이디야' ? s.btnDark : s.btnYellow]}
            onPress={() =>
              router.push({
                pathname: '/(flow)/confirm',
                params: { category, brand: b, mode },
              })
            }
          >
            <Text style={s.btnText}>{b}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  btnYellow: { backgroundColor: '#f7cf2a' },
  btnDark: { backgroundColor: '#0f1a50' },
  btnText: { color: 'white', fontWeight: '700' },
});
