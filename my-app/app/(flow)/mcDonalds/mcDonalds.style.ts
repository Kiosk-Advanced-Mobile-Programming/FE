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
  orderButton: {
    // 6:4 비율로 가정 (flex: 3 + flex: 2 = 5)
    flex: 3, 
    backgroundColor: 'white', // 이미지 참고
    justifyContent: 'center',
    alignItems: 'center',
    // 이미지처럼 살짝 회색 테두리
    borderColor: '#eee',
    borderWidth: 1,
    margin: 10, // 여백
    borderRadius: 8,
  },
  orderButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

    // 3-2. 포인트 적립 (QR)
  qrContainer: {
    flex: 2, 
    backgroundColor: '#fdf8e2', // 이미지 참고 (노란빛)
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
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