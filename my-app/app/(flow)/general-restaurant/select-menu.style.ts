// select-menu.style.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  /* 카테고리 영역 */
  categoryRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
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
    fontWeight: '700',
  },

  /* 메뉴 그리드 */
  listContent: {
    padding: 10,
  },

  menuCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  /* ★ 메뉴 이미지 추가 */
  menuImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },

  menuName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  menuPrice: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  spicy: {
    fontSize: 12,
    color: '#da291c',
    marginBottom: 6,
  },

  /* 담기 버튼 */
  addButton: {
    marginTop: 6,
    backgroundColor: '#ffc72c',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* 하단 장바구니 안내 */
  footer: {
    padding: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#da291c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
