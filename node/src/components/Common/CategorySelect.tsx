import type { CategoryOption } from "../../types/category"

type CategorySelectProps = {
  label: string
  value: number[]
  options: CategoryOption[]
  labelClassName?: string
  onChange: (value: number[]) => void
}

/** カテゴリー選択用のセレクトフィールドコンポーネント */
export const CategorySelect = ({
  label,
  value,
  options,
  labelClassName = "text-xl font-bold",
  onChange,
}: CategorySelectProps) => {
  return (
    <div className="mb-10">
      <label className={`block mb-3 ${labelClassName}`}>{label}</label>

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
                px-3 py-1 rounded-full border text-sm
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
    </div>
  )
}
