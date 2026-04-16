type TextareaFieldProps = {
  label: string
  value: string
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
        className="w-full border rounded px-3 py-2"
      />
    </div>
  )
}
