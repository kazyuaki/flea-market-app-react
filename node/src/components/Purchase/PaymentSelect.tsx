import { useEffect, useRef, useState } from "react"

const PAYMENT_OPTIONS = [
  { value: "1", label: "コンビニ支払い" },
  { value: "2", label: "カード支払い" },
]

/** 支払い方法選択コンポーネント */
export const PaymentSelect = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedPaymentLabel =
    PAYMENT_OPTIONS.find((option) => option.value === paymentMethod)?.label ??
    "選択してください"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (value: string) => {
    setPaymentMethod(value)
    setIsOpen(false)
  }

  return (
    <>
      {/* 支払い方法 */ }
        <div className="mt-8 border-b border-gray-500 mb-10 pb-10">
          <h3 className="mb-10 text-3xl font-bold">支払い方法</h3>
          <div ref={dropdownRef} className="relative mr-10 inline-block w-80">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded border border-gray-500 bg-white py-3 pl-5 pr-5 text-left text-lg xl:text-xl"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span>{selectedPaymentLabel}</span>
              <span className="text-xl text-gray-500">▼</span>
            </button>

            {isOpen && (
              <div
                role="listbox"
                className="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded border border-gray-500 bg-white text-lg shadow-lg xl:text-xl"
              >
                {PAYMENT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={paymentMethod === option.value}
                    className={`block w-full px-5 py-3 text-left transition ${
                      paymentMethod === option.value
                        ? "bg-blue-50 font-bold text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
    </>
  )
}
