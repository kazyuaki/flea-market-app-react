type ToastProps = {
  message: string
  isVisible: boolean
  variant?: "success" | "error"
}

const toastStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-red-200 bg-red-50 text-red-900",
}

/** トースト通知コンポーネント */
export const Toast = ({
  message,
  isVisible,
  variant = "success",
}: ToastProps) => {
  if (!isVisible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-6 top-24 z-50"
    >
      <div
        className={`min-w-[260px] rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm ${toastStyles[variant]}`}
      >
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  )
}
