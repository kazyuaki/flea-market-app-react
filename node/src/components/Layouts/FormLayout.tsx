import Header from "./Header/Header"

type FormLayoutProps = {
  title: string
  children: React.ReactNode
  className?: string
}

/** 認証・登録画面のコンポーネント */
export const FormLayout = ({
  title,
  children,
  className = "max-w-[800px]",
}: FormLayoutProps) => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className={`mx-auto px-4 ${className}`}>
          <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>

          {children}
        </div>
      </div>
    </>
  )
}
