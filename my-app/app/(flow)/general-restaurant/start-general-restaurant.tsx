// app/(flow)/general-restaurant/start-general-restaurant.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import styles from './start-general-restaurant.style';
import { useStudySession } from './study-session-context';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StartGeneralRestaurant'
>;

const CATEGORY = 'generalRestaurant';
const SESSION = 'basicOrder';

export default function StartGeneralRestaurant({ navigation }: Props) {
  const { start, registerTouch } = useStudySession();

  const handleStart = async () => {
    registerTouch(true);
    await start(CATEGORY, SESSION);
    navigation.navigate('SelectMenu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>일반 음식점 키오스크</Text>
      <Text style={styles.subtitle}>연습을 시작해보세요!</Text>

      <Pressable style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>주문 시작하기</Text>
      </Pressable>
    </View>
  );
}
