import type { ChangeEvent } from "react"

type ImageUploadFieldProps = {
  label: string
  selectedCount: number
  images?: File[]
  className?: string
  labelClassName?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/** 画像アップロード用のフィールドコンポーネント */
export const ImageUploadField = ({
  label,
  selectedCount,
  images= [],
  className = "",
  labelClassName = "text-xl font-bold",
  onChange,
}: ImageUploadFieldProps) => {
  // 画像のプレビューURLを生成する
  const previewUrls = images.map((file) => URL.createObjectURL(file))

  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>

      <label className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12  hover:bg-gray-50">
        {previewUrls.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            クリックして画像を選択
          </div>
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
          accept="image/*"
          multiple
          onChange={onChange}
          className="hidden"
        />
      </label>

      {selectedCount > 0 && (
        <p className="mt-3 text-sm text-gray-500">{selectedCount}枚選択中</p>
      )}
    </div>
  )
}
