import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

import type { PurchasedItem } from "./types";
import type { Product } from "entities/product";
import { getPurchasedFromStorage, savePurchasedToStorage } from "./storage";

/** Значение контекста купленных товаров */
interface PurchasedContextValue {
  /** Купленные товары */
  items: PurchasedItem[];
  /** Добавить купленный товар */
  addPurchased: (product: Product) => void;
  /** Удалить купленный товар */
  removePurchased: (productId: string) => void;
  /** Очистить купленные */
  clearPurchased: () => void;
}

const PurchasedContext = createContext<PurchasedContextValue | null>(null);

/** Провайдер купленных товаров */
export function PurchasedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PurchasedItem[]>(() => {
    const stored = getPurchasedFromStorage();
    return stored;
  });

  useEffect(() => {
    savePurchasedToStorage(items);
  }, [items]);

  const addPurchased = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { productId: product.id, product, purchasedAt: new Date().toISOString(), quantity: 1 }];
      });
    },
    [],
  );

  const removePurchased = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearPurchased = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({ items, addPurchased, removePurchased, clearPurchased }),
    [items, addPurchased, removePurchased, clearPurchased],
  );

  return (
    <PurchasedContext.Provider value={value}>
      {children}
    </PurchasedContext.Provider>
  );
}

/** Хук купленных товаров. Требует PurchasedProvider */
export function usePurchased() {
  const context = useContext(PurchasedContext);
  if (!context) {
    throw new Error("usePurchased must be used within a PurchasedProvider");
  }
  return context;
}
