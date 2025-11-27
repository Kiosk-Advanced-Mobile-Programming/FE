// app/(flow)/mcDonalds/menu.data.ts

// 1. 데이터의 형태(타입)를 미리 정의합니다. (TypeScript의 장점!)
export type Category = {
  id: string;
  name: string;
  icon: string; // 이모지 또는 아이콘 이미지 경로
};

export type Menu = {
  id: number;
  category: string; // Category의 id와 연결됨
  name: string;
  price: number;
  image: any; // require('...') 경로
  isNew?: boolean; // 신제품 여부 (선택사항)
  kcal?: number; // 칼로리 (선택사항)
};

// 2. 카테고리 데이터
export const CATEGORIES: Category[] = [
  { id: 'home', name: '홈', icon: '🏠'},
  { id: 'recommend', name: '추천메뉴', icon: '⭐' },
  { id: 'burger', name: '버거', icon: '🍔' },
  { id: 'lunch', name: '맥런치', icon: '🌞' },
  { id: 'snack', name: '해피스낵', icon: '🍟' },
  { id: 'side', name: '사이드', icon: '🧀' },
  { id: 'drink', name: '음료', icon: '🥤' },
  { id: 'dessert', name: '디저트', icon: '🍦' },
];

// 3. 메뉴 데이터
// ⚠️ 주의: 이미지 경로는 실제 프로젝트에 있는 파일 경로로 맞춰주세요!
export const MENU_ITEMS: Menu[] = [
  // --- 추천메뉴 ---
  { 
    id: 1, 
    category: 'recommend', 
    name: '진주 고추 크림치즈 버거', 
    price: 7400, 
    image: require('@assets/images/burgers/jinju.png'), // 경로 확인 필요
    isNew: true,
    kcal: 597
  },
  { 
    id: 2, 
    category: 'recommend', 
    name: '더블 맥스파이시 상하이 버거', 
    price: 8900, 
    image: require('@assets/images/burgers/shanghai_double.png'), 
    isNew: true 
  },
  {
    id: 1,
    category: 'recommend',
    name: '더블 쿼터파운더',
    price: 7400,
    image: require('@assets/images/mcDonalds/menu/burger/')
  }

  // --- 버거 ---
  { 
    id: 3, 
    category: 'burger', 
    name: '빅맥', 
    price: 5500, 
    image: require('@assets/images/burgers/bigmac.png'),
    kcal: 583
  },
  { 
    id: 4, 
    category: 'burger', 
    name: '치즈버거', 
    price: 3000, 
    image: require('@assets/images/burgers/cheese.png') 
  },
  { 
    id: 5, 
    category: 'burger', 
    name: '불고기 버거', 
    price: 4500, 
    image: require('@assets/images/burgers/bulgogi.png') 
  },

  // --- 사이드/스낵 ---
  { 
    id: 6, 
    category: 'snack', 
    name: '맥너겟 4조각', 
    price: 2500, 
    image: require('@assets/images/sides/nuggets.png') 
  },
  { 
    id: 7, 
    category: 'side', 
    name: '후렌치 후라이(M)', 
    price: 2000, 
    image: require('@assets/images/sides/fries.png') 
  },

  // --- 음료 ---
  { 
    id: 8, 
    category: 'drink', 
    name: '코카-콜라', 
    price: 1700, 
    image: require('@assets/images/drinks/coke.png') 
  },
  { 
    id: 9, 
    category: 'drink', 
    name: '아이스 카페라떼', 
    price: 3500, 
    image: require('@assets/images/drinks/latte.png') 
  },
];