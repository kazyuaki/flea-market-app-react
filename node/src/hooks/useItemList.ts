import { useEffect, useState } from 'react';
import type { Item } from '../types/item';
import { fetchItems } from '../api/itemApi';

/** 商品一覧のロジックを管理するカスタムフック */
export const useItemList = (tab: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchItems(tab);
        setItems(data);
      } catch (err) {
        if (err instanceof DOMException) return;
        setError('取得失敗');
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [tab]);

  return { items, loading, error };
};