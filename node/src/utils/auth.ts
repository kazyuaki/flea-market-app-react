import type { User } from "../types/auth";

/** プロフィール設定が完了しているかを判定する */
export const isProfileCompleted = (user: User) => {
  if (typeof user.is_profile_set === "boolean") {
    return user.is_profile_set;
  }

  return user.is_profile_set === "1";
};
