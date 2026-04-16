import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import "./Header.css";
import { useAuthContext } from "../../../context/useAuthContext";

export default function Header() {
  const { logout, user } = useAuthContext();

  const navigate = useNavigate();

  const location = useLocation();
  const isVerifyPage = location.pathname === "/verify-email";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const onClick = () => {
    navigate("/sell")
  };

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
          <div className="header-center">
            <input
              type="text"
              placeholder="なにをお探しですか？"
              className="header-search"
            />
          </div>

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
                <Link to="/mypage/profile" className="header-link">
                  マイページ
                </Link>
                <button
                  className="header-button" type="button"
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
  );
}
