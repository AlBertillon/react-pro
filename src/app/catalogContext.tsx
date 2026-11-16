import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "entities/product";

/** Значение контекста каталога */
interface CatalogContextValue {
  /** Товары */
  products: Product[];
  /** Установить товары */
  setProducts: (p: Product[]) => void;
  /** Общее количество товаров */
  totalCount: number;
  /** Установить общее количество */
  setTotalCount: (n: number) => void;
  /** Загружаются ли данные */
  isLoading: boolean;
  /** Установить статус загрузки */
  setIsLoading: (v: boolean) => void;
  /** Текст ошибки */
  error: string | null;
  /** Установить ошибку */
  setError: (e: string | null) => void;
}

const CatalogContext = createContext<CatalogContextValue>({
  products: [],
  setProducts: () => {},
  totalCount: 0,
  setTotalCount: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});

/** Хук каталога */
export function useCatalog() {
  return useContext(CatalogContext);
}

/** Провайдер каталога */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <CatalogContext.Provider value={{ products, setProducts, totalCount, setTotalCount, isLoading, setIsLoading, error, setError }}>
      {children}
    </CatalogContext.Provider>
  );
}
