type CurrencyInputFieldProps = {
  label: string
  value: number | ""
  placeholder?: string
  className?: string
  labelClassName?: string
  onChange: (value: number | "") => void
}

const formatPrice = (value: number | "") => {
  if (value === "") return ""
  return new Intl.NumberFormat("ja-JP").format(value)
}

/** 金額入力用のフィールドコンポーネント */
export const CurrencyInputField = ({
  label,
  value,
  placeholder,
  className = "",
  labelClassName = "text-xl font-bold",
  onChange,
}: CurrencyInputFieldProps) => {
  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          ¥
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={formatPrice(value)}
          placeholder={placeholder}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^\d]/g, "")
            onChange(numericValue === "" ? "" : Number(numericValue))
          }}
          className="w-full border rounded px-9 py-2 text-left"
        />
      </div>
    </div>
  )
}
