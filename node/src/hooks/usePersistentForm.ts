import { useEffect, useState } from "react";

type PersistentFormOptions<T extends Record<string, unknown>> = {
  hydrate?: (parsed: Record<string, unknown>, initialValue: T) => T;
  serialize?: (form: T) => Record<string, unknown>;
};

// localStorage からフォームの値を読み取る関数
const readStoredValue = <T extends Record<string, unknown>>(
  storageKey: string,
  initialValue: T,
  options?: PersistentFormOptions<T>,
): T => {
  const storedValue = localStorage.getItem(storageKey);

  if (!storedValue) return initialValue;

  try {
    const parsed = JSON.parse(storedValue) as Record<string, unknown>;

    if (options?.hydrate) {
      return options.hydrate(parsed, initialValue);
    }

    return Object.fromEntries(
      Object.entries(initialValue).map(([key, value]) => [
        key,
        typeof value === "string" && typeof parsed[key] === "string"
          ? parsed[key]
          : value,
      ]),
    ) as T;
  } catch {
    return initialValue;
  }
};

/** localStorage にフォーム値を保持する共通フック */
export const usePersistentForm = <T extends Record<string, unknown>>(
  storageKey: string,
  initialValue: T,
  options?: PersistentFormOptions<T>,
) => {
  const [form, setForm] = useState<T>(() =>
    readStoredValue(storageKey, initialValue, options),
  );

  useEffect(() => {
    const serializedForm = options?.serialize ? options.serialize(form) : form;
    localStorage.setItem(storageKey, JSON.stringify(serializedForm));
  }, [form, options, storageKey]);

  const clearStoredForm = () => {
    localStorage.removeItem(storageKey);
  };

  return {
    form,
    setForm,
    clearStoredForm,
  };
};
