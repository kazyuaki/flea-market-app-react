type FormContainerProps = {
  children: React.ReactNode
  className?: string
}

/** フォームを囲むコンテナ */
export const FormContainer = ({ children, className = '' }: FormContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-[1000px] rounded bg-white p-6 shadow sm:p-10 ${className}`}>
      {children}
    </div>
  )
}
