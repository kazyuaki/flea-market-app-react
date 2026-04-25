import axios from "../lib/axios";
import type { Item } from "../types/item";

export type MyPageItemTab = "listed" | "purchased";

/** マイページの商品一覧取得 */
export const getMyPageItems = async (tab: MyPageItemTab): Promise<Item[]> => {
  const endpoint =
    tab === "listed" ? "/api/mypage/listed" : "/api/mypage/purchases";
  const res = await axios.get(endpoint);

  return res.data.data;
};
