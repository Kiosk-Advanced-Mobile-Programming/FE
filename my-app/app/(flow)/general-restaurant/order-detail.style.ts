// order-detail.style.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center', // ★ 내용 전체 가운데 정렬
  },

  // ★ 메뉴 이미지 스타일 추가
  image: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: 'cover',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  price: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },

  desc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center', // ★ 설명 글도 중앙 정렬
    lineHeight: 20,
  },

  addButton: {
    backgroundColor: '#ffc72c',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
