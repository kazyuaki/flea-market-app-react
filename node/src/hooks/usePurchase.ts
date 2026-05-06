import { useEffect, useState } from "react";
import type { Item } from "../types/item";
import type { Address } from "../types/address";
import { getPurchaseData, postPurchase } from "../api/purchaseApi";

type ToastState = {
  message: string;
  variant: "success" | "error";
};

/** 購入に関するロジックを管理するカスタムフック */
export const usePurchase = (itemId?: string) => {
  /** 商品情報、ユーザーの住所情報、支払い方法、ローディング状態、エラー状態を管理する */
  const [item, setItem] = useState<Item | null>(null);
  const [address, setAddress] = useState<Address>({
    postal_code: "",
    address: "",
    building_name: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  /** 商品とユーザーの住所情報をまとめて取得する */
  useEffect(() => {
    if (!itemId) return;

    /// 購入に必要なデータをまとめて取得するAPIを呼び出す
    const fetchData = async () => {
      try {
        // APIから商品情報とユーザーの住所情報を取得
        const data = await getPurchaseData(itemId);

        setItem(data.item);
        setAddress({
          postal_code: data.user.postal_code,
          address: data.user.address,
          building_name: data.user.building_name,
        });
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  const showErrorToast = (message: string) => {
    setToast({
      message,
      variant: "error",
    });
  };

  // 購入処理
  const handlePurchase = async () => {
    if (!paymentMethod) {
      showErrorToast("支払い方法を選択してください");
      return;
    }

    if (!item) {
      showErrorToast("商品情報が取得できていません");
      return;
    }

    if (!address.postal_code) {
      showErrorToast("住所を設定してください");
      return;
    }

    try {
      const checkoutUrl = await postPurchase({
        item_id: item.id,
        payment_method: paymentMethod,
        ...address,
      });
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      showErrorToast("購入に失敗しました");
    }
  };

  return {
    item,
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
    toast,
    showErrorToast,
    handlePurchase,
    loading,
    error,
  };
};
