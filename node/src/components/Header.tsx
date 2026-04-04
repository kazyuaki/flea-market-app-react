import logo from '../assets/logo.svg'


export default function Header() {
  return (
    <header style={{
      background: 'black',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px'
    }}>
      {/* ロゴ */}
          <img src={logo} alt="ロゴ" />
          
      {/* 検索 */}
      <input
        type="text"
        placeholder="なにをお探しですか？"
        style={{ width: '300px' }}
      />

      {/* ナビ */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button>ログアウト</button>
        <button>マイページ</button>
        <button style={{ background: 'white', color: 'black' }}>出品</button>
      </div>
    </header>
  )
}