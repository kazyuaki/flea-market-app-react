import axios from "../lib/axios";
import type { Item } from '../types/item';

/**
 * 商品一覧取得
 */
export const fetchItems = async (tab: string): Promise<Item[]> => {
  const res = await axios.get(`/api/items?tab=${tab}`);
  return res.data.data;
};

/**
 * 商品詳細取得
 */
export const fetchItemDetail = async (id: string): Promise<Item> => {
  const res = await axios.get(`/api/items/${id}`);
  return res.data.data;
};
