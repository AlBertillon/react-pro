import { memo } from "react";

import "./CartItemCard.css";

import type { Product } from "entities/product";
import { DiscountBadge } from "shared/ui";

/** Свойства карточки в корзине */
interface CartItemCardProps {
  /** Товар */
  product: Product;
}

/** Карточка товара в корзине: фото, название, цена, скидка */
const CartItemCard = memo(function CartItemCard({ product }: CartItemCardProps) {
  const finalPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <div className="cart-item-card">
      <img
        src={product.images}
        alt={product.name}
        className="cart-item-card__image"
      />
      <div className="cart-item-card__body">
        <h4 className="cart-item-card__title">{product.name}</h4>
        <p className="cart-item-card__description">{product.description}</p>
        <div className="cart-item-card__price_container">
          {product.discount > 0 && (
            <span className="cart-item-card__old-price">{product.price} ₽</span>
          )}
          <span className="cart-item-card__current-price">{finalPrice} ₽</span>
          {product.discount > 0 && (
            <DiscountBadge percent={product.discount} size="small" />
          )}
        </div>
      </div>
    </div>
  );
});

export default CartItemCard;
