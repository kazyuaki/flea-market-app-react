import type { ItemForm } from "../../types/item";

export const createInitialTouched = (): Record<keyof ItemForm, boolean> => ({
  name: false,
  brand: false,
  description: false,
  price: false,
  category_ids: false,
  condition: false,
  images: false,
});
