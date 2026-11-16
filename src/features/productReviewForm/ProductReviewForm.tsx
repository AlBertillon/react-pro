import { useState, type FormEvent } from "react";

import { useAuthModal } from "entities/auth";
import { createReview } from "entities/product";
import RatingStars from "shared/ui/ProductReviews/RatingStars";
import { Button } from "shared/ui";

import "./ProductReviewForm.css";

/** Свойства формы отзыва */
interface ProductReviewFormProps {
  productId: string;
  onSuccess: (review: { id: string; rating: number; text: string; createdAt: string }) => void;
}

/** Форма создания отзыва к товару */
const ProductReviewForm = ({ productId, onSuccess }: ProductReviewFormProps) => {
  const { open: openAuthModal } = useAuthModal();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const validate = (): boolean => {
    if (rating < 1) {
      setError("Выберите оценку");
      return false;
    }
    if (!text.trim()) {
      setError("Напишите отзыв");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsPending(true);

    try {
      const review = await createReview(productId, { rating, text: text.trim() });
      setRating(0);
      setText("");
      onSuccess(review);
    } catch (err) {
      const statusCode = (err as any)?.statusCode;
      if (statusCode === 401) {
        openAuthModal("Для отправки отзыва необходимо авторизоваться");
      } else if (statusCode === 404) {
        setError("Товар не найден");
      } else {
        setError((err as Error).message || "Ошибка отправки отзыва");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="product-review-form" onSubmit={handleSubmit}>
      <h4 className="product-review-form__title">Оставить отзыв</h4>

      <div className="product-review-form__rating">
        <span className="product-review-form__label">Оценка:</span>
        <RatingStars rating={rating} interactive onRate={setRating} />
      </div>

      <div className="product-review-form__field">
        <textarea
          className="product-review-form__input"
          placeholder="Ваш отзыв"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          rows={3}
        />
      </div>

      {error && <p className="product-review-form__error">{error}</p>}

      <Button type="submit" loading={isPending} disabled={isPending}>
        Отправить
      </Button>
    </form>
  );
};

export default ProductReviewForm;
