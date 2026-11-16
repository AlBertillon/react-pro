import { useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";

import type { Product } from "entities/product";
import { AddToCartButton } from "features/addToCart";
import { FavoriteButton } from "features/favoriteButton";

import { DiscountBadge } from "shared/ui";

import "./ProductCard.css";

/** Свойства карточки товара */
interface ProductCardProps {
  /** Отображаемый товар */
  product: Product;
  /** Показывать как купленный (без кнопки "В корзину") */
  isPurchased?: boolean;
  /** Количество купленных (только для isPurchased) */
  quantity?: number;
}

/** Карточка товара в каталоге: кликабельная, со скидкой и избранным */
const ProductCard = memo(function ProductCard({ product, isPurchased = false, quantity = 0 }: ProductCardProps) {
  const navigate = useNavigate();

  const finalPrice = useMemo(() =>
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price
  , [product]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest(".product-card__counter") ||
      target.closest(".product-card__actions")
    ) {
      return;
    }
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
    >
      <div  className="product-card__image_conteiner">
        <img
          src={product.images}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      <DiscountBadge percent={product.discount} absolute/>

      <FavoriteButton product={product} absolute />

      <div className="product-card__body">
        <span className="product-card__category">{product.category?.name ?? "Без категории"}</span>

        <h3 className="product-card__title">{product.name}</h3>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-card__price_container">
            <div className="product-card__price">
              {product.discount > 0 && (
                <span className="product-card__old-price">{product.price} ₽</span>
              )}
              <span className="product-card__current-price">{finalPrice} ₽</span>
            </div>
              <span className={`product-card__stock ${product.stock <= 5 ? "product-card__stock--low" : ""}`}>
                {product.stock > 0
                  ? `В наличии: ${product.stock} шт.`
                  : "Нет в наличии"}
              </span>
          </div>
        </div>

        <div className="product-card__actions">
          {isPurchased ? (
            <span className="product-card__purchased">Куплено: {quantity} шт.</span>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
