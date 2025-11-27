// app/(flow)/order-menu.data.ts (새로 생성하거나 같은 파일 상단에 두세요)

export const CATEGORIES = [
  { id: 'home', name: '홈', icon: '🏠' },
  { id: 'recommend', name: '추천메뉴', icon: '⭐' },
  { id: 'burger', name: '버거', icon: '🍔' },
  { id: 'lunch', name: '맥런치', icon: '🌞' },
  { id: 'snack', name: '해피스낵', icon: '🍟' },
  { id: 'side', name: '사이드', icon: '🥤' },
  { id: 'coffee', name: '커피', icon: '☕' },
  { id: 'dessert', name: '디저트', icon: '🍦' },
];

export const MENU_ITEMS = [
  { id: 1, category: 'recommend', name: '진주 고추 크림치즈 버거', price: 7400, kcal: 597, isNew: true },
  { id: 2, category: 'recommend', name: '더블 맥스파이시 상하이 버거', price: 8900, kcal: 759, isNew: true },
  { id: 3, category: 'burger', name: '빅맥', price: 5500, kcal: 583, isNew: false },
  { id: 4, category: 'burger', name: '치즈버거', price: 3000, kcal: 300, isNew: false },
  // ... 더 많은 데이터
];