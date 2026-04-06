import type { Item } from '../types/item'

/**
 * 商品一覧取得
 */
export const fetchItems = async (tab: string): Promise<Item[]> => {
  const res = await fetch(`/api/items?tab=${tab}`)

  if (!res.ok) throw new Error()

  const data = await res.json()
  return data.data
}

/**
 * 商品詳細取得
 */
export const fetchItemDetail = async (id: string): Promise<Item> => {
  const res = await fetch(`/api/items/${id}`)

  if (!res.ok) throw new Error()

  const data = await res.json()
  return data.data
}