type SelectOption = {
  id: number
  name: string
}

type SelectFieldProps = {
  label: string
  value: number | ""
  options: SelectOption[]
  placeholder: string
  className?: string
  labelClassName?: string
  onChange: (value: number | null) => void
}

/** 汎用的なセレクトフィールドコンポーネント */
export const SelectField = ({
  label,
  value,
  options,
  placeholder,
  className = "",
  labelClassName = "text-xl font-bold",
  onChange,
}: SelectFieldProps) => {
  const isPlaceholder = value === ""

  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        className={`w-full border rounded px-3 py-2 bg-white ${
          isPlaceholder ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
