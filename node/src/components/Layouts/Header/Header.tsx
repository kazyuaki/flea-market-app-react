import { useEffect, useRef, useState } from "react"
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

/**
 * ヘッダーコンポーネント
 * @param showMyPage マイページのリンクを表示するかどうか（デフォルトはtrue）
 */
export default function Header({ showMyPage = true }: Props) {
  /** ログアウト機能 */
  const { logout, user } = useAuthContext()
  /* ルーティング関係 */
  const navigate = useNavigate()
  const location = useLocation()
  /* 検索キーワード */
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("keyword") ?? ""
  /* 検索キーワードの状態 */
  const [searchKeyword, setSearchKeyword] = useState(keyword)
  const isFirstSearchEffect = useRef(true)
  /* 画面判定（メール認証・商品一覧） */
  const isVerifyPage = location.pathname === "/verify-email"
  const isItemsPage = location.pathname === "/items"

  // 検索バーを表示する条件
  const showSearchBar = isItemsPage

  // ログアウト処理
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  // 出品ページへ遷移
  const handleSell = () => {
    navigate("/sell")
  }

  /** 検索キーワードの変更を監視して、URLを更新する */
  useEffect(() => {
    if (!showSearchBar) return

    if (isFirstSearchEffect.current) {
      isFirstSearchEffect.current = false
      return
    }

    const trimmedKeyword = searchKeyword.trim()

    // ０.5秒のディレイを設けて、ユーザーが入力を完了するのを待つ
    const timer = setTimeout(() => {
      const params = new URLSearchParams()

      if (trimmedKeyword.length >= 1) {
        params.set("keyword", trimmedKeyword)
      }

      if (trimmedKeyword.length === 0) {
        navigate({
          pathname: "/items",
          search: "",
        })
      }
      if (trimmedKeyword.length >= 1) {
        navigate({
          pathname: "/items",
          search: params.toString(),
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [searchKeyword, navigate, showSearchBar])

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
            <input
              key={keyword}
              type="text"
              name="keyword"
              placeholder="なにをお探しですか？"
              className="header-search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
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
                  onClick={handleSell}
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
