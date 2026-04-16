import type { ChangeEvent } from "react"

type ImageUploadFieldProps = {
  label: string
  selectedCount: number
  className?: string
  labelClassName?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/** 画像アップロード用のフィールドコンポーネント */
export const ImageUploadField = ({
  label,
  selectedCount,
  className = "",
  labelClassName = "text-xl font-bold",
  onChange,
}: ImageUploadFieldProps) => {
  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>

      <label className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:bg-gray-50">
        クリックして画像を選択
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
