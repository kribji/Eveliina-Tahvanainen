'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

type CartItem = {
  id: string;
  merchandiseId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  productPath?: string;
  selectedColor?: string;
};
type ProductWithCartFields = Product & {
  price?: number;
  merchandiseId?: string;
  productPath?: string;
  selectedColor?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: ProductWithCartFields, quantity?: number) => void;
  removeFromCart: (merchandiseId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'ev-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;

      if (!Array.isArray(parsed)) return [];

      // ✅ Drop any legacy items that don't have a merchandiseId (old carts)
      return parsed.filter((i: any) => i && typeof i.merchandiseId === 'string');
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write errors (private mode etc.)
    }
  }, [items]);

  const addToCart = (product: ProductWithCartFields, quantity = 1) => {
    const price = typeof product.price === 'number' ? product.price : 0;
    const merchandiseId = product.merchandiseId;

    // ✅ Hard requirement for Shopify checkout
    if (!merchandiseId) {
      console.error('addToCart: missing merchandiseId (variant id). Product:', product);
      return;
    }

    setItems((prev) => {
      // ✅ Uniqueness should be by variant, not product id
      const existing = prev.find((item) => item.merchandiseId === merchandiseId);

      if (existing) {
        return prev.map((item) =>
          item.merchandiseId === merchandiseId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

return [
  ...prev,
  {
    id: product.id,
    merchandiseId,
    slug: product.slug,
    title: product.title,
    price,
    quantity,
    image: product.image,
    productPath: product.productPath,
    selectedColor: product.selectedColor,
  },
];
    });

    setIsOpen(true);
  };

  // ✅ Remove by variant id (merchandiseId)
  const removeFromCart = (merchandiseId: string) => {
    setItems((prev) => prev.filter((item) => item.merchandiseId !== merchandiseId));
  };

  const clearCart = () => setItems([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((open) => !open);

  const { itemCount, total } = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, total };
  }, [items]);

  const value: CartContextValue = {
    items,
    itemCount,
    total,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
