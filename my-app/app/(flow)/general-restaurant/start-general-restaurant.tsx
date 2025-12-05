// start-general-restaurant.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import styles from './start-general-restaurant.style';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StartGeneralRestaurant'
>;

export default function StartGeneralRestaurant({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>레스토랑 키오스크 연습</Text>
      <Text style={styles.subtitle}>
        실제 키오스크처럼 메뉴를 고르고 주문하는 과정을 연습해 보세요.
      </Text>

      <Pressable
        style={styles.startButton}
        onPress={() => navigation.navigate('SelectMenu')}
      >
        <Text style={styles.startButtonText}>주문 시작하기</Text>
      </Pressable>
    </View>
  );
}
