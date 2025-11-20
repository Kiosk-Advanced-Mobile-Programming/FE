// app/(flow)/select-cafe.tsx
import { View, Text, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import styles from './mcDonalds.style';
import { Assets } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar'; // 1. StatusBar import

const items = ['식당', '카페'];

export default function McDonaldsStart() {
  const { mode } = useLocalSearchParams(); // start에서 넘긴 mode 사용 가능

  return (
    // 1. container (flex: 1)
    <View style={styles.container}>

      <Image
        source={require('../../../assets/images/mcDonalds/banner_genz.jpg')}
        style={styles.bannerImage}
      />

      <View style={styles.interactionContainer}>
        <View style={styles.leftPane}>
          <Pressable
            style={styles.orderButton}
            //onPress={() => router.push('/order-menu')}
          >
            <Text style={styles.orderButtonText}>주문하기</Text>
          </Pressable>

          <View style={styles.selectButtonLayout}>
            <Pressable 
              style={styles.selectButton} 
            >
              <Text style={styles.smallSelectButtonText}>언어 선택</Text>
              <Text style={styles.smallSelectButtonText}>(Language)</Text>
            </Pressable>
            <Pressable 
              style={styles.selectButton} 
            >
              <Text style={styles.smallSelectButtonText}>언어 선택</Text>
              <Text style={styles.smallSelectButtonText}>(Language)</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.rightPane}>
          <Pressable style={styles.qrButton}>
            <Text style={styles.qrText}>포인트를 적립하세요</Text>
          </Pressable>
        </View>
        

      </View>
    </View>
  );
}
