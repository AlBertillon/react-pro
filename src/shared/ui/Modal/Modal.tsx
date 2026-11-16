import { useEffect, useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

/** Свойства модального окна */
interface ModalProps {
  /** Открыто ли окно */
  isOpen: boolean;
  /** Обработчик закрытия */
  onClose: () => void;
  /** Заголовок */
  title?: string;
  /** Содержимое окна */
  children: ReactNode;
  /** Ref на элемент, который был в фокусе до открытия */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/** Селекторы фокусируемых элементов внутри модалки */
const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Модальное окно */
function Modal({ isOpen, onClose, title, children, triggerRef }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const trigger = triggerRef ?? useRef<HTMLElement | null>(null);
  const prevOverflow = useRef("");
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  // Фокус: запоминаем триггер + фокусируем крестик при открытии, возвращаем при закрытии
  useLayoutEffect(() => {
    if (isOpen) {
      if (!triggerRef) trigger.current = document.activeElement as HTMLElement;
      closeRef.current?.focus();
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return;
    }
    if (trigger.current && trigger.current !== document.body) trigger.current.focus();
    if (!triggerRef) trigger.current = null;
    document.body.style.overflow = prevOverflow.current;
  }, [isOpen, triggerRef, trigger]);

  // ESC + фокус-трап
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onCloseRef.current();
      if (e.key !== "Tab") return;
      const items = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCloseRef.current();
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined}>
        <button ref={closeRef} className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">✕</button>
        {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") ?? document.body,
  );
}

export default Modal;