type Props = {
  onClick: () => void
  label: string
}

export const PurchaseButton = ({ onClick, label }: Props) => {
  return (
    <button
      onClick={onClick}
      className="mt-10 w-full bg-red-500 text-white py-3 rounded font-bold hover:bg-red-600 transition-colors"
    >
      {label}
    </button>
  )
}
