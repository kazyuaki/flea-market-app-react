import { useState } from "react"
import eye from "../../assets/eye.png"

type props = {
  label: string
  value: string
  error?: string
  placeholder?: string
  type?: "text" | "password" | "email"
  className?: string
  labelClassName?: string
  onChange: (value: string) => void
}

/** 汎用的な入力フィールドコンポーネント */
export const InputField = ({
  label,
  value,
  error,
  placeholder,
  type = "text",
  className = "",
  labelClassName = "text-xl font-bold",
  onChange
}: props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const inputType =
    type === "password" && isPasswordVisible ? "text" : type

  return (
    <div className={`mb-10 ${className}`}>
      <label className={`block mb-3 ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {onChange(e.target.value)}}
          className="w-full border rounded px-3 py-2 pr-12"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label={isPasswordVisible ? "パスワードを隠す" : "パスワードを表示する"}
          >
            <img
              src={eye}
              alt=""
              className={`h-5 w-5 ${isPasswordVisible ? "opacity-100" : "opacity-60"}`}
            />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
