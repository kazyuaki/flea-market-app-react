import type { ChangeEvent } from "react"

type Props = {
  preview: string | null
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/** プロフィール画像アップロード */
export const ProfileImageUpload = ({ preview, onChange }: Props) => {
  return (
    <div className="mb-10 flex flex-col items-center gap-4 text-center">
      {preview ? (
        <img
          src={preview}
          alt="プレビュー"
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="h-24 w-24 rounded-full bg-gray-300" />
      )}

      <label className="cursor-pointer">
        <span className="rounded border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50">
          画像を選択する
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  )
}
