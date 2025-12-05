import { StyleSheet } from 'react-native';
import { Colors } from '@/components/mcDonalds/colors';

export default StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: Colors.Background },

  // === 사이드바 ===
  sidebar: {
    flex: 1.2,
    backgroundColor: Colors.BackgroundGray, // #f5f5f5
    alignItems: 'center',
    paddingTop: 50,
    borderRightWidth: 1,
    borderColor: Colors.Border, // #e0e0e0
  },
  sidebarItem: { alignItems: 'center', marginBottom: 5 },
  stepCircle: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, 
    borderColor: Colors.BorderDark, // #ccc
    backgroundColor: Colors.White, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 5
  },
  stepCircleActive: { borderColor: Colors.Primary, backgroundColor: Colors.Primary },
  stepText: { fontSize: 13, color: Colors.TextGray, textAlign: 'center' }, // #999
  stepTextActive: { color: Colors.Black, fontWeight: 'bold' },
  line: { width: 1, height: 40, backgroundColor: Colors.Line, marginVertical: 5 }, // #ddd

  // === 메인 콘텐츠 ===
  content: { flex: 3.8, backgroundColor: Colors.White },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.BorderLight }, // #eee
  menuTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.TextMain, marginBottom: 5 }, // #333
  menuPriceInfo: { fontSize: 20, fontWeight: '600', color: Colors.TextSub }, // #555

  stepContainer: { flex: 1, padding: 20 },
  guideText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: Colors.TextMain },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingBottom: 50,
  },

  // === 카드 스타일 ===
  card: {
    width: '45%',
    aspectRatio: 0.75,
    borderWidth: 1,
    borderColor: Colors.Border, // #e0e0e0
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  cardSelected: {
    borderColor: Colors.Primary,
    borderWidth: 3,
    backgroundColor: Colors.White,
  },
  cardImage: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardSubName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  cardName: { fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 4, color: Colors.TextSub }, // #555
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.TextMain }, // #333
  optionPrice: { fontSize: 14, color: Colors.Secondary, fontWeight: 'bold' }, // #D52B1E (빨강)
  cardKcal: { fontSize: 12, color: Colors.TextGray, marginTop: 5 }, // #999

  // === 최종 확인 화면 ===
  finalView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  summaryBox: { alignItems: 'center', marginBottom: 30 },
  summaryTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  summaryText: { fontSize: 16, color: Colors.TextSub, marginBottom: 5 }, // #555
  
  quantityContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, 
    borderColor: Colors.BorderDark, // #ccc
    borderRadius: 4, width: 200, height: 50, marginBottom: 50
  },
  qtyButton: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.ButtonLight }, // #f0f0f0
  qtyText: { fontSize: 24, fontWeight: 'bold' },
  qtyNumber: { flex: 2, textAlign: 'center', fontSize: 20, fontWeight: 'bold' },

  // === 하단 버튼 ===
  footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: Colors.BorderLight, gap: 15 }, // #eee
  cancelButton: {
    flex: 1, height: 60, 
    backgroundColor: Colors.White, 
    borderWidth: 1, 
    borderColor: Colors.BorderDark, // #ccc
    alignItems: 'center', justifyContent: 'center', borderRadius: 4
  },
  cancelButtonText: { fontSize: 18, color: Colors.TextSub }, // #555
  confirmButton: {
    flex: 2, height: 60, backgroundColor: Colors.Primary,
    alignItems: 'center', justifyContent: 'center', borderRadius: 4
  },
  confirmButtonText: { fontSize: 20, fontWeight: 'bold', color: Colors.Black },

  // === 주문 완료 모달 ===
  successModalContainer: {
    flex: 1,
    backgroundColor: Colors.ModalOverlay, // rgba(255,255,255,0.9)
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCard: { alignItems: 'center', justifyContent: 'center' },
  successCheckCircle: {
    position: 'absolute', top: 0, right: -10, width: 30, height: 30, borderRadius: 15,
    backgroundColor: Colors.Primary,
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.White,
  },
  successTitle: {
    fontSize: 24, fontWeight: 'bold', color: Colors.TextMain, textAlign: 'center',
    marginTop: 20, marginBottom: 20, lineHeight: 34,
  },
  successPrice: { fontSize: 32, fontWeight: 'bold', color: Colors.Black },
});