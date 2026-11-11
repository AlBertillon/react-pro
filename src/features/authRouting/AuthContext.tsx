import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "auth_token";
const API_BASE = "https://api.v2.react-learning.ru";

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

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
    console.log('ERROR')
  }
}

function removeToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    console.log('ERROR')
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = useCallback(async (token: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE}/users/me`, {
        method: "GET",
        headers: { Authorization: token },
      });

      if (!response.ok) {
        return null;
      }

      const data: User = await response.json();
      return data;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();

    if (token) {
      validateToken(token).then((userData) => {
        if (cancelled) return;

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token invalid — clean up
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
  }, [validateToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Ошибка входа" }));
        throw new Error(error.message?.[0] || error.message || "Ошибка входа");
      }

      const data: AuthResponse = await response.json();
      setToken(data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
    },
    [],
  );

  const logout = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "GET",
          headers: { Authorization: token },
        });
      } catch {
        console.log('ERROR')
      }
    }
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, logout }),
    [user, isAuthenticated, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}