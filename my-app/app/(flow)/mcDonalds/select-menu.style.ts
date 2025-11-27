import { StyleSheet } from 'react-native';
import { Colors } from '@/components/mcDonalds/colors'; // 경로 확인!

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 좌우 분할
    backgroundColor: '#fff',
  },

  // === 좌측 사이드바 ===
  sidebar: {
    flex: 1.2, // 약 20~25% 너비
    backgroundColor: '#f8f8f8',
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryItem: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryItemActive: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: Colors.Primary, // 노란색 강조
  },
  categoryIcon: { fontSize: 24, marginBottom: 4 },
  categoryText: { fontSize: 13, color: '#666', fontWeight: '600' },
  categoryTextActive: { color: '#000', fontWeight: 'bold' },
  
  homeButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginTop: 20,
  },

  // === 우측 콘텐츠 영역 ===
  contentArea: {
    flex: 3.8, // 약 75~80% 너비
    backgroundColor: '#fff',
  },
  contentHeader: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  // 메뉴 그리드 (MenuItem들이 배치될 곳)
  menuGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap', // 줄바꿈 필수
    gap: 12, // 아이템 사이 간격
    paddingBottom: 100, // 하단 footer 가리지 않게 여백
  },

  // === 하단 장바구니 바 (임시) ===
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});