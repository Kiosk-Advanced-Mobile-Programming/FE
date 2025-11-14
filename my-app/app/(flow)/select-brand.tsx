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
              b === '이디야' ? styles.btnDark : styles.btnYellow,
            ]}
            onPress={() =>{
              if(b==='메가 커피'){  //여기부터 이거는 잘 작동하나 확인용임
                router.push('/(flow)/megacoffee');
              }else{            //여기까지 지우고 올리면 됨
              router.push({
                pathname: '/(flow)/confirm',
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
