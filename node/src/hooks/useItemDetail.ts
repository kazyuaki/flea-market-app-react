import { useEffect, useState } from 'react'
import type { Item } from '../types/item'
import { fetchItemDetail } from '../api/itemApi'

/** 商品詳細のロジックを管理するカスタムフック */
export const useItemDetail = (id: string | undefined) => {
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()

    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchItemDetail(id)
        setItem(data)
      } catch (err) {
        if (err instanceof DOMException) return
        setError('商品情報の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [id])

  return { item, setItem, loading, error }
}