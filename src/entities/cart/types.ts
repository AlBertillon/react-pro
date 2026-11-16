import type { Product } from "entities/product";

/** Запись корзины */
export interface CartItem {
  /** ID товара */
  productId: string;
  /** Количество */
  quantity: number;
}

/** Запись корзины с товаром */
export interface CartItemWithProduct extends CartItem {
  /** Объект товара */
  product: Product;
}
