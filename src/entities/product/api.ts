import type { Category, Product, ProductsQuery, ProductsResponse, Review } from "./types";

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  images?: string;
  discount?: number;
  stock?: number;
  wight?: string;
  tags?: string[];
  isPublished?: boolean;
  categoryId: number;
}

const API_BASE = "https://api.v2.react-learning.ru";

export async function getProducts(query: ProductsQuery = {}, signal?: AbortSignal): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.append(key, String(value));
    }
  }

  const queryString = params.toString();
  const url = `${API_BASE}/products${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Не удалось загрузить продукты");
  }

  return response.json() as Promise<ProductsResponse>;
}

export async function getProductById(id: string, signal?: AbortSignal): Promise<Product> {
  const url = `${API_BASE}/products/${id}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Товар не найден");
  }

  return response.json() as Promise<Product>;
}

export async function createReview(
  productId: string,
  data: { rating: number; text: string }
): Promise<Review> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = token;

  const url = `${API_BASE}/reviews/leave/${productId}`;
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message?.[0] ?? `Ошибка: ${response.status}`;
    const error = new Error(message);
    (error as any).statusCode = response.status;
    throw error;
  }

  return response.json() as Promise<Review>;
}

export async function createProduct(data: CreateProductInput): Promise<Product> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = token;

  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message?.[0] ?? body?.message ?? `Ошибка: ${response.status}`;
    const error = new Error(message);
    (error as any).statusCode = response.status;
    throw error;
  }

  return response.json() as Promise<Product>;
}

export async function getCategories(): Promise<Category[]> {
  const url = `${API_BASE}/categories`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Не удалось загрузить категории");
  }

  return response.json() as Promise<Category[]>;
}
