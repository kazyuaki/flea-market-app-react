export type Field<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  optional?: boolean;
};
