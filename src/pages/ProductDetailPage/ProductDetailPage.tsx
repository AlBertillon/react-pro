import { useLoaderData, Link } from "react-router-dom";
import { useMemo, useState, useCallback } from "react";

import { getProductById, type Product } from "entities/product";
import { AddToCartButton } from "features/addToCart";
import { DiscountBadge, ProductReviews } from "shared/ui";
import { FavoriteButton } from "features/favoriteButton";
import { useAuth } from "entities/auth";
import { ProductReviewForm } from "features/productReviewForm";

import "./ProductDetailPage.css";

/** Загрузка товара по ID */
export async function productLoader(id: string) {
  try {
    const product = await getProductById(id);
    return { product, error: null };
  } catch (err) {
    return { product: null, error: err instanceof Error ? err.message : "Ошибка загрузки" };
  }
}

/** Детальная страница товара */
const ProductDetailPage = () => {
  const { product, error } = useLoaderData() as { product: Product; error: string | null };
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Product["reviews"]>(product?.reviews ?? []);

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>Товар не найден</h2>
        <Link to="/">Вернуться в каталог</Link>
      </div>
    );
  }

  const finalPrice = useMemo(() =>
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price
  , [product]);

  const handleReviewSuccess = useCallback(async () => {
    try {
      const refreshed = await getProductById(product.id);
      setReviews(refreshed.reviews);
    } catch {
      // ignore — product page still works
    }
  }, [product.id]);

  return (
    <>
      <Link to="/" className="product-detail__back">← Вернуться в каталог</Link>

      <div className="product-detail">
        <div className="product-detail__gallery">
          <img
            src={product.images}
            alt={product.name}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__info">
          <div className="product-detail__info_header">
            <span className="product-detail__category">{product.category?.name ?? "Без категории"}</span>
            <FavoriteButton product={product} />
          </div>
          <h1 className="product-detail__title">{product.name}</h1>
          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__price-block">
            <div className="product-detail__price">
              {product.discount > 0 && (
                <span className="product-detail__old-price">{product.price} ₽</span>
              )}
              <span className="product-detail__current-price">{finalPrice} ₽</span>
                <DiscountBadge percent={product.discount} size="large" />
            </div>

            <span className={`product-detail__stock ${product.stock <= 5 ? "product-detail__stock--low" : ""}`}>
              {product.stock > 0
                ? `В наличии: ${product.stock} шт.`
                : "Нет в наличии"}
            </span>

            {product.wight && (
              <span className="product-detail__weight">Вес: {product.wight}</span>
            )}
          </div>

          {product.tags.length > 0 && (
            <div className="product-detail__tags">
              {product.tags.map((tag: string) => (
                <span key={tag} className="product-detail__tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="product-detail__actions">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <ProductReviews reviews={reviews}>
        {isAuthenticated && (
          <ProductReviewForm productId={product.id} onSuccess={handleReviewSuccess} />
        )}
      </ProductReviews>
    </>
  );
};

export default ProductDetailPage;
