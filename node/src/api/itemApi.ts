import axios from "../lib/axios";
import type { Item, ItemForm } from '../types/item';
import { buildFormData } from "../utils/form/formData";

/**
 * 商品一覧取得
 */
export const fetchItems = async (keyword?: string): Promise<Item[]> => {
  const res = await axios.get(`/api/items`, {
    params: { keyword: keyword || undefined },
  });
  return res.data.items ?? [];
};

/**
 * 商品詳細取得
 */
export const fetchItemDetail = async (id: string): Promise<Item> => {
  const res = await axios.get(`/api/items/${id}`);
  return res.data.data;
};

/**
 * 出品した商品の更新
 */
export const updateItem = async (
  id: string,
  form: ItemForm,
): Promise<Item> => {
  const formData = buildFormData(form);
  const res = await axios.post(`/api/items/${id}`, formData);
  return res.data.data;
};

/**
 * 出品した商品の取り下げ
 */
export const withdrawItem = async (id: string): Promise<Item> => {
  const res = await axios.post(`/api/items/${id}/withdraw`);
  return res.data.data;
};
