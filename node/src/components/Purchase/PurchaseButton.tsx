type Props = {
  onClick: () => void;
}

export const PurchaseButton = ({onClick}: Props) => {
    return (
        <button
          onClick={onClick}
          className="mt-10 w-full bg-red-500 text-white py-3 rounded font-bold"
        >
            購入する
        </button>
    )
}