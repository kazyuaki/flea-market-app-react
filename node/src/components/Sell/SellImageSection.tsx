import type { ChangeEvent } from "react"
import { ImageUploadField } from "../Common/ImageUploadField"
import { sellFieldProps } from "./sellFieldProps"

type Props = {
  images: File[]
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SellImageSection = ({
  images,
  error,
  onChange,
}: Props) => (
  <div className="mb-12">
    <ImageUploadField
      {...sellFieldProps}
      label="商品の画像"
      selectedCount={images.length}
      images={images}
      error={error}
      className="mb-0"
      onChange={onChange}
    />
  </div>
)
