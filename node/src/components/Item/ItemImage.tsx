import noimage from '../../assets/noimage.png'
type Props = {
  src?: string
  alt: string
  className?: string
}

export default function ItemImage({ src, alt, className }: Props) {
  return (
    <img
      src={src || noimage}
      alt={alt}
      className={`w-[400px] h-[400px] object-cover bg-gray-200 ${className || ""}`}
    />
  )
}