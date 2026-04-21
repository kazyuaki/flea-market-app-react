type TextareaFieldProps = {
  label: string
  value: string
  error?: string
  placeholder?: string
  className?: string
  labelClassName?: string
  rows?: number
  onChange: (value: string) => void
}

/** 汎用的なテキストエリアコンポーネント */
export const TextareaField = ({
  label,
  value,
  error,
  placeholder,
  className = "",
  labelClassName = "text-xl font-bold",
  rows = 5,
  onChange,
}: TextareaFieldProps) => {
  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded px-3 py-2 ${
          error ? "border border-red-500" : "border border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
