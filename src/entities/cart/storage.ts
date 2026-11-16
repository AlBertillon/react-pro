import type { CartItemWithProduct } from "./types";

export function getCartFromStorage(): CartItemWithProduct[] {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItemWithProduct[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}
