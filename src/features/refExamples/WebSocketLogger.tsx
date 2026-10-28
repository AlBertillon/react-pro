import { useEffect, useRef, useState, type RefObject } from 'react';

const WebSocketLogger = () => {
  const socketRef: RefObject<WebSocket | null> = useRef(null);
  const [status, setStatus] = useState<string>('Подключение...');
  const isOpenedRef = useRef(false);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://echo.websocket.org');

    socketRef.current.onopen = () => {
      isOpenedRef.current = true;
      setStatus('Соединение установлено');
    };

    socketRef.current.onmessage = (event) => {
      console.log('WebSocket message:', event.data);
    };

    socketRef.current.onerror = () => {
      setStatus('Ошибка подключения');
    };

    socketRef.current.onclose = () => {
      if (isOpenedRef.current) {
        setStatus('Соединение закрыто');
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontWeight: 'bold' }}>Статус: {status}</span>
    </div>
  );
};

export default WebSocketLogger;