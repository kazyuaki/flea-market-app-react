import logo from '../../assets/logo.svg'
import './Header.css'


export default function Header() {
  return (
    <header className="header">
      {/* 左 */}
      <div className="header-logo-wrap">
        <img src={logo} alt="ロゴ" className="header-logo" />
      </div>

      {/* 右 */}
      <div className="header-right">
        <input
          type="text"
          placeholder="なにをお探しですか？"
          className="header-search"
        />
        <span className="header-link">ログアウト</span>
        <span className="header-link">マイページ</span>
        <button className="header-button" type="button">
          出品
        </button>
      </div>
    </header>
  )
}