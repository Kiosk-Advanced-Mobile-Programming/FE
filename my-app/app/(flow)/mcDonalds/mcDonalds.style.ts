import { StyleSheet } from 'react-native';

// 이미지 원본 비율 (가로 750 / 세로 900)
const BANNER_ASPECT_RATIO = 750 / 900;

export default StyleSheet.create({
  // 1. 전체 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // 이미지의 하단과 맞추기 위해 흰색으로 변경
  },

  // 상단 배너 이미지
  bannerImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: BANNER_ASPECT_RATIO,
    resizeMode: 'contain', 
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
    paddingRight: 5,
    paddingLeft: 30,
    gap: 10,
  },
  orderButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 40,
  },
  orderButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  selectButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 40,
  },
  selectButtonText: {
    fontSize: 18,
  },
  smallSelectButtonText: {
    fontSize: 18,
  },
  
  
    // 3-2. 포인트 적립 (QR)
  rightPane: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',    
    paddingRight: 30,
    paddingLeft: 5,
    backgroundColor: '#ff9191ff',
  },
  qrButton: {
    backgroundColor: '#e9ba4b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  qrText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    // TODO: QR 이미지 위에 텍스트 배치
  },

    // --- 기존 스타일 (사용하지 않는 것 정리) ---
  text: {
    fontSize: 18,
  },
  // ... (squareButton 등 필요한 것만 남기고 정리)
});