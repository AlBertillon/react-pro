import { forwardRef, memo } from "react";

import "./Button.css";

import Loader from "../Loader/Loader";

/** Параметры кнопки */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Стиль: primary / secondary / ghost */
  variant?: "primary" | "secondary" | "ghost";
  /** Растянуть на всю ширину */
  fullWidth?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст (если нет children) */
  text?: string;
  /** Внутреннее содержимое */
  children?: React.ReactNode;
}

/** Кнопка с вариантами, загрузкой и forwardRef */
const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = "primary", fullWidth = false, loading = false, className = "", text, disabled, children, ...props }: ButtonProps, ref) {
  const classes = ["button", `button-${variant}`, fullWidth && "button-full", className].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      className={classes}
      type="button"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader size={16} /> : text ?? children}
    </button>
  );
}));

export default Button;
