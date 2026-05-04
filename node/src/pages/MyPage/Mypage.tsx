import { useSearchParams } from "react-router-dom"
import ItemListContent from "../../components/Item/ItemListContent"
import { ProfileSection } from "../../components/MyPage/ProfileSection"
import { useAuthContext } from "../../context/useAuthContext"
import { getProfileImageUrl } from "../../utils/profileImage"
import { MyPageTabs } from "../../components/MyPage/MyPageTabs"
import { useMyItems } from "../../hooks/useMyItems"
import { NormalLayout } from "../../components/Layouts/NormalLayout"

export const MyPage = () => {
  /** 1. ルーティング・パラメータ管理 */
  const [searchParams] = useSearchParams()
  const activeTab =
    searchParams.get("tab") === "purchased" ? "purchased" : "listed"

  /** 2. データ取得（API連携） */
  const { items, loading, error } = useMyItems(activeTab)

  /** 3. ユーザープロフィール情報 */
  const { user } = useAuthContext()
  const avatarUrl = getProfileImageUrl(user?.profile_image_url)
  const userName = user?.name

  return (
    <>
      {/* メインコンテンツ */}
      <NormalLayout showMyPageHeader={false} mainClassName="mypage-container">

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
