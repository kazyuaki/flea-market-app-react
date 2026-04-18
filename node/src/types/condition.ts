// 商品の状態を表す型定義
export type Condition = {
  id: number;
  name: string;
};

/** 商品の状態を表すマッピング */
export type ConditionMap = Record<number, string>;

/** 商品の状態の選択肢の配列の型定義 */
export type ConditionOption = {
  id: number;
  name: string;
};

export type ConditionOptions = ConditionOption[];