import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

import type { FavoriteItem } from "./types";
import type { Product } from "entities/product";
import { getFavoritesFromStorage, saveFavoritesToStorage } from "./storage";

/** Значение контекста избранного */
interface FavoritesContextValue {
  /** Избранные товары */
  items: FavoriteItem[];
  /** Проверить, является ли товар избранным */
  isFavorite: (productId: string) => boolean;
  /** Добавить в избранное */
  addToFavorites: (product: Product) => void;
  /** Удалить из избранного */
  removeFromFavorites: (productId: string) => void;
  /** Очистить избранное */
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/** Провайдер избранного */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>(getFavoritesFromStorage);

  useEffect(() => {
    saveFavoritesToStorage(items);
  }, [items]);

  const addToFavorites = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((i) => i.productId === product.id)
        ? prev
        : [...prev, { productId: product.id, product }],
    );
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearFavorites = useCallback(() => setItems([]), []);

  const isFavorite = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items],
  );

  const value = useMemo(
    () => ({ items, isFavorite, addToFavorites, removeFromFavorites, clearFavorites }),
    [items, isFavorite, addToFavorites, removeFromFavorites, clearFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

/** Хук избранного. Требует FavoritesProvider */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}