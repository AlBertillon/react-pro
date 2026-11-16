import { memo } from "react";

import "./DiscountBadge.css";

/** Размер бейджа */
type DiscountBadgeSize = "small" | "medium" | "large";

/** Свойства бейджа скидки */
interface DiscountBadgeProps {
  /** Процент скидки */
  percent: number;
  /** Размер */
  size?: DiscountBadgeSize;
  /** Абсолютное позиционирование */
  absolute?: boolean;
}

/** Бейдж скидки */
const sizeMap: Record<DiscountBadgeSize, string> = {
  small: "small",
  medium: "medium",
  large: "large",
};

const DiscountBadge = memo(function DiscountBadge({ percent, size = "medium", absolute = false }: DiscountBadgeProps) {
  if (percent <= 0) return null;

  const sizeClass = sizeMap[size];
  const absoluteClass = absolute ? " discount-badge--absolute" : "";

  return (
    <span className={`discount-badge discount-badge--${sizeClass}${absoluteClass}`}>
      -{percent}%
    </span>
  );
});

export default DiscountBadge;
