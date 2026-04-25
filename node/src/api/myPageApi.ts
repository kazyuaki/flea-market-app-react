import axios from "../lib/axios";
import type { Item } from "../types/item";

export type MyPageItemTab = "listed" | "purchased";

/** マイページの商品一覧取得 */
export const getMyPageItems = async (tab: MyPageItemTab): Promise<Item[]> => {
  const res = await axios.get("/api/mypage/items", {
    params: { tab },
  });

  return res.data.data;
};
