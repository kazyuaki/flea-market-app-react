import axios from "../lib/axios";

/** * アイテムのお気に入りをトグルする関数
 * @param itemId お気に入りをトグルするアイテムのID
 * @returns お気に入りのトグル結果
 * @throws エラーが発生した場合はエラーをスロー
 */
export const toggleFavorite = async (itemId: string) => {
  const response = await axios.post(`/api/items/${itemId}/favorite`);

  if (!response.data.success) {
    throw new Error("お気に入りの更新に失敗しました");
  }

  return response.data.data;
};
