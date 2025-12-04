// select-brand.styles.ts

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  btn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },

  // 기존 스타일
  btnYellow: {
    backgroundColor: '#f7cf2a',
  },
  btnDark: {
    backgroundColor: '#0f1a50',
  },

  // ★ 새 브랜드 색상
  btnRed: {
    backgroundColor: '#E63946', // 맥도날드 이미지 빨강
  },
  btnBlue: {
    backgroundColor: '#1D4ED8', // 버거킹 느낌 파랑
  },
  btnGreen: {
    backgroundColor: '#2ECC71', // 일반 음식점 → 초록색
  },
});
