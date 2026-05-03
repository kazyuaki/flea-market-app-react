import type { ChangeEvent } from "react"
import { RequiredBadge } from "./RequiredBadge"

type ImageUploadFieldProps = {
  label: string
  selectedCount: number
  images?: File[]
  currentImageUrl?: string
  error?: string
  className?: string
  labelClassName?: string
  required?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/** 画像アップロード用のフィールドコンポーネント */
export const ImageUploadField = ({
  label,
  selectedCount,
  images= [],
  currentImageUrl,
  error,
  className = "",
  labelClassName = "text-xl font-bold",
  required = false,
  onChange,
}: ImageUploadFieldProps) => {
  // 画像のプレビューURLを生成する
  const previewUrls = images.map((file) => URL.createObjectURL(file))

  return (
    <div className={`mb-10 ${className}`}>
      <label className={`mb-3 flex items-center gap-2 ${labelClassName}`}>
        {label}
        {required && <RequiredBadge />}
      </label>

      <label className={`block cursor-pointer rounded-lg border-2 border-dashed p-12 hover:bg-gray-50 ${
        error ? "border-red-500" : "border-gray-300"
      }`}>
        {previewUrls.length === 0 && !currentImageUrl ? (
          <div className="py-10 text-center text-lg text-gray-400">
            クリックして画像を選択
          </div>
        ) : previewUrls.length === 0 && currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt="現在の商品画像"
            className="mx-auto h-40 max-w-full rounded object-cover"
          />
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="preview"
                className="h-24 w-full rounded object-cover"
              />
            ))}
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif"
          multiple
          onChange={onChange}
          className="hidden"
        />
      </label>

      {selectedCount > 0 && (
        <p className="mt-3 text-base text-gray-500">{selectedCount}枚選択中</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
