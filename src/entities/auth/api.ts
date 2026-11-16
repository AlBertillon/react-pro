import type { AuthError, User } from "./types";
import type { Product } from "entities/product";

const API_BASE = "https://api.v2.react-learning.ru";

export async function login(email: string, password: string): Promise<{ user: User; accessToken: string }> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json().catch(() => ({
      statusCode: response.status,
      message: ["Ошибка входа"],
      error: "",
    }));
    const msg = Array.isArray(error.message) ? error.message[0] : error.message;
    throw new Error(msg ?? "Ошибка входа");
  }

  return response.json() as Promise<{ user: User; accessToken: string }>;
}

export async function me(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: token },
    });

    if (!response.ok) return null;

    return response.json() as Promise<User>;
  } catch {
    return null;
  }
}

export async function getUserById(idOrEmail: string, token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/users/${idOrEmail}`, {
      headers: { Authorization: token },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Необходима авторизация");
      }
      if (response.status === 404) {
        throw new Error("Пользователь не найден");
      }
      return null;
    }

    return response.json() as Promise<User>;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Ошибка загрузки данных пользователя");
  }
}

/** Интерфейс лайка с вложенным продуктом */
interface LikeWithProduct {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

/** Данные пользователя с продуктами (расширенный интерфейс) */
interface UserWithProductsData {
  id: string;
  email: string;
  name?: string;
  avatarPath?: string;
  about?: string;
  phone?: string;
  roles?: string[];
  favoritesPost?: string[];
  likes?: LikeWithProduct[];
}

/** Получение продуктов пользователя через /users/me */
export async function getUserWithProducts(token: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: token },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Необходима авторизация");
    }
    throw new Error("Не удалось загрузить продукты");
  }

  const data = await response.json() as UserWithProductsData;
  return data.likes?.map((like) => like.product) ?? [];
}

/** Регистрация нового пользователя */
export async function registerUser(data: {
  email: string;
  name: string;
  password: string;
  avatarPath?: string;
  about?: string;
  phone: string;
}): Promise<{ user: User; accessToken: string }> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, roles: ["USER"] }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json().catch(() => ({
      statusCode: response.status,
      message: ["Ошибка регистрации"],
      error: "",
    }));
    const msg = Array.isArray(error.message) ? error.message[0] : error.message;

    if (response.status === 409) {
      throw new Error(msg ?? "Пользователь с таким email уже существует");
    }
    if (response.status === 400) {
      throw new Error(msg ?? "Неверные данные");
    }
    throw new Error(msg ?? "Ошибка регистрации");
  }

  return response.json() as Promise<{ user: User; accessToken: string }>;
}
