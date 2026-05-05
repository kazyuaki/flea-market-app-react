import { useEffect } from "react"

type ConfirmDialogProps = {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isProcessing?: boolean
  variant?: "danger" | "primary"
}

const confirmButtonStyles = {
  danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
}

/** 確認ダイアログ */
export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = "キャンセル",
  onConfirm,
  onCancel,
  isProcessing = false,
  variant = "primary",
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!isOpen || isProcessing) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isProcessing, onCancel])

  if (!isOpen) return null

  const handleCancel = () => {
    if (isProcessing) return

    onCancel()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4"
      role="presentation"
      onMouseDown={handleCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>
        <p
          id="confirm-dialog-message"
          className="mt-4 text-base leading-7 text-gray-600"
        >
          {message}
        </p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isProcessing}
            className="rounded-full border border-gray-300 px-5 py-2 text-base font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`rounded-full px-5 py-2 text-base font-bold transition disabled:cursor-not-allowed ${confirmButtonStyles[variant]}`}
          >
            {isProcessing ? "処理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
