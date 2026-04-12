import { useEffect, useState } from "react";

// localStorage からフォームの値を読み取る関数
const readStoredValue = <T extends Record<string, string>>(
  storageKey: string,
  initialValue: T,
): T => {
  const storedValue = localStorage.getItem(storageKey);

  if (!storedValue) return initialValue;

  try {
    const parsed = JSON.parse(storedValue) as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(initialValue).map(([key, value]) => [
        key,
        typeof parsed[key] === "string" ? parsed[key] : value,
      ]),
    ) as T;
  } catch {
    return initialValue;
  }
};

/** localStorage にフォーム値を保持する共通フック */
export const usePersistentForm = <T extends Record<string, string>>(
  storageKey: string,
  initialValue: T,
) => {
  const [form, setForm] = useState<T>(() => readStoredValue(storageKey, initialValue));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form, storageKey]);

  const clearStoredForm = () => {
    localStorage.removeItem(storageKey);
  };

  return {
    form,
    setForm,
    clearStoredForm,
  };
};
