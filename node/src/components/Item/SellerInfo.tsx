import { getProfileImageUrl } from "../../utils/profileImage"

type SellerInfoProps = {
  name: string
  profileImageUrl?: string | null
}

export const SellerInfo = ({ name, profileImageUrl }: SellerInfoProps) => {
  const avatarUrl = getProfileImageUrl(profileImageUrl)

  return (
    <div className="mt-6 flex items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${name}さんのプロフィール画像`}
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : (
        <div className="h-12 w-12 rounded-full bg-gray-300" />
      )}
      <div>
        <p className="text-sm font-bold text-gray-500">出品者</p>
        <p className="text-xl font-semibold">{name}</p>
      </div>
    </div>
  )
}
