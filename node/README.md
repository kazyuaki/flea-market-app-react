# Frontend

React + TypeScript + Vite のフロントエンドです。ルートの `docker-compose.yml` では `node` サービスとして起動します。

## 起動

```bash
npm install
npm run dev
```

## スクリプト

- `npm run dev`: 開発サーバー起動
- `npm run build`: TypeScript チェック後に本番ビルド
- `npm run lint`: ESLint
- `npm run lint:fix`: ESLint 自動修正
- `npm run preview`: ビルド結果のプレビュー

## 環境変数

- `VITE_API_PROXY_TARGET`: Vite の API プロキシ先。未指定時は `http://127.0.0.1:8000`
- `VITE_APP_API_BASE_URL`: Axios の `baseURL`。未指定時は同一オリジンへの相対パス
- `VITE_MAILHOG_URL`: メール認証画面から開く MailHog URL。未指定時は `http://localhost:8025`

詳細なセットアップはリポジトリルートの `README.md` を参照してください。
