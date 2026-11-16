import { useCallback, useMemo } from "react";

import type { Product } from "entities/product";
import { useCart } from "entities/cart";
import { useAuth, useAuthModal } from "entities/auth";
import Button from "shared/ui/Button";
import Counter from "shared/ui/Counter";

/** Свойства кнопки в корзину */
interface AddToCartButtonProps {
  /** Товар */
  product: Product;
}

/** Кнопка добавления в корзину */
export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { items, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { open: openAuthModal } = useAuthModal();

  const count = useMemo(
    () => items.find((item) => item.productId === product.id)?.quantity ?? 0,
    [items, product.id],
  );

  const handleMinus = useCallback(() => {
    addToCart(product, -1);
  }, [addToCart, product]);

  const handleAddClick = useCallback(() => {
    if (!isAuthenticated) {
      openAuthModal("Для добавления в корзину необходимо авторизоваться");
      return;
    }
    if (count < product.stock) {
      addToCart(product, 1);
    }
  }, [isAuthenticated, openAuthModal, count, product.stock, addToCart, product]);

  if (count === 0) {
    return (
      <Button
        onClick={handleAddClick}
        disabled={product.stock === 0}
        text="В корзину"
      />
    );
  }

  return (
    <Counter
      value={count}
      onDecrement={handleMinus}
      onIncrement={handleAddClick}
      max={product.stock}
      showMax
    />
  );
}
