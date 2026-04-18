import axios from '../lib/axios';
import type { Item } from '../types/item';
import type { Address } from '../types/address';

/** 購入に関するAPI */
export const getPurchaseData = async (itemId: string): Promise<{
  item: Item;
  user: Address;
}> => {
  const res = await axios.get(`/api/purchase/${itemId}`);
  return res.data;
};

export const postPurchase = async (payload: {
  item_id: number;
  payment_method: string;
  postal_code: string;
  address: string;
  building_name: string;
}) => {
  return axios.post('/api/purchase', payload);
};
