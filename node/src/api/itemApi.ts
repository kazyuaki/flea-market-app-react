import axios from "../lib/axios";
import type { Item } from '../types/item';

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
