import { memo, useCallback } from "react";

import type { Product } from "entities/product";
import CartItemCard from "entities/cartItem/CartItemCard";
import { useCart } from "entities/cart";
import { Counter } from "shared/ui";

import "./CartRow.css";

/** Свойства строки корзины */
interface CartRowProps {
  /** Товар */
  product: Product;
  /** Количество */
  quantity: number;
  /** ID товара */
  productId: string;
}

/** Строка корзины */
const CartRow = memo(function CartRow({
  product,
  quantity,
  productId,
}: CartRowProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = useCallback(() => {
    updateQuantity(productId, 1);
  }, [updateQuantity, productId]);

  const handleDecrement = useCallback(() => {
    updateQuantity(productId, -1);
  }, [updateQuantity, productId]);

  const handleRemove = useCallback(() => {
    removeFromCart(productId);
  }, [removeFromCart, productId]);

  return (
    <div className="cart-item">
      <CartItemCard product={product} />

      <div className="cart-item__controls">
        <Counter
          value={quantity}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          max={product.stock}
          showMax
        />
        <button
          type="button"
          className="cart-item__remove"
          onClick={handleRemove}
          aria-label="Удалить товар"
        >
          ✕
        </button>
      </div>
    </div>
  );
});

export default CartRow;
