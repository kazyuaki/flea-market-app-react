import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { usePersistentForm } from "./usePersistentForm";

export type FormErrors<T> = Partial<Record<keyof T, string[]>>;
type ToastState = {
  message: string;
  variant: "success" | "error";
};

type UseFormParams<T extends object> = {
  storageKey: string;
  initialForm: T;
  validate: (form: T) => FormErrors<T>;
  submit: (form: T) => Promise<void>;
  onServerValidationError?: (errors: FormErrors<T>) => void;
  successMessage?: string;
  errorMessage?: string;
  persist?: boolean;
};

/** 汎用的なフォームのロジックを管理するカスタムフック */
export const useForm = <T extends object>({
  storageKey,
  initialForm,
  validate,
  submit,
  onServerValidationError,
  successMessage,
  errorMessage = "エラーが発生しました。時間を置いて再度お試しください。",
  persist = true,
}: UseFormParams<T>) => {
  const { form, setForm, clearStoredForm } = usePersistentForm<T>(
    storageKey,
    initialForm,
    { disabled: !persist },
  );

  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialForm).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {} as Record<keyof T, boolean>,
    ),
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const clientErrors = validate(form);

  const getError = (key: keyof T) => {
    if (errors[key]) return errors[key];
    if (touched[key] || submitted) return clientErrors[key];
    return undefined;
  };

  const displayErrors = Object.keys(initialForm).reduce(
    (acc, key) => ({
      ...acc,
      [key]: getError(key as keyof T),
    }),
    {} as FormErrors<T>,
  );

  const hasErrors = (Object.values(clientErrors) as Array<string[] | undefined>)
    .some((value) => value && value.length > 0);
  const hasTouchedFields = Object.values(touched).some(Boolean);
  const isSubmitDisabled = (hasTouchedFields || submitted) && hasErrors;

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  // フォームの入力変更を処理する関数
  const handleChange = (key: keyof T, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // フォームの送信処理
  const handleSubmit = async () => {
    setSubmitted(true);
    setLoading(true);
    setErrors({});

    if (hasErrors) {
      setLoading(false);
      return false;
    }

    try {
      await submit(form);
      clearStoredForm();

      if (successMessage) {
        setToast({
          message: successMessage,
          variant: "success",
        });
      }

      return true;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422 && error.response.data.errors) {
          const serverErrors = error.response.data.errors as FormErrors<T>;
          setErrors(serverErrors);
          onServerValidationError?.(serverErrors);
          return false;
        } else {
          setToast({
            message: errorMessage,
            variant: "error",
          });
        }
      } else {
        setToast({
          message: errorMessage,
          variant: "error",
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    displayErrors,
    isSubmitDisabled,
    loading,
    toast,
    handleChange,
    handleSubmit,
  };
};
