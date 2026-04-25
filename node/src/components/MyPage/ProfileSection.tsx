import { Link } from "react-router-dom"

type Props = {
  avatarUrl?: string
  userName: string
}

export const ProfileSection = ({ avatarUrl, userName }: Props) => {
  return (
    <div className="mt-12 mb-10 flex justify-center items-center gap-x-12 text-center">
      <div className="flex-col items-center">
        {/* アイコン画像 */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="ユーザーアイコン"
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-300" />
        )}

        {/* ユーザー名 */}
        <h2 className="text-xl font-bold">{userName}</h2>
      </div>

      {/* ★追加：編集画面へのリンクボタン */}
      <Link
        to="/mypage/profile"
        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
      >
        プロフィールを編集
      </Link>
    </div>
  )
}
