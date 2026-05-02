import axios from "../lib/axios";

/** 商品に対するAPI */
export const postComment = async (itemId: string, content: string) => {
  const res = await axios.post(`/api/items/${itemId}/comments`, { content });

  return res.data.data;
};

export const deleteComment = async (commentId: number) => {
  await axios.delete(`/api/comments/${commentId}`);

  return true;
};
