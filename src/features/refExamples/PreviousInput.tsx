import type { FC, ChangeEvent } from 'react';
import { useRef, useEffect, useState } from 'react';

interface PreviousInputProps {
  placeholder?: string;
}

const PreviousInput: FC<PreviousInputProps> = ({ placeholder = 'Введите текст...' }) => {
  const previousValueRef = useRef<string | null>(null);
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    previousValueRef.current = currentValue || null;
  }, [currentValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const displayPrevious = previousValueRef.current ?? '—';

  return (
    <div style={{ width: '100%' }}>
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      />
      <p
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          margin: '8px 0 0',
        }}
      >
        Предыдущее значение: {displayPrevious}
      </p>
    </div>
  );
};

export default PreviousInput;