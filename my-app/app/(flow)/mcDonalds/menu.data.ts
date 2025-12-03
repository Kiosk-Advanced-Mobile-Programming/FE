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
  setImages?: {
    normal?: any;
    large?: any;
  }
  isNew?: boolean; // 신제품 여부 (선택사항)
  kcal?: number; // 칼로리 (선택사항)
};

// 2. 카테고리 데이터
export const CATEGORIES: Category[] = [
  { id: 'home', name: '홈', icon: '🏠'},
  { id: 'recommend', name: '추천메뉴', icon: '⭐' },
  { id: 'burger', name: '버거', icon: '🍔' },
  { id: 'mclunch', name: '맥런치', icon: '🌞' },
  { id: 'snack', name: '해피스낵', icon: '🍟' },
  { id: 'side', name: '사이드', icon: '🧀' },
  { id: 'drink', name: '음료', icon: '🥤' },
  { id: 'dessert', name: '디저트', icon: '🍦' },
];

// 3. 세트 종류 데이터 (화면 표시용)
export const SET_TYPES = [
  { id: 'single', name: '단품 선택', priceAdd: 0, label: '단품' },
  { id: 'normal', name: '세트 선택', priceAdd: 1500, label: '세트' },
  { id: 'large', name: '라지 세트', price: 2200, label: '라지세트' },
];

// 4. 사이드 데이터 (기존 유지)
export const SIDE_OPTIONS = [
  { id: 'fries', name: '후렌치 후라이 - 미디엄', price: 0, kcal: 324, image: require('@assets/images/sides/french_fries_m.png') },
  { id: 'coleslaw', name: '코울슬로', price: 0, kcal: 150, image: require('@assets/images/sides/coleslaw.png') },
  { id: 'cheese_stick', name: '치즈스틱 2조각', price: 500, kcal: 200, image: require('@assets/images/sides/cheese_stick.png') },
];

// 5. ✨ [추가] 음료 데이터 (임의 구성)
export const DRINK_OPTIONS = [
  { id: 'coke', name: '코카-콜라 - 미디엄', price: 0, kcal: 133, image: require('@assets/images/drinks/coke.png') },
  { id: 'coke_zero', name: '코카-콜라 제로 - 미디엄', price: 0, kcal: 0, image: require('@assets/images/drinks/coke_zero.png') },
  { id: 'sprite', name: '스프라이트 - 미디엄', price: 0, kcal: 140, image: require('@assets/images/drinks/sprite.png') },
  { id: 'fanta', name: '환타 - 미디엄', price: 0, kcal: 62, image: require('@assets/images/drinks/fanta.png') },
  { id: 'americano', name: '아이스 아메리카노 - 미디엄', price: 500, kcal: 10, image: require('@assets/images/drinks/americano.png') }, // 추가금 예시
  { id: 'latte', name: '아이스 카페라떼 - 미디엄', price: 1000, kcal: 150, image: require('@assets/images/drinks/latte.png') },
];

// 6. 메뉴 데이터
// ⚠️ 주의: 이미지 경로는 실제 프로젝트에 있는 파일 경로로 맞춰주세요!
export const MENU_ITEMS: Menu[] = [
  // --- 추천메뉴 ---
  {
    id: 1,
    category: 'recommend',
    name: '더블 쿼터파운더 치즈',
    price: 7400,
    image: require('@assets/images/mcDonalds/menu/burger/d_qtr_pnd.png')
  },
  {
    id: 2,
    category: 'recommend',
    name: '맥윙 2조각',
    price: 3400,
    image: require('@assets/images/mcDonalds/menu/side/mcwing_2.png'),
    kcal: 245
  },
  {
    id: 3,
    category: 'recommend',
    name: '치킨 모짜렐라 스낵랩',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/happy_snack/c_m_snack_wrap.png'),
    kcal: 365
  },
  {
    id: 4,
    category: 'recommend',
    name: '맥스파이시 상하이 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcspicy_shghi.png'),
    kcal: 501
  },
  {
    id: 5,
    category: 'recommend',
    name: '쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/qtr_pnd.png'),
    kcal: 534
  },

  // ==== 맥런치 ====
  {
    id: 6,
    category: 'mclunch',
    name: '1955 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/1955bgr_set.png'),
    kcal: 534
  },
  {
    id: 7,
    category: 'mclunch',
    name: '빅맥 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/bigmac_set.png'),
    kcal: 534
  },
  {
    id: 8,
    category: 'mclunch',
    name: '베이컨 토마토 디럭스 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/btd_set.png'),
    kcal: 534
  },
  {
    id: 9,
    category: 'mclunch',
    name: '더블 불고기 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/d_bul_bgr_set.png'),
    kcal: 534
  },
  {
    id: 10,
    category: 'mclunch',
    name: '맥크리스피 디럭스 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/mccrispy_dlx_bgr_set.png'),
    kcal: 534
  },
  {
    id: 11,
    category: 'mclunch',
    name: '맥크리스피 디럭스 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/mcspicy_shghi_set.png'),
    kcal: 534
  },
  // ====== 버거 ======
  {
    id: 12,
    category: 'burger',
    name: '빅맥',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bigmac.png'),
    kcal: 0
  },
  {
    id: 13,
    category: 'burger',
    name: '맥스파이시 상하이 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcspicy_shghi.png'),
    kcal: 0
  },
  {
    id: 14,
    category: 'burger',
    name: '맥스파이시 상하이 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcspicy_shghi.png'),
    kcal: 0
  },
  {
    id: 15,
    category: 'burger',
    name: '1955 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/1955bgr.png'),
    kcal: 0
  },
  {
    id: 16,
    category: 'burger',
    name: '더블 쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_qtr_pnd.png'),
    kcal: 0
  },
  {
    id: 17,
    category: 'burger',
    name: '쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/qtr_pnd.png'),
    kcal: 0
  },
  {
    id: 18,
    category: 'burger',
    name: '맥크리스피 디럭스 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mccrispy_dlx_bgr.png'),
    kcal: 0
  },
  {
    id: 19,
    category: 'burger',
    name: '맥크리스피 클래식 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mccrispy_clsc_bgr.png'),
    kcal: 0
  },
  {
    id: 20,
    category: 'burger',
    name: '베이컨 토마토 디럭스',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/btd.png'),
    kcal: 0
  },
  {
    id: 21,
    category: 'burger',
    name: '맥치킨 모짜렐라',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcchicken_moza.png'),
    kcal: 0
  },
  {
    id: 22,
    category: 'burger',
    name: '맥치킨',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcchicken.png'),
    kcal: 0
  },
  {
    id: 23,
    category: 'burger',
    name: '더블 불고기 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_bul_bgr.png'),
    kcal: 0
  },
  {
    id: 24,
    category: 'burger',
    name: '불고기 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bul_bgr.png'),
    kcal: 0
  },
  {
    id: 25,
    category: 'burger',
    name: '슈비 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/sbi_bgr.png'),
    kcal: 0
  },
  {
    id: 26,
    category: 'burger',
    name: '슈슈 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/shsh_bgr.png'),
    kcal: 0
  },
  {
    id: 27,
    category: 'burger',
    name: '토마토 치즈 비프 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/t_c_bgr.png'),
    kcal: 0
  },
  {
    id: 28,
    category: 'burger',
    name: '트리플 치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/t_c_bgr.png'),
    kcal: 0
  },
  {
    id: 29,
    category: 'burger',
    name: '더블 치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_c_bgr.png'),
    kcal: 0
  },
  {
    id: 30,
    category: 'burger',
    name: '치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/c_bgr.png'),
    kcal: 0
  },
  {
    id: 31,
    category: 'burger',
    name: '햄버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bgr.png'),
    kcal: 0
  },
];