import type { ConditionMap, ConditionOptions } from "../../types/condition"

/** 商品の状態を表す関数 */
export const CONDITION_MAP: ConditionMap = {
  1: '良好',
  2: '目立った傷や汚れなし',
  3: 'やや傷や汚れあり',
  4: '状態が悪い',
}

/** 商品の状態の選択肢の配列 */
export const CONDITION_OPTIONS: ConditionOptions = Object.entries(CONDITION_MAP).map(([id, name]) => ({
  id: Number(id),
  name,
}))
