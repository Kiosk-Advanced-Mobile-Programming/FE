import React, { createContext, useContext, useState } from 'react';
import { Menu } from './menu.data';

export type CartItem = {
  menu: Menu;
  setType: { id: string; name: string; priceAdd: number; label: string };
  side: { id: string; name: string; price: number };
  drink: { id: string; name: string; price: number };
  quantity: number;
  totalPrice: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const clearCart = () => setItems([]);

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}