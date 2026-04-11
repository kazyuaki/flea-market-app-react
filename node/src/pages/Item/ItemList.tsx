import { useSearchParams } from 'react-router-dom'
import Header from "../../components/Layouts/Header/Header"
import './ItemList.css'
import { useItemList } from '../../hooks/useItemList'
import ItemTabs from '../../components/Item/ItemTabs'
import ItemListContent from '../../components/Item/ItemListContent'

type ItemTab = 'recommend' | 'mylist'

export default function ItemList() {
  /** タブの状態をURLクエリから取得 */
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const activeTab: ItemTab = tab === 'mylist' ? 'mylist' : 'recommend'
  
  /** 状態管理 */ 
  const { items, loading, error } = useItemList(activeTab)

  /**
  * 商品一覧画面
  *
  * ・タブ（おすすめ / マイリスト）の切り替え
  * ・商品一覧の表示
  * ・ローディング / エラー / 空状態の分岐表示
  */ 
  return (
    <div className="page">
      <Header />
      { /* メインコンテンツ */ }
      <div className="container">
       {/* タブ切り替え */ }
       <ItemTabs activeTab={activeTab} />
        {/* 商品一覧 */ }
        <div className="items">
          <ItemListContent
            items={items}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}