import { createContext } from "react";

import type { User } from "./types";

/** Данные авторизации */
export interface AuthContextValue {
  /** Авторизованный пользователь */
  user: User | null;
  /** Авторизован ли пользователь */
  isAuthenticated: boolean;
  /** Загружаются ли данные */
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/** Действия авторизации */
export interface AuthActionsValue {
  /** Выполнить вход */
  login: (email: string, password: string) => Promise<void>;
  /** Выполнить выход */
  logout: () => void;
  /** Зарегистрировать нового пользователя */
  register: (data: { email: string; name: string; password: string; avatarPath?: string; about?: string; phone: string }) => Promise<void>;
}

export const AuthActionsContext = createContext<AuthActionsValue | null>(null);
