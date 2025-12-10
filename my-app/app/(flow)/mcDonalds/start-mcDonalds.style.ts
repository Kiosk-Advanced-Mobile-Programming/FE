import { StyleSheet } from 'react-native';
import { Colors } from '@components/mcDonalds/colors'

// 이미지 원본 비율 (가로 750 / 세로 900)
const BANNER_ASPECT_RATIO = 750 / 900;

export default StyleSheet.create({
  // 1. 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: Colors.Background, // 이미지의 하단과 맞추기 위해 흰색으로 변경
  },

  // 상단 배너 이미지
  bannerImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: BANNER_ASPECT_RATIO,
    resizeMode: 'contain', 
  },

  // 중간 노란 안내 바
  noticeBar: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    alignContent: 'center',
    backgroundColor: Colors.Primary,
    overflow: 'hidden'
  },
  noticeText: {
    fontSize: 10
  },

  // 3. 하단 인터랙션 영역 (content와 footer 대신 사용)
  interactionContainer: {
    flex: 1, // 배너를 제외한 '남은 공간 전체'를 차지
    flexDirection: 'row', // 자식들을 가로(왼쪽/오른쪽)로 배치
  },

  // 3-1. 주문하기 버튼
  leftPane: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingLeft: 30,
  },
  orderButton: {
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BorderDark,
    marginBottom: 80,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 3, 
        blurRadius: 5,
        color: 'rgba(0, 0, 0, 0.3)'
      },
    ],
  },
  orderButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TextMain,
  },

    // 3-2. 포인트 적립 (QR)
  rightPane: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',    
    paddingRight: 30,
    paddingLeft: 10,
  },
  qrButton: {
    height: 150,
    backgroundColor: Colors.Primary,
    borderWidth: 1,
    borderColor: Colors.BorderDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  qrText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TextMain,
  },

    // --- 기존 스타일 (사용하지 않는 것 정리) ---
  text: {
    fontSize: 18,
  },
  // ... (squareButton 등 필요한 것만 남기고 정리)
});