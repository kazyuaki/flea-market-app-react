import axios from "axios";

/** * アイテムにいいねを送信する関数
 * @param itemId いいねを送信するアイテムのID
 * @returns いいねの送信結果
 * @throws エラーが発生した場合はエラーをスロー
 */
export const postLike = async (itemId: string) => {
  const response = await axios.post(`/api/items/${itemId}/like`);

  if (!response.data.success) {
    throw new Error("いいねの送信に失敗しました");
  }

  return response.data;
};

/** * アイテムのいいねを取り消す関数
 * @param itemId いいねを取り消すアイテムのID
 * @returns いいねの取り消し結果
 * @throws エラーが発生した場合はエラーをスロー
 */
export const deleteLike = async (itemId: string) => {
  const response = await axios.delete(`/api/items/${itemId}/like`);

  if (!response.data.success) {
    throw new Error("いいねの取り消しに失敗しました");
  }

  return response.data;
};
