import { Link } from "react-router-dom"

type Props = {
  activeTab: "listed" | "purchased"
}

/** マイページ用のタブ切り替えコンポーネント */
export const MyPageTabs = ({ activeTab }: Props) => {
  return (
    <div className="tabs">
      <Link
        to="/mypage?tab=listed"
        className={`tab ${activeTab === "listed" ? "active" : ""}`}
      >
        出品した商品
      </Link>

      <Link
        to="/mypage?tab=purchased"
        className={`tab ${activeTab === "purchased" ? "active" : ""}`}
      >
        購入した商品
      </Link>
    </div>
  )
}
