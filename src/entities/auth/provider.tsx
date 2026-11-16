import { useCallback, useEffect, useMemo, useState } from "react";

import { login as apiLogin, me, registerUser as apiRegisterUser } from "./api";
import { AuthActionsContext, AuthContext } from "./context";
import type { User } from "./types";

const TOKEN_KEY = "auth_token";

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    console.log('ERROR!')
  }
}

function removeToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    console.log('ERROR!')
  }
}

/** Свойства провайдера авторизации */
interface AuthProviderProps {
  /** Дочерние компоненты */
  children: React.ReactNode;
}

/** Провайдер авторизации */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();

    if (token) {
      me(token).then((userData) => {
        if (cancelled) return;

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          removeToken();
          setUser(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: userData, accessToken } = await apiLogin(email, password);
    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const register = useCallback(
    async (data: { email: string; name: string; password: string; avatarPath?: string; about?: string; phone: string }) => {
      const { user: userData, accessToken } = await apiRegisterUser(data);
      setToken(accessToken);
      setUser(userData);
      setIsAuthenticated(true);
    },
    [],
  );

  const authValue = useMemo(
    () => ({ user, isAuthenticated, isLoading }),
    [user, isAuthenticated, isLoading],
  );

  const actionsValue = useMemo(
    () => ({ login, logout, register }),
    [login, logout, register],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <AuthActionsContext.Provider value={actionsValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}
