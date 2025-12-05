import { StyleSheet } from 'react-native';
import { Colors } from '@/components/mcDonalds/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.Background,
  },

  // === 좌측 사이드바 ===
  sidebar: {
    flex: 1,
    backgroundColor: Colors.BackgroundGray, // #f8f8f8 -> 통일
    borderRightWidth: 1,
    borderColor: Colors.Border, // #e0e0e0
  },
  categoryItem: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight, // #eee
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
    paddingBottom: 100,
  },

  // === 하단 장바구니 바 ===
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.FooterBackground, // #292929
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: Colors.Primary,
    color: Colors.Black,
    fontWeight: 'bold',
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  totalPrice: {
    color: Colors.White,
    fontSize: 24,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.FooterBackground, // #292929
  }
});