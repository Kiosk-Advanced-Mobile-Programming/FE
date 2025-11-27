// app/(flow)/order-menu.style.ts
import { StyleSheet } from 'react-native';
import { Colors } from '@components/mcDonalds/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // [핵심] 좌우 배치를 위해 row 사용
    backgroundColor: Colors.Background,
  },

  // === 좌측 사이드바 ===
  sidebar: {
    flex: 1.2, // 화면의 약 25% 차지 (비율 조절 가능)
    backgroundColor: Colors.Background,
    borderRightWidth: 1,
    borderColor: Colors.GreyLine,
  },
  categoryItem: {
    height: 80, // 큼직한 높이
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GreyLine,
  },
  categoryItemActive: {
    backgroundColor: Colors.Background, // 선택되면 흰색 배경
    borderLeftWidth: 5, // 왼쪽에 노란색 강조 선
    borderLeftColor: Colors.Primary, 
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: Colors.TextBlack, // 선택되면 검은 글씨
    fontWeight: 'bold',
  },

  // === 우측 콘텐츠 영역 ===
  contentArea: {
    flex: 3.8, // 화면의 약 75% 차지
    backgroundColor: Colors.Background,
  },
  contentHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Background,
  },
  logoText: {
    fontSize: 30,
    color: Colors.Primary, // 맥도날드 노랑
    fontWeight: '900',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // 메뉴 그리드
  menuGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap', // [핵심] 줄바꿈 허용
    gap: 15, // 아이템 사이 간격
    paddingBottom: 50, // 하단 여백
  },
  menuCard: {
    width: '31%', // [핵심] 3열 배치 (간격 고려해서 31% 정도)
    // 2열로 하고 싶으면 '48%'로 변경하세요.
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  // 카드 내부 요소
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f4bf3c', // 금색/된장색 느낌
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1, // 정사각형
    backgroundColor: '#eee', // 이미지 대신 회색 박스
    marginBottom: 10,
    borderRadius: 4,
  },
  menuName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
    height: 40, // 두 줄이 될 수도 있으니 높이 고정
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  menuKcal: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    width: '100%',
    color: '#999',
  }
});