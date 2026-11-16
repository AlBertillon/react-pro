import type { Product } from "entities/product";

/** Запись избранного */
export interface FavoriteItem {
  /** ID товара */
  productId: string;
  /** Объект товара */
  product: Product;
}
