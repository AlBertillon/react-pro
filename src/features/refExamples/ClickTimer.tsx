import type { FC } from 'react';
import { useRef } from 'react';

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

interface ClickTimerProps {
  onClick?: (clickCount: number, elapsedMs: number) => void;
  label?: string;
}

const ClickTimer: FC<ClickTimerProps> = ({ onClick, label = 'Click me' }) => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    const now = Date.now();

    if (clickDataRef.current.startTime === null) {
      clickDataRef.current.startTime = now;
      clickDataRef.current.clickCount = 1;
      return;
    }

    clickDataRef.current.clickCount += 1;
    const elapsedMs = now - clickDataRef.current.startTime;

    console.log(`Время: ${elapsedMs}ms, Клик: ${clickDataRef.current.clickCount}`);
    onClick?.(clickDataRef.current.clickCount, elapsedMs);
  };

  return <button type="button" onClick={handleClick}>{label}</button>;
};

export default ClickTimer; 