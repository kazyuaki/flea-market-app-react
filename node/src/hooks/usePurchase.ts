import { useEffect, useState } from 'react'
import type { Item } from '../types/item'
import type { Address } from '../types/address'
import { getPurchaseData, postPurchase } from '../api/purchaseApi'



/** 購入に関するロジックを管理するカスタムフック */
export const usePurchase = (itemId?: string) => {
  const [item, setItem] = useState<Item | null>(null)
  const [address, setAddress] = useState<Address>({
    post_code: '',
    address: '',
    building_name: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 商品とユーザーの住所情報をまとめて取得する
  useEffect(() => {
    if (!itemId) return

    /// 購入に必要なデータをまとめて取得するAPIを呼び出す
    const fetchData = async () => {
      try {
        // APIから商品情報とユーザーの住所情報を取得
        const data = await getPurchaseData(itemId)

        setItem(data.item)
        setAddress({
          post_code: data.user.post_code,
          address: data.user.address,
          building_name: data.user.building_name,
        })
      } catch (err) {
        console.error(err)
        setError('データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [itemId])

  // 購入処理
  const handlePurchase = async () => {
    if (!paymentMethod) {
      alert('支払い方法を選択してください')
      return
    }

    if (!item) {
      alert('商品情報が取得できていません')
      return
    }

    if (!address.post_code) {
      alert('住所を設定してください')
      return
    }

   try {
      await postPurchase({
        item_id: item.id,
        payment_method: paymentMethod,
        ...address,
      })

      alert('購入完了！')
    } catch (err) {
      console.error(err)
      alert('購入に失敗しました')
    }
  }

  return {
    item,
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
    handlePurchase,
    loading,
    error,
  }
}