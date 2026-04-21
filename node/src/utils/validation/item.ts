import type { ItemForm } from "../../types/item";

export type ItemErrors = {
  name?: string[];
  brand?: string[];
  description?: string[];
  price?: string[];
  category_ids?: string[];
  condition?: string[];
  images?: string[];
};

const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** 商品出品画面のクライアント側バリデーション */
export const validateItem = (form: ItemForm): ItemErrors => {
  const nextErrors: ItemErrors = {};

  // 商品名
  if (!form.name.trim()) {
    nextErrors.name = ["商品名を入力してください"];
  } else if (form.name.length > 255) {
    nextErrors.name = ["商品名は255文字以内で入力してください"];
  }

  // ブランド（任意だけど文字数制限）
  if (form.brand && form.brand.length > 255) {
    nextErrors.brand = ["ブランド名は255文字以内で入力してください"];
  }

  // 販売価格
  if (!form.price) {
    nextErrors.price = ["販売価格を入力してください"];
  } else if (isNaN(Number(form.price)) || Number(form.price) < 1) {
    nextErrors.price = ["販売価格は1円以上の数値で入力してください"];
  }

  // カテゴリー
  if (form.category_ids.length === 0) {
    nextErrors.category_ids = ["カテゴリーを1つ以上選択してください"];
  }

  // 商品の状態
  if (form.condition === null) {
    nextErrors.condition = ["商品の状態を選択してください"];
  }

  // 画像は任意。選択されている場合のみ形式とサイズをチェック
  if (form.images.length > 0) {
    const invalidType = form.images.some((image) => !ALLOWED_IMAGE_TYPES.has(image.type));
    const oversizedImage = form.images.some((image) => image.size > MAX_IMAGE_FILE_SIZE);

    if (invalidType) {
      nextErrors.images = ["画像はjpeg、png、webp、gif形式でアップロードしてください"];
    } else if (oversizedImage) {
      nextErrors.images = ["画像ファイルのサイズは2MB以下にしてください"];
    }
  }

  return nextErrors;
};
