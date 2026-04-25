import { useEffect, useMemo, useState } from 'react';
import type { Item } from '../types/item';
import { fetchItems } from '../api/itemApi';

/** 商品一覧のロジックを管理するカスタムフック */
export const useItemList = (
  activeTab: "recommend" | "mylist",
  keyword?: string
) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /// タブの状態が変わるたびに商品データを取得する
  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchItems(keyword || undefined);
        setItems(data);
      } catch (err) {
        if (err instanceof DOMException) return;
        setError("商品の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [keyword]);

  const filterdItems = useMemo(() => {
    if (activeTab === 'mylist') {
      return items.filter((item) => item.is_favorited);
    }
    return items;
  }, [items, activeTab]);

  return { items: filterdItems, loading, error };
};