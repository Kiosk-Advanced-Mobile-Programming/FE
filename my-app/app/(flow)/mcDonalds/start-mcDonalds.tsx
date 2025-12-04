// app/(flow)/select-cafe.tsx
import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import styles from './start-mcDonalds.style';
import PrepareModal from '@/components/mcDonalds/PrepareModal';
import Ionicons from '@expo/vector-icons/Ionicons';

const BANNER_IMAGES = [
  require('@assets/images/mcDonalds/banner/banner_genz.jpg'),
  require('@assets/images/mcDonalds/banner/banner_gmShake.jpg'),
  require('@assets/images/mcDonalds/banner/banner_icedTea.jpg'),
  require('@assets/images/mcDonalds/banner/banner_mcCrispy.png'),
  require('@assets/images/mcDonalds/banner/banner_mcLunch.jpg'),
  require('@assets/images/mcDonalds/banner/banner_mcMorning.jpg'),
  require('@assets/images/mcDonalds/banner/banner_mcWing.jpg'),
  require('@assets/images/mcDonalds/banner/banner_milkAndBerry.jpg'),
  require('@assets/images/mcDonalds/banner/banner_treats.jpg'),
  require('@assets/images/mcDonalds/banner/banner_mcDrive.jpg'),
  require('@assets/images/mcDonalds/banner/banner_gmShake.jpg')
];

export default function McDonaldsStart() {
  const { mode } = useLocalSearchParams(); // start에서 넘긴 mode 사용 가능

  // Modal 상태 관리
  const [modalVisible, setModalVisible] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return (prevIndex + 1) % BANNER_IMAGES.length;
      });
    }, 3000);  // todo 10초로 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      // 1. container (flex: 1)
      <View style={styles.container}>

        <Image 
          source={BANNER_IMAGES[currentImageIndex]}
          style={styles.bannerImage}
        />

        <View style={styles.noticeBar}>
          <Text style={styles.noticeText}>
            * 카카오 선물하기, 모바일 상품권 사용 가능 (무료 쿠폰 사용은 카운터에서 문의해주세요)
          </Text>
          <Text style={styles.noticeText}>
            * 현금 결제는 카운터에서만 가능 Please pay at Front Counter for Cash
          </Text>
          <Text style={styles.noticeText}>
            * 상기 이미지는 실제와 다를 수 있습니다.
          </Text>
        </View>

        <View style={styles.interactionContainer}>
          <View style={styles.leftPane}>
            <Pressable
              style={styles.orderButton}
              onPress={() => router.push('/(flow)/mcDonalds/select-menu')}
            >
              <Text style={styles.orderButtonText}>주문하기</Text>
            </Pressable>

          </View>
          
          <View style={styles.rightPane}>
            <Pressable 
              style={styles.qrButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.qrText}>포인트를</Text>
              <Text style={styles.qrText}>적립하세요</Text>
              <Ionicons name="qr-code-outline" size={60} color="black" />
            </Pressable>
          </View>

          <PrepareModal
            visible = {modalVisible}
            onClose={() => setModalVisible(false)}  // 닫기 버튼 누르면 꺼짐
            message="실제 키오스크에서는 맥도날드 앱을 열어 QR코드를 인식시켜 포인트를 적립할 수 있어요."
          />
        </View>
      </View>
    </>
  );
}
