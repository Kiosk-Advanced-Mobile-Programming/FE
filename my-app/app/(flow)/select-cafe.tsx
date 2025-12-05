// app/(flow)/select-cafe.tsx
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './select-cafe.styles';

const items = ['식당', '카페'];

export default function SelectCafe() {
  const { mode } = useLocalSearchParams(); // start에서 넘긴 mode 사용 가능

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>어떤 종류의 키오스크를 배우실까요?</Text>

      <View style={styles.row}>
        {items.map((it) => (
          <Pressable
            key={it}
            style={styles.pill}
            onPress={() =>
              router.push({
                pathname: '/(flow)/select-brand',
                params: { category: it, mode },
              })
            }
          >
            <Text style={styles.pillText}>{it}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
