import Header from '../components/Header/Header'
import noimage from '../assets/noimage.png'
import { useParams } from 'react-router-dom'
import { usePurchase } from '../hooks/usePurchase'



/** 購入画面
 *
 * ・商品情報の表示
 * ・支払い方法の選択
 * ・配送先の表示
 * ・購入サマリーの表示
 * ・購入処理
 */
export const PurchasePage = () => {
  // URLパラメータから商品IDを取得
  const { itemId } = useParams()
  // カスタムフックから必要な状態と関数を取得
  const { item, address, loading, error, handlePurchase, paymentMethod, setPaymentMethod } = usePurchase(itemId)

  if (loading) return <p>Loading...</p>
  if(error) return <p className="text-red-500">{error}</p>
  if (!item) return null

return (
  <>
    <Header />

    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-[1000px] mx-auto flex gap-10">

        {/* 左エリア */}
        <div className="flex-1">

          {/* 商品情報 */}
          <div className="flex gap-6 items-center border-b border-gray-500 pb-6">
            <img
              src={item.image_url ?? noimage}
              alt=""
              className="w-[120px] h-[120px] object-cover bg-gray-300"
            />
            <div>
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-xl font-bold mt-2">
                ¥{item.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 支払い方法 */}
          <div className="mt-6 border-b border-gray-500 pb-6">
            <h3 className="font-bold mb-3">支払い方法</h3>
            <select
              className="border border-gray-500 px-3 py-2 rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="1">コンビニ支払い</option>
              <option value="2">カード支払い</option>
            </select>
          </div>

          {/* 配送先 */}
          <div className="mt-6 border-b border-gray-500 pb-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">配送先</h3>
              <button className="text-blue-500 text-sm">
                変更する
              </button>
            </div>

            <p className="mt-3 text-sm">〒{address.post_code}</p>
            <p className="text-sm">{address.address}</p>
            <p className="text-sm">{address.building_name}</p>
          </div>

        </div>

        {/* 右エリア */}
        <div className="w-[300px]">

          {/* サマリーカード */}
          <div className="border border-gray-500 bg-white p-8 mt-5">
            <div className="flex justify-between border-b border-gray-500 pb-3">
              <span>商品代金</span>
              <span>¥{item.price.toLocaleString()}</span>
            </div>

            <div className="flex justify-between pt-3">
              <span>支払い方法</span>
              <span>
                {paymentMethod === '1' && 'コンビニ'}
                {paymentMethod === '2' && 'カード'}
              </span>
            </div>
          </div>

          {/* 購入ボタン */}
          <button
            onClick={handlePurchase}
            className="mt-10 w-full bg-red-500 text-white py-3 rounded font-bold"
          >
            購入する
          </button>

        </div>

      </div>
    </div>
  </>
)
}