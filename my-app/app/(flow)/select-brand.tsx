// app/(flow)/select-brand.tsx
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './select-brand.styles';

const brandsBy = {
  식당: ['일반 음식점', '맥도날드', '버거킹'],
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
        {`${category ?? '선택'} 키오스크를\n배우실까요?`}
      </Text>

      <View style={{ gap: 12 }}>
        {brands.map((b) => (
          <Pressable
            key={b}
            style={[
              styles.btn,
              b === '맥도날드'
                ? styles.btnRed
                : b === '버거킹'
                ? styles.btnBlue
                : b === '일반 음식점'
                ? styles.btnGreen
                : b === '이디야'
                ? styles.btnDark
                : styles.btnYellow,
            ]}
            onPress={() => {
              if (b === '일반 음식점') {
                // ✅ 일반 음식점 → general-restaurant 미니앱으로 바로 진입
                router.push('/general-restaurant');
              } else {
                // ✅ 나머지는 기존처럼 confirm 화면
                router.push({
                  pathname: '/confirm',
                  params: { category, brand: b, mode },
                });
              }
            }}
          >
            <Text style={styles.btnText}>{b}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
