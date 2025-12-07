// app/(flow)/select-brand.tsx
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './select-brand.styles';

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
    <View style={styles.wrap}>
      <Text style={styles.title}>
        {category ?? '선택'} 키오스크를 배우실까요?
      </Text>

      <View style={{ gap: 12 }}>
        {brands.map((b) => (
          <Pressable
            key={b}
            style={[
              styles.btn,
              b === '메가 커피' ? styles.btnDark : styles.btnYellow,
            ]}
            onPress={() =>
              router.push({
                //pathname: '/(flow)/megacoffee/startPage',
                //pathname: '/(flow)/ediya/startPage',
                pathname: '/(flow)/ediya/level',
                //pathname: '/(flow)/megacoffee/level',
              })
            }
          >
            <Text style={styles.btnText}>{b}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
