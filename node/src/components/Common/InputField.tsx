type props = {
  label: string
  value: string
  error?: string
  placeholder?: string
  onChange: (value: string) => void
}

/** 汎用的な入力フィールドコンポーネント */
export const InputField = ({
  label,
  value,
  error,
  placeholder,
  onChange
}: props) => {
  return (
    <div className="mb-8">
      <label className="block text-xl font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {onChange(e.target.value)}}
        className="w-full border px-3 py-2 rounded"
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}