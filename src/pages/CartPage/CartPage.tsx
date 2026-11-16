import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCart } from "entities/cart";
import { usePurchased } from "entities/purchased";
import { Button } from "shared/ui";

import CartRow from "./CartRow";

import "./CartPage.css";

/** Страница корзины: товары, итого, очистка */
function CartPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { addPurchased } = usePurchased();
  const [isPurchased, setIsPurchased] = useState(false);

  const handleBackToCatalog = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleBuy = useCallback(() => {
    setIsPurchased(true);
    // Переносим товары в купленные
    items.forEach((item) => addPurchased(item.product));
    // Очищаем корзину и переходим на страницу купленных
    setTimeout(() => {
      clearCart();
      setIsPurchased(false);
      toast.success(`Куплено товаров: ${items.length}`);
      navigate("/purchased");
    }, 1500);
  }, [items, addPurchased, clearCart, navigate]);

  return (
    <>
      {items.length === 0 ? (
        <>
          <h1>Корзина</h1>
          <p className="cart__empty">Корзина пуста</p>
          <Button variant="primary" text="Вернуться к каталогу" className="cart__return-btn" onClick={handleBackToCatalog} />
        </>
      ) : (
        <>
          <div className="cart__header">
            <Link to="/" className="cart__back">
              ← Каталог
            </Link>
            <h1>Корзина</h1>
            <button className="cart__clear" onClick={clearCart}>
              Очистить
            </button>
          </div>

          <div className="cart__items">
            {items.map((item) => (
              <CartRow
                key={item.productId}
                product={item.product}
                quantity={item.quantity}
                productId={item.productId}
              />
            ))}
          </div>

          <div className="cart__footer">
            <div className="cart__total">
              <span className="cart__total-label">Итого:</span>
              <span className="cart__total-value">{Math.round(total)} ₽</span>
            </div>
            <Button
              variant="primary"
              text={isPurchased ? "Оформлено ✓" : "Купить"}
              onClick={handleBuy}
              loading={isPurchased}
            />
          </div>
        </>
      )}
    </>
  );
}

export default CartPage;
