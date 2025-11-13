// app/(flow)/select-cafe.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const items = ['식당', '카페'];

export default function SelectCafe() {
  const { mode } = useLocalSearchParams(); // start에서 넘긴 mode 사용 가능

  return (
    <View style={s.wrap}>
      <Text style={s.title}>어떤 종류의 키오스크를 배우실까요?</Text>
      <View style={s.row}>
        {items.map((it) => (
          <Pressable
            key={it}
            style={s.pill}
            onPress={() =>
              router.push({
                pathname: '/(flow)/select-brand',
                params: { category: it, mode },
              })
            }
          >
            <Text style={s.pillText}>{it}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12 },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#c9b7ff',
  },
  pillText: { color: 'white', fontWeight: '600' },
});
