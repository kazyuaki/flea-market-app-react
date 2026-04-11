import type React from "react"

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export const CommonButton = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full py-3 rounded font-bold text-white
        transition
        ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }
      `}
    >
      {children}
    </button>
  )
}
