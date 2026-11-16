import { memo, useCallback } from "react";
import { toast } from "react-toastify";

import { useFavorites } from "entities/favorites";
import type { Product } from "entities/product";
import { HeartIcon } from "shared/ui";

import "./FavoriteButton.css";

/** Свойства кнопки избранного */
interface FavoriteButtonProps {
  /** Товар */
  product: Product;
  /** Абсолютное позиционирование */
  absolute?: boolean;
}

/** Кнопка избранного */
const FavoriteButton = memo(function FavoriteButton({ product, absolute = false }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const favorite = isFavorite(product.id);

  const absoluteClass = absolute ? " favorite-button--absolute" : "";

  const handleToggle = useCallback(() => {
    if (favorite) {
      removeFromFavorites(product.id);
      toast.info(`"${product.name}" удалён из избранного`);
    } else {
      addToFavorites(product);
      toast.success(`"${product.name}" добавлен в избранное`);
    }
  }, [favorite, addToFavorites, removeFromFavorites, product]);

  const label = favorite
    ? "Убрать из избранного"
    : "Добавить в избранное";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleToggle();
    },
    [handleToggle],
  );

  return (
    <button
      type="button"
      className={`favorite-button${absoluteClass} ${favorite ? "favorite-button--active" : ""}`}
      onClick={handleClick}
      aria-label={label}
    >
      <HeartIcon className="favorite-button__icon" />
    </button>
  );
});

export default FavoriteButton;
