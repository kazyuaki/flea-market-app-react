import axios from "../lib/axios";

export const createCheckout = async (itemId: string) => {
  const res = await axios.post(`/api/purchase/${itemId}/checkout`);
  return res.data.checkout_url as string;
};
