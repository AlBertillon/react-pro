import { Link } from "react-router-dom";

import { usePurchased } from "entities/purchased";
import { ProductCard } from "features/productCard";
import Button from "shared/ui/Button";

import "./PurchasedPage.css";

/** Страница купленных товаров */
const PurchasedPage = () => {
  const { items, clearPurchased } = usePurchased();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="purchased-page">
      <div className="purchased-page__header">
        <h1>Купленные товары</h1>
        {items.length > 0 && (
          <Button variant="primary" text="Очистить историю" onClick={clearPurchased} />
        )}
      </div>

      {items.length === 0 ? (
        <div className="purchased-page__empty">
          <p>Вы ещё ничего не покупали</p>
          <Link to="/">
            <Button variant="primary" text="Перейти в каталог" />
          </Link>
        </div>
      ) : (
        <>
          <Link to="/" className="purchased-page__back">
            ← Вернуться в каталог
          </Link>
          <div className="purchased-page__count">
            Куплено товаров: {items.length} ({totalQuantity} шт.)
          </div>
          <div className="products-grid">
            {items.map((item) => (
              <ProductCard
                key={item.productId}
                product={item.product}
                isPurchased
                quantity={item.quantity}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasedPage;
