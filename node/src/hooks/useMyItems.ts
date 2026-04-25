// src/hooks/useMyItems.ts
import { useState, useEffect } from "react";
import { getMyPageItems, type MyPageItemTab } from "../api/myPageApi";
import type { Item } from "../types/item";

/** マイページの「出品した商品」「購入した商品」両方で使用するカスタムフック */
export const useMyItems = (tab: MyPageItemTab) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyItems = async () => {
      setLoading(true);
      try {
        setError(null);
        // タブに応じてエンドポイントやパラメータを切り替える
        const data = await getMyPageItems(tab);
        setItems(data);
      } catch {
        setError("取得失敗");
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [tab]); // tabが変わるたびに再取得

  return { items, loading, error };
};
