type Props = {
  src?: string
  alt: string
}

export default function ItemImage({ src, alt }: Props) {
  return (
    <img
      src={src || '/noimage.png'}
      alt={alt}
      className="w-[400px] h-[400px] object-cover bg-gray-200"
    />
  )
}