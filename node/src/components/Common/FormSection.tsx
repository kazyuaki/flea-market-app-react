import type { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export const FormSection = ({ title, children }: Props) => (
  <div className="mb-12">
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-500">{title}</h2>
      <div className="mt-3 h-[1px] bg-gray-300" />
    </div>
    {children}
  </div>
)
