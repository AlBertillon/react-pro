import { Link } from "react-router-dom";

import { useFavorites } from "entities/favorites";
import { ProductCard } from "features/productCard";

import "./FavoritesPage.css";
import { Button } from "shared/ui";

/** Страница избранного */
function FavoritesPage() {
  const { items } = useFavorites();

  return (
    <>
      <div className="favorites__header">
        <h1>Избранное</h1>
      </div>
      {items.length ? 
      <Link to="/" className="favorites__back">
        ← Вернуться в каталог
      </Link> 
        : null
      }

      {items.length === 0 ? (
        <div className="favorites__empty">
          <p>В избранном пока пусто</p>
          <Link to="/">
            <Button variant="primary" text="Вернуться в каталог" />
          </Link>
        </div>
      ) : (
        <>
          <div className="favorites__count">
            В избранном: {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
          </div>
          <div className="products-grid">
            {items.map((item) => (
              <ProductCard key={item.productId} product={item.product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default FavoritesPage;
