import type { Product } from "entities/product";

/** Запись купленного товара */
export interface PurchasedItem {
  /** ID товара */
  productId: string;
  /** Объект товара */
  product: Product;
  /** Дата покупки */
  purchasedAt: string;
  /** Количество купленных */
  quantity: number;
}
