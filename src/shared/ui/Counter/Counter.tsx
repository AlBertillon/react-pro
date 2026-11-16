import { memo } from "react";

import "./Counter.css";

/** Свойства счётчика */
interface CounterProps {
  /** Текущее значение */
  value: number;
  /** Обработчик нажатия «+» */
  onIncrement: () => void;
  /** Обработчик нажатия «−» */
  onDecrement: () => void;
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Показывать максимальное значение рядом */
  showMax?: boolean;
}

/** Счётчик количества с кнопками +/− */
const Counter = memo(function Counter({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = Infinity,
  showMax = false,
}: CounterProps) {
  return (
    <div className="counter">
      <button
        className="counter__button counter__button--minus"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Уменьшить"
      >
        −
      </button>
      <div className="counter__value-wrapper">
        <span className="counter__value" aria-live="polite">
          {value}
        </span>
        {showMax && max !== Infinity && (
          <span className="counter__max">/{max}</span>
        )}
      </div>
      <button
        className="counter__button counter__button--plus"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Увеличить"
      >
        +
      </button>
    </div>
  );
});

export default Counter;
