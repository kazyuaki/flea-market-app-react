import type { CategoryMap, CategoryOptions } from "../../types/category";

/** カテゴリーのIDと名前のマッピング */
export const CATEGORY_MAP: CategoryMap = {
  1: "ファッション",
  2: "家電",
  3: "インテリア",
  4: "レディース",
  5: "メンズ",
  6: "コスメ",
  7: "本",
  8: "ゲーム",
  9: "おもちゃ",
  10: "スポーツ",
  11: "キッチン",
  12: "ハンドメイド",
  13: "アクセサリー",
  14: "ベビー・キッズ",
  15: "その他",
};

/** カテゴリーの選択肢の配列 */
export const CATEGORY_OPTIONS: CategoryOptions = Object.entries(
  CATEGORY_MAP,
).map(([id, name]) => ({
  id: Number(id),
  name,
}));
