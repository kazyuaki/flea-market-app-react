import type { ItemErrors } from "../types/utils/validation/item";

/** サーバーからのエラーをクライアント側のエラー形式に変換する関数 */
export const normalizeServerErrors = (
  serverErrors: Record<string, string[]>,
): ItemErrors => {
  const nextErrors: ItemErrors = {};

  Object.entries(serverErrors).forEach(([key, messages]) => {
    if (key.startsWith("category_ids")) {
      nextErrors.category_ids = [
        ...(nextErrors.category_ids ?? []),
        ...messages,
      ];
      return;
    }

    if (key.startsWith("images")) {
      nextErrors.images = [...(nextErrors.images ?? []), ...messages];
      return;
    }

    if (
      key === "name" ||
      key === "brand" ||
      key === "description" ||
      key === "price" ||
      key === "condition"
    ) {
      nextErrors[key] = messages;
    }
  });

  return nextErrors;
};
