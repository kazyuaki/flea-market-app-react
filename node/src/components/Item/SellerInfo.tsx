import type { ReactNode } from "react"
import { getProfileImageUrl } from "../../utils/profileImage"

type SellerInfoProps = {
  name: string
  profileImageUrl?: string | null
  actions?: ReactNode
}

export const SellerInfo = ({ name, profileImageUrl, actions }: SellerInfoProps) => {
  const avatarUrl = getProfileImageUrl(profileImageUrl)

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex min-w-0 items-center gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name}さんのプロフィール画像`}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-300" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-500">出品者</p>
          <p className="truncate text-xl font-semibold">{name}</p>
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-col gap-2">{actions}</div>}
    </div>
  )
}
