import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import ItemListContent from "../../components/Item/ItemListContent"
import Header from "../../components/Layouts/Header/Header"
import { useEffect } from "react"
import { ProfileSection } from "../../components/MyPage/ProfileSection"
import { useAuthContext } from "../../context/useAuthContext"
import { getProfileImageUrl } from "../../utils/profileImage"
import { MyPageTabs } from "../../components/MyPage/MyPageTabs"
import { useMyItems } from "../../hooks/useMyItems"


export const MyPage = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = searchParams.get("tab") === "purchased" ? "purchased" : "listed"
  
  /** 状態管理 */
  const { items, loading, error } = useMyItems(activeTab)

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
  
  const { user } = useAuthContext()
  const avatarUrl = getProfileImageUrl(user?.profile_image_url)
  const userName = user?.name

  return (
    <div className="page">
      <Header showMyPage={false} />

      {/* メインコンテンツ */}
      <div className="container">
        {/* プロフィールセクション */}
        <ProfileSection
          avatarUrl={avatarUrl}
          userName={userName || "ユーザー"}
        />
        {/* タブ切り替え */}
        <MyPageTabs activeTab={activeTab} />
        {/* 商品一覧 */}
        <div className="items">
          <ItemListContent items={items} loading={loading} error={error} />
        </div>
      </div>
    </div>
  )
}
