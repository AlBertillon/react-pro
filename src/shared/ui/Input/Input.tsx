import { forwardRef, memo } from "react";

import "./Input.css";

/** Свойства поля ввода */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Флаг ошибки */
  error?: boolean;
  /** Подсказка под полем */
  hint?: string;
}

/** Поле ввода с поддержкой ошибки и подсказки */
const Input = memo(forwardRef<HTMLInputElement, InputProps>(({ error, hint, className = "", id, ...props }, ref) => {
  return (
    <div className={`input ${error ? "input--error" : ""} ${className}`}>
      <input className="input__field" ref={ref} id={id} {...props} />
      {hint && <span className="input__hint">{hint}</span>}
    </div>
  );
}));

export default Input;
