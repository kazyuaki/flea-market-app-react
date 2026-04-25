# Backend

Laravel API です。認証には Laravel Sanctum と Fortify を使っています。

## 起動

Docker Compose で起動する場合は、リポジトリルートで次を実行します。

```bash
docker compose up -d --build
docker compose exec php composer install
docker compose exec php cp .env.example .env
docker compose exec php php artisan key:generate
docker compose exec php php artisan migrate --seed
docker compose exec php php artisan storage:link
```

`api/.env` は Docker Compose の MySQL / MailHog に合わせて設定してください。詳細はリポジトリルートの `README.md` を参照してください。

## 主な構成

- `routes/api.php`: フロントエンドから呼び出すAPI
- `routes/web.php`: メール認証リンク、認証メール再送
- `app/Http/Controllers/Api`: APIコントローラ
- `app/Http/Requests`: バリデーション
- `database/seeders`: 初期ユーザー、カテゴリ、商品データ

## テスト

```bash
php artisan test
```
