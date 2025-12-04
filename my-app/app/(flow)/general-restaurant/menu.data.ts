// menu.data.ts
export type CategoryId = 'kimbap' | 'rice' | 'noodle';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  categoryId: CategoryId;
  spicy?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // 김밥
  { id: 'k1', name: '기본 김밥', price: 3500, categoryId: 'kimbap' },
  { id: 'k2', name: '치즈 김밥', price: 3800, categoryId: 'kimbap' },
  { id: 'k3', name: '참치 김밥', price: 4000, categoryId: 'kimbap' },

  // 덮밥/밥
  { id: 'r1', name: '치킨마요 덮밥', price: 5200, categoryId: 'rice' },
  { id: 'r2', name: '참치마요 덮밥', price: 5200, categoryId: 'rice' },
  { id: 'r3', name: '제육 덮밥', price: 5000, categoryId: 'rice', spicy: true },
  { id: 'r4', name: '새우튀김 덮밥', price: 4800, categoryId: 'rice' },

  // 면류
  { id: 'n1', name: '우동', price: 4000, categoryId: 'noodle' },
  {
    id: 'n2',
    name: '비빔국수',
    price: 4800,
    categoryId: 'noodle',
    spicy: true,
  },
  { id: 'n3', name: '라면', price: 3500, categoryId: 'noodle', spicy: true },
];

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'kimbap', label: '김밥' },
  { id: 'rice', label: '덮밥·밥' },
  { id: 'noodle', label: '면류' },
];
