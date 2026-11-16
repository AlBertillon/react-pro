import type { PurchasedItem } from "./types";

const STORAGE_KEY = "purchased_items";

export function getPurchasedFromStorage(): PurchasedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePurchasedToStorage(items: PurchasedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    console.log("ERROR localStorage");
  }
}
