import type { ReactNode } from 'react'
import Header from './Header/Header'

type ItemDetailLayoutProps = {
    image: ReactNode
    content: ReactNode
}

export default function ItemDetailLayout({ image, content }: ItemDetailLayoutProps) {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Header />

			{/* メインコンテンツ */}
			<div className="max-w-[1000px] mx-auto p-10 flex gap-10">
				{/* 左：画像 */}
				{image}

				{/* 右：情報 */}
				<div className="flex-1">
					{content}
				</div>
			</div>

		</div>
	)
}