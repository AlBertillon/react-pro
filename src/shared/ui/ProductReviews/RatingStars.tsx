import { memo } from "react";

/** Свойства звёздного рейтинга */
interface RatingStarsProps {
  /** Оценка от 1 до 5 */
  rating: number;
  /** Интерактивный режим: кликабельные звёзды */
  interactive?: boolean;
  /** Обработчик выбора рейтинга */
  onRate?: (rating: number) => void;
}

/** Звёздный рейтинг от 1 до 5 */
const RatingStars = memo(function RatingStars({ rating, interactive = false, onRate }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className="rating-stars" aria-label={`Оценка: ${clamped} из 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < clamped;
        const star = (
          <span
            key={i}
            className={`rating-stars__star rating-stars__star--${filled ? "filled" : "empty"}`}
          >
            {filled ? "★" : "☆"}
          </span>
        );

        if (!interactive) return star;

        return (
          <span
            key={i}
            className={`rating-stars__star rating-stars__star--${filled ? "filled" : "empty"} rating-stars__star--clickable`}
            onClick={(e) => {
              e.stopPropagation();
              onRate?.(i + 1);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onRate?.(i + 1);
              }
            }}
          >
            {filled ? "★" : "☆"}
          </span>
        );
      })}
    </span>
  );
});

export default RatingStars;
