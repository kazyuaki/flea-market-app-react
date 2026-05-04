import { Link } from "react-router-dom"

type Props = {
  avatarUrl?: string
  userName: string
}

export const ProfileSection = ({ avatarUrl, userName }: Props) => {
  return (
    <div className="mypage-profile-section">
      <div className="flex flex-col items-center">
        {/* アイコン画像 */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="ユーザーアイコン"
            className="mypage-avatar"
          />
        ) : (
          <div className="mypage-avatar bg-gray-300" />
        )}

        {/* ユーザー名 */}
        <h2 className="mypage-user-name">{userName}</h2>
      </div>

      {/* ★追加：編集画面へのリンクボタン */}
      <Link
        to="/mypage/profile"
        className="mypage-profile-edit-link"
      >
        プロフィールを編集
      </Link>
    </div>
  )
}
