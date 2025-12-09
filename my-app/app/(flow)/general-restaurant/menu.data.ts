import { ImageSourcePropType } from 'react-native';

// 카테고리 타입
export type CategoryId = 'kimbap' | 'rice' | 'noodle';

// 메뉴 아이템 타입
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  categoryId: CategoryId;
  spicy?: boolean;
  image: ImageSourcePropType;
}

// 메뉴 리스트
export const MENU_ITEMS: MenuItem[] = [
  // 김밥
  {
    id: 'k1',
    name: '기본 김밥',
    price: 3500,
    categoryId: 'kimbap',
    image: require('../../../assets/general-restaurant/kimbap-basic.jpg'),
  },
  {
    id: 'k2',
    name: '치즈 김밥',
    price: 3800,
    categoryId: 'kimbap',
    image: require('../../../assets/general-restaurant/kimbap-cheese.jpg'),
  },
  {
    id: 'k3',
    name: '참치 김밥',
    price: 4000,
    categoryId: 'kimbap',
    image: require('../../../assets/general-restaurant/kimbap-tuna.jpg'),
  },

  // 덮밥/밥
  {
    id: 'r1',
    name: '치킨마요 덮밥',
    price: 5200,
    categoryId: 'rice',
    image: require('../../../assets/general-restaurant/rice-chicken-mayo.jpg'),
  },
  {
    id: 'r2',
    name: '참치마요 덮밥',
    price: 5200,
    categoryId: 'rice',
    image: require('../../../assets/general-restaurant/rice-tuna-mayo.jpg'),
  },
  {
    id: 'r3',
    name: '제육 덮밥',
    price: 5000,
    categoryId: 'rice',
    spicy: true,
    image: require('../../../assets/general-restaurant/rice-pork.jpg'),
  },
  {
    id: 'r4',
    name: '새우튀김 덮밥',
    price: 4800,
    categoryId: 'rice',
    image: require('../../../assets/general-restaurant/rice-shrimp.jpg'),
  },

  // 면류
  {
    id: 'n1',
    name: '우동',
    price: 4000,
    categoryId: 'noodle',
    image: require('../../../assets/general-restaurant/noodle-udon.jpg'),
  },
  {
    id: 'n2',
    name: '비빔국수',
    price: 4800,
    categoryId: 'noodle',
    spicy: true,
    image: require('../../../assets/general-restaurant/noodle-spicy.jpg'),
  },
  {
    id: 'n3',
    name: '라면',
    price: 3500,
    categoryId: 'noodle',
    spicy: true,
    image: require('../../../assets/general-restaurant/noodle-ramen.jpg'),
  },
];

// 카테고리 목록
export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'kimbap', label: '김밥' },
  { id: 'rice', label: '덮밥·밥' },
  { id: 'noodle', label: '면류' },
];
