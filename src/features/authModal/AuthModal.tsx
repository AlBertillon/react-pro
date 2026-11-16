import { useActionState, useEffect, useRef, useState } from "react";

import { useAuthActions, useAuthModal } from "entities/auth";
import { Button, Input, Modal } from "shared/ui";

import "./AuthModal.css";

/** Результат отправки формы */
type FormState = {
  /** Успешна ли авторизация */
  success: boolean;
  /** Текст ошибки */
  error: string | null;
};

/** Модальное окно авторизации */
function AuthModal() {
  const { login, register } = useAuthActions();
  const { isOpen, message, close, triggerRef } = useAuthModal();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Ref для отслеживания успеха — сохраняется при unmount модалки
  const successRef = useRef(false);

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prevState: FormState, formData: FormData) => {
      const mode = formData.get("mode") as string;

      // Сохраняем значения полей на случай ошибки
      const values: Record<string, string> = {};
      formData.forEach((value, key) => {
        if (key !== "mode" && typeof value === "string") values[key] = value;
      });
      setFormValues(values);

      if (mode === "register") {
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;
        const avatarPath = (formData.get("avatarPath") as string) || undefined;
        const about = (formData.get("about") as string) || undefined;
        const phone = formData.get("phone") as string;

        try {
          await register({ email, name, password, avatarPath, about, phone });
          successRef.current = true;
          return { success: true, error: null };
        } catch (err) {
          return {
            success: false,
            error: err instanceof Error ? err.message : "Ошибка регистрации",
          };
        }
      }

      // Login mode
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        await login(email, password);
        successRef.current = true;
        return { success: true, error: null };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Ошибка авторизации",
        };
      }
    },
    { success: false, error: null },
  );

  const emailRef = useRef<HTMLInputElement>(null);

  // Закрытие модалки при успешной авторизации/регистрации
  useEffect(() => {
    if (successRef.current) {
      setFormValues({});
      successRef.current = false;
      close();
    }
  }, [close]);

  // Сброс флага успеха при открытии модалки
  useEffect(() => {
    if (isOpen) {
      successRef.current = false;
    }
  }, [isOpen]);

  const handleTabChange = (newTab: "login" | "register") => {
    setTab(newTab);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={tab === "login" ? "Вход в систему" : "Регистрация"}
      triggerRef={triggerRef}
    >
      {message && <div className="modal__message">{message}</div>}

      {/* Табы */}
      <div className="modal__tabs">
        <button
          type="button"
          className={`modal__tab ${tab === "login" ? "modal__tab--active" : ""}`}
          onClick={() => handleTabChange("login")}
        >
          Вход
        </button>
        <button
          type="button"
          className={`modal__tab ${tab === "register" ? "modal__tab--active" : ""}`}
          onClick={() => handleTabChange("register")}
        >
          Регистрация
        </button>
      </div>

      <form action={formAction} className="modal__form">
        <input type="hidden" name="mode" value={tab} />

        {state?.error && <div className="modal__error">{state.error}</div>}

        <div className="modal__field">
          <label className="modal__label" htmlFor="email">
            Email
          </label>
          <Input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            defaultValue={formValues.email}
          />
        </div>

        {tab === "register" && (
          <div className="modal__field">
            <label className="modal__label" htmlFor="name">
              Имя
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              required
              defaultValue={formValues.name}
            />
          </div>
        )}

        <div className="modal__field">
          <label className="modal__label" htmlFor="password">
            Пароль
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Минимум 6 символов"
            required
            minLength={6}
            defaultValue={formValues.password}
          />
        </div>

        {tab === "register" && (
          <>
            <div className="modal__field">
              <label className="modal__label" htmlFor="avatarPath">
                URL аватара
              </label>
              <Input
                id="avatarPath"
                name="avatarPath"
                type="text"
                placeholder="https://example.com/avatar.jpg"
                defaultValue={formValues.avatarPath}
              />
            </div>
            <div className="modal__field">
              <label className="modal__label" htmlFor="about">
                О себе
              </label>
              <textarea
                id="about"
                name="about"
                className="modal__textarea"
                placeholder="Расскажите о себе"
                rows={2}
                defaultValue={formValues.about}
              />
            </div>
            <div className="modal__field">
              <label className="modal__label" htmlFor="phone">
                Телефон
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+79999999999"
                required
                defaultValue={formValues.phone}
              />
            </div>
          </>
        )}

        <Button type="submit" variant="primary" fullWidth loading={isPending} text={tab === "login" ? "Войти" : "Зарегистрироваться"} />
      </form>
    </Modal>
  );
}

export default AuthModal;
