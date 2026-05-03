type Props = {
  onClick: () => void
  label: string
  disabled?: boolean
}

export const PurchaseButton = ({ onClick, label, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`mt-10 w-full rounded py-4 text-3xl font-bold text-white transition-colors ${
        disabled
          ? "cursor-not-allowed bg-gray-400"
          : "bg-red-500 hover:bg-red-600"
      }`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
