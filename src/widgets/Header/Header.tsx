import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { Button, CartIcon, HeartIcon, PurchasedIcon } from "shared/ui";
import { useAuth, useAuthModal } from "entities/auth";
import { useCart } from "entities/cart";
import { useFavorites } from "entities/favorites";
import { usePurchased } from "entities/purchased";

import dogSvg from "shared/assets/dog.svg";
import userSvg from "shared/assets/user.svg";

import "./Header.css";

/** Шапка: логотип, корзина, избранное, профиль, вход */
const Header = memo(function Header() {
  const { user, isAuthenticated } = useAuth();
  const { items } = useCart();
  const { items: favorites } = useFavorites();
  const { items: purchased } = usePurchased();
  const { open: openAuthModal } = useAuthModal();

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const handleLoginClick = useCallback(() => {
    openAuthModal();
  }, [openAuthModal]);

  return (
    <header className="header">
      <img src={dogSvg} alt="DogFood" className="header__logo" />
      <span className="header__title">DogFood</span>
      <div className="header__actions">
        <Link to="/favorites" className="header__favorites" aria-label="Избранное">
          <HeartIcon />
          {favorites.length > 0 && (
            <span className="header__favorites-badge">{favorites.length}</span>
          )}
        </Link>
        <Link to="/cart" className="header__cart" aria-label="Корзина">
          <CartIcon />
          {cartCount > 0 && (
            <span className="header__cart-badge">{cartCount}</span>
          )}
        </Link>
        <Link to="/purchased" className="header__purchased" aria-label="Купленные товары">
          <PurchasedIcon />
          {purchased.length > 0 && (
            <span className="header__purchased-badge">{purchased.length}</span>
          )}
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/my-products" className="header__link">
              Мои товары
            </Link>
            <span className="header__user">{user?.email}</span>
            <Link to="/user" className="header__avatar" aria-label="Профиль">
              <img src={userSvg} alt="Профиль" className="header__avatar-img" />
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <Button variant="primary" text="Вход" onClick={handleLoginClick} />
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
