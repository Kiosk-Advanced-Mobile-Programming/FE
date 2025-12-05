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
  setImage?: any;
  isNew?: boolean; // 신제품 여부 (선택사항)
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

// 4. 사이드 데이터 
export const SIDE_OPTIONS = [
  { id: 'fries', name: '후렌치 후라이 - 미디엄', price: 0, image: require('@assets/images/mcDonalds/menu/sides/french_fries_m.png') },
  { id: 'fries_large', name: '후렌치 후라이 - 라지', price: 700, image: require('@assets/images/mcDonalds/menu/sides/french_fries_l.png') },
  { id: 'coleslaw', name: '코울슬로', price: 0, image: require('@assets/images/mcDonalds/menu/sides/coleslaw.png') },
  { id: 'cheese_stick', name: '치즈스틱 2조각', price: 500, image: require('@assets/images/mcDonalds/menu/sides/g_moza_c_stick_2.png') },
];

// 5. ✨ [추가] 음료 데이터 (임의 구성)
export const DRINK_OPTIONS = [
  // { id: 'coke', name: '코카-콜라 - 미디엄', price: 0, image: require('@assets/images/drinks/coke.png') },
  // { id: 'coke_zero', name: '코카-콜라 제로 - 미디엄', price: 0, image: require('@assets/images/drinks/coke_zero.png') },
  // { id: 'sprite', name: '스프라이트 - 미디엄', price: 0, image: require('@assets/images/drinks/sprite.png') },
  // { id: 'fanta', name: '환타 - 미디엄', price: 0, image: require('@assets/images/drinks/fanta.png') },
  { id: 'americano', name: '아이스 아메리카노 - 미디엄', price: 500, image: require('@assets/images/mcDonalds/menu/mccafe/americano_m.png') }, // 추가금 예시
  { id: 'latte', name: '아이스 카페라떼 - 미디엄', price: 1000, image: require('@assets/images/mcDonalds/menu/mccafe/cafe_latte_m.png') },
];

// 6. 메뉴 데이터
export const MENU_ITEMS: Menu[] = [
  // --- 추천메뉴 ---
  {
    id: 1,
    category: 'recommend',
    name: '더블 쿼터파운더 치즈',
    price: 7400,
    image: require('@assets/images/mcDonalds/menu/burger/d_qtr_pnd.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/d_qtr_pnd_set.png'),
  },
  {
    id: 2,
    category: 'recommend',
    name: '맥윙 2조각',
    price: 3400,
    image: require('@assets/images/mcDonalds/menu/sides/mcwing_2.png'),
  },
  {
    id: 3,
    category: 'recommend',
    name: '치킨 모짜렐라 스낵랩',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/happy_snack/c_m_snack_wrap.png'),
  },
  {
    id: 4,
    category: 'recommend',
    name: '맥스파이시 상하이 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcspicy_shghi.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mcspicy_shghi_set.png'),
  },
  {
    id: 5,
    category: 'recommend',
    name: '쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/qtr_pnd.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/qtr_pnd_set.png'),
  },

  // ==== 맥런치 ====
  {
    id: 6,
    category: 'mclunch',
    name: '1955 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/1955bgr_set.png'),
  },
  {
    id: 7,
    category: 'mclunch',
    name: '빅맥 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/bigmac_set.png'),
  },
  {
    id: 8,
    category: 'mclunch',
    name: '베이컨 토마토 디럭스 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/btd_set.png'),
  },
  {
    id: 9,
    category: 'mclunch',
    name: '더블 불고기 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/d_bul_bgr_set.png'),
  },
  {
    id: 10,
    category: 'mclunch',
    name: '맥크리스피 디럭스 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/mccrispy_dlx_bgr_set.png'),
  },
  {
    id: 11,
    category: 'mclunch',
    name: '맥크리스피 디럭스 버거 세트',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/mclunch/mcspicy_shghi_set.png'),
  },
  // ====== 버거 ======
  {
    id: 12,
    category: 'burger',
    name: '빅맥',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bigmac.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/bigmac_set.png'),
  },
  {
    id: 13,
    category: 'burger',
    name: '맥스파이시 상하이 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcspicy_shghi.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mcspicy_shghi_set.png'),
  },
  {
    id: 15,
    category: 'burger',
    name: '1955 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/1955bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/1955bgr_set.png'),
  },
  {
    id: 16,
    category: 'burger',
    name: '더블 쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_qtr_pnd.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/d_qtr_pnd_set.png'),
  },
  {
    id: 17,
    category: 'burger',
    name: '쿼터파운더 치즈',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/qtr_pnd.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/qtr_pnd_set.png'),
  },
  {
    id: 18,
    category: 'burger',
    name: '맥크리스피 디럭스 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mccrispy_dlx_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mccrispy_dlx_bgr_set.png'),
  },
  {
    id: 19,
    category: 'burger',
    name: '맥크리스피 클래식 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mccrispy_clsc_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mccrispy_clsc_bgr_set.png'),
  },
  {
    id: 20,
    category: 'burger',
    name: '베이컨 토마토 디럭스',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/btd.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/btd_set.png'),
  },
  {
    id: 21,
    category: 'burger',
    name: '맥치킨 모짜렐라',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcchicken_moza.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mcchicken_moza_set.png'),

  },
  {
    id: 22,
    category: 'burger',
    name: '맥치킨',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/mcchicken.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/mcchicken_set.png'),
  },
  {
    id: 23,
    category: 'burger',
    name: '더블 불고기 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_bul_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/d_bul_bgr_set.png'),
  },
  {
    id: 24,
    category: 'burger',
    name: '불고기 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bul_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/bul_bgr_set.png'),
  },
  {
    id: 25,
    category: 'burger',
    name: '슈비 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/sbi_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/sbi_bgr_set.png'),
  },
  {
    id: 26,
    category: 'burger',
    name: '슈슈 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/shsh_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/shsh_bgr_set.png'),
  },
  {
    id: 27,
    category: 'burger',
    name: '토마토 치즈 비프 버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/t_c_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/t_c_bgr_set.png'),
  },
  {
    id: 28,
    category: 'burger',
    name: '트리플 치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/t_c_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/t_c_bgr_set.png'),
  },
  {
    id: 29,
    category: 'burger',
    name: '더블 치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/d_c_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/d_c_bgr_set.png'),
  },
  {
    id: 30,
    category: 'burger',
    name: '치즈버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/c_bgr.png'),
    setImage: require('@assets/images/mcDonalds/menu/burger_set/c_bgr_set.png'),
  },
  {
    id: 31,
    category: 'burger',
    name: '햄버거',
    price: 0,
    image: require('@assets/images/mcDonalds/menu/burger/bgr.png'),
  },
];