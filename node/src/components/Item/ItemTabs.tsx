import { Link } from 'react-router-dom'

type Props = {
  activeTab: 'recommend' | 'mylist'
  keyword?: string
}

/** 商品一覧のタブ切り替えコンポーネント */
export default function ItemTabs({ activeTab, keyword = "" }: Props) {
  /// タブ切り替え時のURLを生成する関数
  const buildTabUrl = (tab?: 'mylist') => {
    const params = new URLSearchParams()
    const trimmedKeyword = keyword.trim()

    if (tab) {
      params.set('tab', tab)
    }

    if (trimmedKeyword) {
      params.set('keyword', trimmedKeyword)
    }

    const search = params.toString()
    return search ? `/items?${search}` : '/items'
  }

  return (
    <div className="tabs">
      <Link
        to={buildTabUrl()}
        className={`tab ${activeTab === 'recommend' ? 'active-recommend' : ''}`}
      >
        おすすめ
      </Link>

      <Link
        to={buildTabUrl('mylist')}
        className={`tab ${activeTab === 'mylist' ? 'active-mylist' : ''}`}
      >
        お気に入り
      </Link>
    </div>
  )
}
