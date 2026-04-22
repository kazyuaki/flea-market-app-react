import type { ItemForm } from "../types/ItemForm";

export const createInitialTouched = (): Record<keyof ItemForm, boolean> => ({
  name: false,
  brand: false,
  description: false,
  price: false,
  category_ids: false,
  condition: false,
  images: false,
});