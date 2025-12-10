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
    // 시작 버튼 터치 1회
    registerTouch(true);
    // 학습 세션 시작 (백엔드로 category / session 전송, startedAt 기록)
    await start(CATEGORY, SESSION);
    navigation.navigate('SelectMenu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>레스토랑 키오스크 연습</Text>
      <Text style={styles.subtitle}>
        실제 키오스크처럼 메뉴를 고르고 주문하는 과정을 연습해 보세요.
      </Text>

      <Pressable style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>주문 시작하기</Text>
      </Pressable>
    </View>
  );
}
