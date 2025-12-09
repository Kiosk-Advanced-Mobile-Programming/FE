// app/(flow)/general-restaurant/select-menu.style.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  categoryRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#da291c',
    borderColor: '#da291c',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 12,
  },
  menuCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-between',
    // 그림자 살짝
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  // ★ 이미지 스타일
  menuImage: {
    width: '100%',
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  // ★ 텍스트 영역
  menuInfo: {
    flex: 1,
    marginBottom: 8,
  },
  menuName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 13,
    color: '#555',
  },
  spicy: {
    marginTop: 4,
    fontSize: 12,
    color: '#da291c',
  },
  addButton: {
    marginTop: 4,
    backgroundColor: '#ffc72c',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#da291c',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
