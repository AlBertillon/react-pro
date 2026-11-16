import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { getUserWithProducts, useAuth } from "entities/auth";
import { ProductCard } from "features/productCard";
import { Pagination } from "shared/ui";
import Button from "shared/ui/Button";
import Loader from "shared/ui/Loader";

import "./MyProductsPage.css";

const PER_PAGE = 9;
const STORAGE_KEY = "myproducts_state";

function getStoredPage(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : 1;
  } catch {
    return 1;
  }
}

function storePage(page: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(page));
  } catch {
    console.log("ERROR localStorage");
  }
}

/** Страница продуктов пользователя */
const MyProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(getStoredPage);

  const fetchProducts = useCallback(async () => {
    if (!user) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Необходима авторизация");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserWithProducts(token);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    storePage(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return products.slice(start, start + PER_PAGE);
  }, [products, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (isLoading) {
    return (
      <div className="my-products-page">
        <h1>Мои товары</h1>
        <div className="my-products-page__loader">
          <Loader size={32} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-products-page">
        <h1>Мои товары</h1>
        <p className="my-products-page__error">{error}</p>
        <Link to="/">
          <Button variant="primary" text="Вернуться в каталог" />
        </Link>
      </div>
    );
  }

  return (
    <div className="my-products-page">
      <div className="my-products-page__header">
        <h1>Мои товары</h1>
        <Link to="/products/create">
          <Button variant="primary" text="Добавить товар" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="my-products-page__empty">
          <p>У вас пока нет товаров</p>
          <Link to="/products/create">
            <Button variant="primary" text="Создать первый товар" />
          </Link>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyProductsPage;
