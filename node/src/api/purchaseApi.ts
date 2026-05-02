import axios from "../lib/axios";
import type { Item } from "../types/item";
import type { Address } from "../types/address";

/** 購入に関するAPI */
export const getPurchaseData = async (
  itemId: string,
): Promise<{
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
  const res = await axios.post(
    `/api/purchase/${payload.item_id}/checkout`,
    payload,
  );

  return res.data.checkout_url;
};

export const completeCheckout = async (sessionId: string) => {
  await axios.post("/api/purchase/checkout/complete", {
    session_id: sessionId,
  });
};
