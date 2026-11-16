import { useEffect, useState, useCallback } from "react";

import ProductFilters from "widgets/ProductFilters/ProductFilters";
import { Pagination } from "shared/ui";
import { ProductCard } from "features/productCard";
import { useProducts } from "shared/hooks/useProducts";
import type { ProductsQuery } from "entities/product";

import "./CatalogPage.css";

const PER_PAGE = 9;
const STORAGE_KEY = "catalog_state";

function getStoredQuery(): Partial<ProductsQuery> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeQuery(query: ProductsQuery) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(query));
  } catch {
    console.log('ERROR localStorage')
  }
}

/** Каталог товаров */
function CatalogPage() {
  const [query, setQuery] = useState<ProductsQuery>(() => {
    const stored = getStoredQuery();
    return {
      perPage: PER_PAGE,
      page: 1,
      ...stored,
    };
  });

  const { products, totalCount, isLoading, error } = useProducts(query);

  useEffect(() => {
    storeQuery(query);
  }, [query]);

  const handleFilterChange = useCallback((newQuery: ProductsQuery) => {
    setQuery({ ...newQuery, page: 1 });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setQuery((prev: ProductsQuery) => ({ ...prev, page }));
  }, []);

  const totalPages = Math.ceil(totalCount / (query.perPage ?? PER_PAGE));

  return (
    <>
      <h1 style={{marginTop: '20px'}}>Каталог</h1>

      <ProductFilters query={query} onChange={handleFilterChange} />

      <div className="page__content-inner">
        {isLoading && <p>Загрузка...</p>}
        {error && <p className="page__error">{error.message}</p>}

        {!isLoading && !error && products.length === 0 && (
          <p className="page__empty">Товары не найдены</p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination currentPage={query.page ?? 1} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CatalogPage;
