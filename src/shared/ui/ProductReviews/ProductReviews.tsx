import { memo } from "react";

import "./ProductReviews.css";

import type { Review } from "entities/product";
import RatingStars from "./RatingStars";
import userSvg from "shared/assets/user.svg";

/** Свойства блока отзывов */
interface ProductReviewsProps {
  /** Массив отзывов */
  reviews: Review[] | null | undefined;
  /** Форма создания отзыва (рендерится для авторизованных) */
  children?: React.ReactNode;
}

/** Блок отзывов о товаре */
const ProductReviews = memo(function ProductReviews({ reviews, children }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="product-reviews">
        <h3 className="product-reviews__title">Отзывы</h3>
        <p className="product-reviews__empty">Отзывов пока нет</p>
        {children}
      </section>
    );
  }

  const sorted = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="product-reviews">
      <h3 className="product-reviews__title">Отзывы ({reviews.length})</h3>
      <div className="product-reviews__list">
        {sorted.map((review) => (
          <div key={review.id} className="product-reviews__item">
            <div className="product-reviews__header">
              <img
                src={review.user.avatarPath || userSvg}
                alt={review.user.name}
                className="product-reviews__avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = userSvg;
                }}
              />
              <div className="product-reviews__meta">
                <span className="product-reviews__name">{review.user.name}</span>
                <RatingStars rating={review.rating} />
              </div>
            </div>
            <p className="product-reviews__text">{review.text}</p>
            <span className="product-reviews__date">
              {new Date(review.createdAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>

      {children}
    </section>
  );
});

export default ProductReviews;
