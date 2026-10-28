import { useRef, useLayoutEffect } from 'react';

const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const secondInputRef = useRef<HTMLInputElement | null>(null);
  const focusCountRef = useRef<number>(0);

  useLayoutEffect(() => {
    secondInputRef.current?.focus();
  }, []);

  const handleFocusFirst = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (document.activeElement === secondInputRef.current) {
      focusCountRef.current += 1;
      console.log(
        `Фокус-переход #${focusCountRef.current}: со второго поля на первое`
      );
    }

    firstInputRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input ref={firstInputRef} type="text" placeholder="Первое поле" />
      <input ref={secondInputRef} type="text" placeholder="Второе поле" />
      <button type="button" onPointerDown={handleFocusFirst}>
        Сфокусировать на первом
      </button>
    </div>
  );
};

export default FocusTracker;