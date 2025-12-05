// components/MenuItem.tsx
import React from 'react';
import { Pressable, Image, Text, StyleSheet, View } from 'react-native';

type MenuItemProps = {
  name: string;
  price: number;
  imageSource: any; // require('...') 경로
  onPress: () => void;
};

const MenuItem = ({ name, price, imageSource, onPress }: MenuItemProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        {/* toLocaleString()을 쓰면 1,000 처럼 쉼표가 자동으로 찍힘 */}
        <Text style={styles.price}>{price.toLocaleString()}원</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%', // 2열 배치를 위해 (gap 고려해서 48% 정도)
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    // 그림자 효과 (카드처럼 보이게)
    elevation: 3, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // 정사각형 유지
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18, // 어르신들을 위해 크게
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#D52B1E', // 강조색 (맥도날드 빨강)
    fontWeight: 'bold',
  },
});

export default MenuItem;