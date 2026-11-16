import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

import type { CartItemWithProduct } from "./types";
import type { Product } from "entities/product";
import { getCartFromStorage, saveCartToStorage } from "./storage";

/** Значение контекста корзины */
interface CartContextValue {
  /** Товары в корзине */
  items: CartItemWithProduct[];
  /** Общая сумма */
  total: number;
  /** Добавить товар */
  addToCart: (product: Product, quantity?: number) => void;
  /** Изменить количество (delta > 0 добавить, < 0 убрать) */
  updateQuantity: (productId: string, delta: number) => void;
  /** Удалить товар */
  removeFromCart: (productId: string) => void;
  /** Очистить корзину */
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Провайдер корзины */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithProduct[]>(() => {
    const stored = getCartFromStorage();
    return stored;
  });

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const mutateQuantity = useCallback((productId: string, delta: number, product?: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing) {
        return product && delta > 0
          ? [...prev, { productId, product, quantity: delta }]
          : prev;
      }
      return prev
        .map((item) => item.productId === productId ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => mutateQuantity(product.id, quantity, product),
    [mutateQuantity],
  );

  const updateQuantity = useCallback(
    (productId: string, delta: number) => mutateQuantity(productId, delta),
    [mutateQuantity],
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item.product.discount > 0
          ? item.product.price * (1 - item.product.discount / 100)
          : item.product.price;
        return sum + price * item.quantity;
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, total, addToCart, updateQuantity, removeFromCart, clearCart }),
    [items, total, addToCart, updateQuantity, removeFromCart, clearCart],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/** Хук корзины. Требует CartProvider */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
