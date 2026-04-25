# Flea Market App

React + Laravel で構築しているフリマアプリです。フロントエンドは Vite / React / TypeScript、バックエンドは Laravel / Sanctum / Fortify、DB は MySQL を Docker Compose で動かす構成です。

## 機能

- 会員登録、ログイン、ログアウト
- メール認証と認証メール再送
- プロフィール登録、編集
- 商品一覧、商品詳細
- マイリスト表示
- 商品へのコメント投稿
- 商品出品
- 購入画面、配送先変更
- マイページでの出品商品 / 購入商品一覧

## 技術スタック

- Frontend: React 19, TypeScript, Vite, React Router, Tailwind CSS, Axios
- Backend: PHP 8.4, Laravel 13, Laravel Sanctum, Laravel Fortify
- Database: MySQL 8.0
- Infrastructure: Docker Compose, Nginx, MailHog, phpMyAdmin

## ディレクトリ構成

```text
.
├── api/                 # Laravel API
├── node/                # React frontend
├── docker/              # Docker 設定
└── docker-compose.yml
```

## URL

Docker Compose で起動した場合の主なURLです。

| サービス | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend / Nginx | http://localhost:8000 |
| phpMyAdmin | http://localhost:8080 |
| MailHog | http://localhost:8025 |

## セットアップ

### 1. コンテナ起動

```bash
docker compose up -d --build
```

### 2. Laravel 依存関係と環境設定

```bash
docker compose exec php composer install
docker compose exec php cp .env.example .env
docker compose exec php php artisan key:generate
```

`api/.env` は Docker Compose の MySQL / MailHog に合わせて、少なくとも次の値に変更します。

```env
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=root
DB_PASSWORD=root

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

### 3. DB 初期化

```bash
docker compose exec php php artisan migrate --seed
docker compose exec php php artisan storage:link
```

### 4. フロントエンド

`docker-compose.yml` の `node` サービスは `npm install && npm run dev -- --host 0.0.0.0` を実行します。起動後、http://localhost:5173/items にアクセスします。

ローカルでフロントエンドだけ動かす場合は次の通りです。

```bash
cd node
npm install
npm run dev
```

Vite の API プロキシ先は `VITE_API_PROXY_TARGET` で変更できます。未指定の場合は `http://127.0.0.1:8000` です。

## テスト / 品質チェック

```bash
# frontend
cd node
npm run lint
npm run build

# backend
docker compose exec php php artisan test
```

## シードユーザー

`php artisan migrate --seed` で以下のユーザーが作成されます。パスワードはいずれも `password` です。

| 名前 | メールアドレス |
| --- | --- |
| Admin | admin@example.com |
| Seller A | sellerA@example.com |
| Seller B | sellerB@example.com |
| Viewer | viewer@example.com |

## API 概要

主なAPIは `api/routes/api.php` に定義しています。認証は Sanctum の Cookie ベース認証です。

| Method | Path | 内容 |
| --- | --- | --- |
| GET | `/api/user` | ログイン中ユーザー取得 |
| GET | `/api/items` | 商品一覧 |
| GET | `/api/items/{id}` | 商品詳細 |
| POST | `/api/items` | 商品出品 |
| POST | `/api/items/{item}/comments` | コメント投稿 |
| GET | `/api/purchase/{item_id}` | 購入画面用データ取得 |
| GET | `/api/purchase/address/{item_id}` | 配送先取得 |
| POST | `/api/purchase/address` | 配送先更新 |
| GET | `/api/mypage/listed` | 出品商品一覧 |
| GET | `/api/mypage/purchases` | 購入商品一覧 |
| POST | `/api/mypage/profile` | プロフィール更新 |

ログイン / 登録 / ログアウトは Fortify のルートを Vite 側で `/api/auth/*` からプロキシしています。

## 現状メモ

- フロントのプロフィール更新APIは `node/src/api/profile.ts` で `/api/profile` を呼んでいますが、Laravel 側のルートは `/api/mypage/profile` です。
- フロントには購入確定の `POST /api/purchase` 呼び出しがありますが、Laravel 側のAPIルートにはまだ定義がありません。
- `api/.env.example` は Laravel 標準の SQLite 設定なので、Docker で使う場合は上記の MySQL / MailHog 設定へ変更が必要です。
