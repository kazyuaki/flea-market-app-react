import type { ReactNode } from "react"
import Header from "./Header/Header"

type PurchaseLayoutProps = {
  main: ReactNode
  sidebar: ReactNode
}

/** 購入フロー用の2カラムレイアウト */
export const PurchaseLayout = ({ main, sidebar }: PurchaseLayoutProps) => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-[1000px] mx-auto flex gap-10">
          <div className="flex-1">{main}</div>
          <div className="w-[300px]">{sidebar}</div>
        </div>
      </div>
    </>
  )
}
