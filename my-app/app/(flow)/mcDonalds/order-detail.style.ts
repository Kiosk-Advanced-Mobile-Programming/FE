// app/(flow)/mcDonalds/order-detail.style.ts
import { StyleSheet } from 'react-native';
import { Colors } from '@/components/mcDonalds/colors';

export default StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },

  // === 사이드바 ===
  sidebar: {
    flex: 1.2,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 50,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  sidebarItem: { alignItems: 'center', marginBottom: 5 },
  stepCircle: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#ccc',
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 5
  },
  stepCircleActive: { borderColor: Colors.Primary, backgroundColor: Colors.Primary },
  stepText: { fontSize: 13, color: '#999', textAlign: 'center' },
  stepTextActive: { color: '#000', fontWeight: 'bold' },
  line: { width: 1, height: 40, backgroundColor: '#ddd', marginVertical: 5 },

  // === 메인 콘텐츠 ===
  content: { flex: 3.8, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  menuPriceInfo: { fontSize: 20, fontWeight: '600', color: '#555' },

  stepContainer: { flex: 1, padding: 20 },
  guideText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  
  // 그리드 (3열 배치)
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingBottom: 50,
  },

  // === 카드 스타일 ===
  card: {
    width: '31%', // 3개씩 나열
    aspectRatio: 0.75,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: Colors.Primary,
    borderWidth: 3,
    backgroundColor: '#fff', // 배경은 흰색 유지
  },
  cardImage: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardSubName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  cardName: { fontSize: 14, fontWeight: '500', textAlign: 'center', marginBottom: 4, color: '#555' },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  optionPrice: { fontSize: 14, color: '#D52B1E', fontWeight: 'bold' },
  cardKcal: { fontSize: 12, color: '#999', marginTop: 5 },

  // === 최종 확인 화면 ===
  finalView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  summaryBox: { alignItems: 'center', marginBottom: 30 },
  summaryTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  summaryText: { fontSize: 16, color: '#555', marginBottom: 5 },
  
  quantityContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 4,
    width: 200, height: 50, marginBottom: 50
  },
  qtyButton: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' },
  qtyText: { fontSize: 24, fontWeight: 'bold' },
  qtyNumber: { flex: 2, textAlign: 'center', fontSize: 20, fontWeight: 'bold' },

  // === 하단 버튼 ===
  footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: '#eee', gap: 15 },
  cancelButton: {
    flex: 1, height: 60, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center', borderRadius: 4
  },
  cancelButtonText: { fontSize: 18, color: '#555' },
  confirmButton: {
    flex: 2, height: 60, backgroundColor: Colors.Primary,
    alignItems: 'center', justifyContent: 'center', borderRadius: 4
  },
  confirmButtonText: { fontSize: 20, fontWeight: 'bold', color: '#000' },
});