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
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 text-lg lg:flex-row lg:gap-10 lg:px-10 xl:text-xl 2xl:px-16">
          <div className="min-w-0 flex-1">{main}</div>
          <div className="w-full lg:w-[320px] xl:w-[360px]">{sidebar}</div>
        </div>
      </div>
    </>
  )
}
