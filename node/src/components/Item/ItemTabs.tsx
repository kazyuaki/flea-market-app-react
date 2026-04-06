import { Link } from 'react-router-dom'

type Props = {
  activeTab: 'recommend' | 'mylist'
}

/** 商品一覧のタブ切り替えコンポーネント */
export default function ItemTabs({ activeTab }: Props) {
  return (
    <div className="tabs">
      <Link
        to="/items"
        className={`tab ${activeTab === 'recommend' ? 'active-recommend' : ''}`}
      >
        おすすめ
      </Link>

      <Link
        to="/items?tab=mylist"
        className={`tab ${activeTab === 'mylist' ? 'active-mylist' : ''}`}
      >
        マイリスト
      </Link>
    </div>
  )
}