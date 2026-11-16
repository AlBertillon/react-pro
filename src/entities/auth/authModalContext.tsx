import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  type RefObject,
  type ReactNode,
} from "react";

/** Значение контекста модалки авторизации */
interface AuthModalContextValue {
  /** Открыто ли окно */
  isOpen: boolean;
  /** Сообщение внутри окна */
  message: string | null;
  /** Открыть окно */
  open: (message?: string) => void;
  /** Закрыть окно */
  close: () => void;
  /** Ref на элемент-триггер */
  triggerRef: RefObject<HTMLElement | null>;
}

export const AuthModalContext = createContext<AuthModalContextValue | null>(null);

/** Хук модалки авторизации. Требует AuthModalProvider */
export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal можно использовать только внутри AuthModalProvider");
  }

  return context;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Глобальный mousedown — срабатывает ДО изменения document.activeElement
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      previousFocusRef.current = e.target as HTMLElement;
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const open = useCallback(
    (msg?: string) => {
      setMessage(msg ?? null);
      setIsOpen(true);
    },
    [],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setMessage(null);
  }, []);

  return (
    <AuthModalContext.Provider value={{ isOpen, message, open, close, triggerRef }}>
      {children}
    </AuthModalContext.Provider>
  );
}
