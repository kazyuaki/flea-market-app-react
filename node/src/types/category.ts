/** カテゴリーの型定義 */ 
export type Category = {
  id: number;
  name: string;
};

/** カテゴリーのIDと名前のマッピングの型定義 */
export type CategoryMap = Record<number, string>;

/** カテゴリーの選択肢の配列の型定義 */
export type CategoryOption = {
  id: number;
  name: string;
};

export type CategoryOptions = CategoryOption[];