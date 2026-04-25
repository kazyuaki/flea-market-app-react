import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import ItemListContent from "../../components/Item/ItemListContent"
import { useEffect } from "react"
import { ProfileSection } from "../../components/MyPage/ProfileSection"
import { useAuthContext } from "../../context/useAuthContext"
import { getProfileImageUrl } from "../../utils/profileImage"
import { MyPageTabs } from "../../components/MyPage/MyPageTabs"
import { useMyItems } from "../../hooks/useMyItems"
import { NormalLayout } from "../../components/Layouts/NormalLayout"

export const MyPage = () => {
  /** 1. ルーティング・パラメータ管理 */
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab =
    searchParams.get("tab") === "purchased" ? "purchased" : "listed"

  /** 2. データ取得（API連携） */
  const { items, loading, error } = useMyItems(activeTab)

  /** 3. ユーザープロフィール情報 */
  const { user } = useAuthContext()
  const avatarUrl = getProfileImageUrl(user?.profile_image_url)
  const userName = user?.name

  /** タブの状態をURLクエリパラメータと同期させる */
  useEffect(() => {
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      {
        replace: true,
        state: null,
      },
    )
  }, [location.pathname, location.search, navigate])

  return (
    <>
      {/* メインコンテンツ */}
      <NormalLayout showMyPageHeader={false}>

        {/* プロフィールセクション */}
        <ProfileSection
          avatarUrl={avatarUrl}
          userName={userName || "ユーザー"}
        />

        {/* タブ切り替え */}
        <MyPageTabs activeTab={activeTab} />

        {/* 商品一覧 */}
        <ItemListContent items={items} loading={loading} error={error} />
        
      </NormalLayout>
    </>
  )
}
