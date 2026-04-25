/* プロフィール画像のURLを表示用に整形する */
export const getProfileImageUrl = (path?: string | null) => {
  if (!path) return undefined;

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/^\/?storage\//, "");
  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL ?? "";

  if (/^https?:\/\//.test(apiBaseUrl)) {
    const origin = apiBaseUrl.replace(/\/api\/?$/, "");
    return `${origin}/storage/${normalizedPath}`;
  }

  return `http://127.0.0.1:8000/storage/${normalizedPath}`;
};
