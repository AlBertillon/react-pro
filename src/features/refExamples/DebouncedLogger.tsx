import { useRef } from 'react';

const DebouncedLogger = () => {
  const timerRef = useRef<number | null>(null);

  const handleInput = (e: React.InputEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log(`Debounced value: ${value}`);
    }, 1000);
  };

  return (
    <input
      type="text"
      placeholder="Введите текст..."
      onInput={handleInput}
      style={{ width: '100%' }}
    />
  );
};

export default DebouncedLogger;