import type { CategoryOption } from "../../types/category"
import { RequiredBadge } from "./RequiredBadge"

type CategorySelectProps = {
  label: string
  value: number[]
  options: CategoryOption[]
  error?: string
  labelClassName?: string
  required?: boolean
  onChange: (value: number[]) => void
}

/** カテゴリー選択用のセレクトフィールドコンポーネント */
export const CategorySelect = ({
  label,
  value,
  options,
  error,
  labelClassName = "text-xl font-bold",
  required = false,
  onChange,
}: CategorySelectProps) => {
  return (
    <div className="mb-10">
      <label className={`mb-3 flex items-center gap-2 ${labelClassName}`}>
        {label}
        {required && <RequiredBadge />}
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value.includes(option.id)

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                onChange(
                  isActive
                    ? value.filter((id) => id !== option.id)
                    : [...value, option.id],
                )
              }
              className={`
                rounded-full border px-4 py-2 text-base
                ${isActive
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-500 border-gray-300 border-dashed hover:bg-gray-100"}
              `}
            >
              {option.name}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
