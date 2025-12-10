import { StyleSheet } from 'react-native';
import { Colors } from '@/components/mcDonalds/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.Background,
  },

  homeContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  homeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  homeCard: {
    width: '48%', // 2열 배치
    //height: 120,
    minHeight: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    justifyContent: 'space-between',
  },
  homeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  homeCardIcon: {
    fontSize: 30,
    textAlign: 'right', // 아이콘을 우측 하단으로
    marginTop: 5,
  },
  
// 배너 영역
  bannerArea: {
    gap: 15,
    marginBottom: 30,
  },
  bannerImage: {
    width: '100%',
    height: 120, // 이미지 높이 설정 (적절히 조절 가능)
    borderRadius: 3,
    // 기존의 justifyContent, padding 등은 이미지에는 불필요하므로 제거
  },

  // 인기 메뉴 섹션
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingBottom: 20,
  },

  // === 좌측 사이드바 ===
  sidebar: {
    flex: 1,
    backgroundColor: Colors.BackgroundGray, // #f8f8f8 -> 통일
    borderRightWidth: 1,
    borderColor: Colors.Border, // #e0e0e0
  },
  categoryItem: {
    //height: 80,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight, // #eee
    overflow: 'hidden',
  },
  categoryItemActive: {
    backgroundColor: Colors.White,
    borderLeftWidth: 5,
    borderLeftColor: Colors.Primary,
  },
  categoryIcon: { fontSize: 24, marginBottom: 4 },
  categoryText: { fontSize: 18, color: Colors.TextSub, fontWeight: '600' }, // #666 -> TextSub
  categoryTextActive: { color: Colors.Black, fontWeight: 'bold' },
  
  homeButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BorderLight, // #eee
    marginTop: 20,
  },

  // === 우측 콘텐츠 영역 ===
  contentArea: {
    flex: 4,
    backgroundColor: Colors.Background,
  },
  contentHeader: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight, // #eee
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.TextMain, // #333
  },

  menuGrid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 200,
  },

  // === 하단 장바구니 바 (2줄 레이아웃) ===
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140, 
    backgroundColor: Colors.BackgroundGray,
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15, 
    gap: 15, // 윗줄(가격)과 아랫줄(버튼) 사이 간격
  },

  // 1. 윗줄: 수량 및 가격 정보
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%', 
  },
  countBadge: {
    backgroundColor: Colors.Primary,
    color: Colors.TextMain,
    fontWeight: 'bold',
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
    borderRadius: 3,
    marginRight: 10,
  },
  totalPrice: {
    color: Colors.TextMain,
    fontSize: 24,
    fontWeight: 'bold',
  },

  // 2. 아랫줄: 결제 버튼
  payButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: 15, // 버튼 높이감 추가
    borderRadius: 3, // 둥글기 조정
    width: '100%', // 버튼을 가로로 꽉 채움
    alignItems: 'center', // 텍스트 중앙 정렬
    justifyContent: 'center',
  },
  // 비활성 버튼 스타일  
  payButtonDisabled: {
    color: Colors.TextGray,
    backgroundColor: Colors.PrimaryDisabled,
  },

  payButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TextMain,
  }
});