import type { FormEvent } from "react"
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import logo from "../../../assets/logo.svg"
import "./Header.css"
import { useAuthContext } from "../../../context/useAuthContext"

type Props = {
  showMyPage?: boolean
}

export default function Header({ showMyPage = true }: Props) {
  const { logout, user } = useAuthContext()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("keyword") ?? ""

  const location = useLocation()
  const isVerifyPage = location.pathname === "/verify-email"
  const isMyPage = location.pathname === "/mypage"
  const isItemsPage = location.pathname === "/items"

  // 検索バーを表示する条件
  const showSearchBar = isItemsPage || isMyPage

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const onClick = () => {
    navigate("/sell")
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const keyword = String(formData.get("keyword") ?? "")
    const params = new URLSearchParams()
    const trimmedKeyword = keyword.trim()

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword)
    }

    navigate({
      pathname: "/items",
      search: params.toString(),
    })
  }

  return (
    <header className="header">
      {/* 左 */}
      <div className="header-logo-wrap">
        <Link to="/items" className="header-logo-link">
          <img src={logo} alt="ロゴ" className="header-logo" />
        </Link>
      </div>

      {!isVerifyPage && (
        <>
          {/* 中央 */}
          {showSearchBar && (
            <form className="header-center" onSubmit={handleSearch}>
              <input
                key={keyword}
                type="text"
                name="keyword"
                placeholder="なにをお探しですか？"
                className="header-search"
                defaultValue={keyword}
              />
            </form>
          )}

          {/* 右 */}
          <div className="header-right">
            <div className="header-top-row">
              <div className="header-nav">
                {user ? (
                  <button
                    className="header-link-button"
                    type="button"
                    onClick={handleLogout}
                  >
                    ログアウト
                  </button>
                ) : (
                  <Link to="/login" className="header-link">
                    ログイン
                  </Link>
                )}
                {showMyPage && user && (
                  <Link to="/mypage" className="header-link">
                    マイページ
                  </Link>
                )}
                <button
                  className="header-button"
                  type="button"
                  onClick={onClick}
                >
                  出品
                </button>
              </div>
            </div>
            {user && <div className="header-user-name">{user.name}さん</div>}
          </div>
        </>
      )}
    </header>
  )
}
