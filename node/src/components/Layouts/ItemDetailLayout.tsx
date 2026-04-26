import type { ReactNode } from "react"
import Header from "./Header/Header"

type ItemDetailLayoutProps = {
  image: ReactNode
  content: ReactNode
}

export default function ItemDetailLayout({
  image,
  content,
}: ItemDetailLayoutProps) {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <Header />

      {/* メインコンテンツ */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16 pt-8 md:pt-16 px-6 md:px-10">
        {/* 左：画像 */}
        <div className="w-full md:w-1/2">{image}</div>
        {/* 右：情報 */}
        <div className="flex-1">{content}</div>
      </div>
    </div>
  )
}
