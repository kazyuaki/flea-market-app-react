/** 共通のボタンコンポーネント */
import type React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

// ボタンのスタイルを決定する関数
const getClass = ({
  disabled,
  variant,
}: {
  disabled?: boolean;
  variant?: ButtonProps["variant"];
}) => {
  if (disabled) return "bg-gray-400 cursor-not-allowed";

  switch (variant) {
    case "secondary":
      return "bg-gray-500 hover:bg-gray-600";
    case "danger":
      return "bg-red-700 hover:bg-red-800";
    default:
      return "bg-red-500 hover:bg-red-600";
  }
};

export const CommonButton = ({
  children,
  type = "button",
  disabled = false,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full py-3 rounded font-bold text-white
        transition
        ${getClass({ disabled, variant })}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
