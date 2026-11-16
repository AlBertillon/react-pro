import { useFetch } from "shared/hooks/useFetch";
import { getProducts } from "entities/product";
import type { ProductsQuery, ProductsResponse } from "entities/product";

/** Хук загрузки товаров */
export function useProducts(query: ProductsQuery) {
  const { data, isLoading, error, refetch, reset } = useFetch<ProductsResponse>(
    (signal) => getProducts(query, signal),
    {
      deps: [query.page, query.searchTerm, query.minPrice, query.maxPrice, query.sort, query.categoryId, query.ratings],
    },
  );

  return {
    products: data?.products ?? [],
    totalCount: data?.length ?? 0,
    isLoading,
    error,
    refetch,
    reset,
  };
}
