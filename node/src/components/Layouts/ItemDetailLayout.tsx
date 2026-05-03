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
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* メインコンテンツ */}
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pt-8 md:flex-row md:gap-16 md:px-10 md:pt-16">
        {/* 左：画像 */}
        <div className="w-full md:w-1/2 relative">{image}</div>
        {/* 右：情報 */}
        <div className="flex-1">{content}</div>
      </div>
    </div>
  )
}
