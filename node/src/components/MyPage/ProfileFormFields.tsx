import { profileFields } from "../../constants/profile/profileFields"
import type { ProfileInput } from "../../types/profile"
import type { ProfileErrors } from "../../utils/validation/profile"
import { InputField } from "../Common/InputField"

type Props = {
  form: ProfileInput
  displayErrors: ProfileErrors
  onChange: (key: keyof ProfileInput, value: string) => void
}

/** プロフィール入力欄一覧 */
export const ProfileFormFields = ({
  form,
  displayErrors,
  onChange,
}: Props) => {
  return (
    <>
      {profileFields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          value={form[field.name] ?? ""}
          error={displayErrors[field.name]?.[0]}
          placeholder={field.placeholder}
          type={field.type}
          className="mx-auto"
          required={!field.optional}
          onChange={(value) => onChange(field.name, value)}
        />
      ))}
    </>
  )
}
