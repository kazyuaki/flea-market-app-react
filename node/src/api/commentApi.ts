/** 商品に対するAPI */
export const postComment = async (itemId: string, content: string) => {
  const res = await fetch(`/api/items/${itemId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error();

  return res.json();
};