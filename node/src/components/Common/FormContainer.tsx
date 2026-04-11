type FormContainerProps = {
  children: React.ReactNode
  className?: string
}

/** フォームを囲むコンテナ */
export const FormContainer = ({ children, className = '' }: FormContainerProps) => {
  return (
    <div className={`bg-white p-10 rounded shadow max-w-[800px] mx-auto ${className}`}>
      {children}
    </div>
  )
}