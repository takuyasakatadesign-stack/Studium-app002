# スタジアム運営最適化システム Prototype

プロサッカークラブのホームゲーム運営を一元管理するWebプロトタイプです。

Next.js App Router / TypeScript / Tailwind CSS / shadcn/ui を使い、DBや本番認証は使わず、mock data とブラウザ内の簡易状態管理で動作します。

## プロトタイプの前提

- DBは未接続です。
- 本番認証は未実装です。
- ロールログインは cookie を使った簡易認証です。
- 管理画面の編集データは React Context と localStorage に保存されます。
- 編集内容は同一ブラウザ内での確認用です。
- ブラウザや端末を変えると、保存状態は共有されません。

## ローカル起動方法

```bash
npm install
npm run dev
```

ブラウザで以下を開きます。

```txt
http://localhost:3000
```

本番相当の確認をする場合:

```bash
npm run build
npm run start
```

## Renderデプロイ手順

1. このリポジトリをGitHubへpushします。
2. Renderで `New +` から `Web Service` を選択します。
3. 対象のGitHubリポジトリを接続します。
4. 以下の設定でWeb Serviceを作成します。

## Renderの設定値

| 項目 | 値 |
|---|---|
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |
| Node Version | `>=20.18.0` |
| Environment Variables | アプリ用の環境変数は不要 |

アプリ用の環境変数は現在不要です。RenderでNodeバージョンを固定したい場合のみ、`NODE_VERSION=20.18.0` を設定してください。DB、本番認証、外部ストレージを導入する段階で追加します。

`render.yaml` も同梱しているため、Render Blueprintとして作成する場合は同じ設定を利用できます。

## Renderで確認すべきURL

Renderの公開URLを `https://your-service.onrender.com` とした場合:

```txt
https://your-service.onrender.com/
https://your-service.onrender.com/gourmet
https://your-service.onrender.com/gourmet/shops/shop-001
https://your-service.onrender.com/gourmet/items/item-001
https://your-service.onrender.com/login
https://your-service.onrender.com/admin
https://your-service.onrender.com/shop-admin
https://your-service.onrender.com/internal
```

管理系ページは未ログインの場合 `/login` にリダイレクトされます。

## 簡易ログイン

`/login` で以下のロールを選択できます。

- 管理者: `/admin` `/shop-admin` `/internal`
- クラブ社員: `/admin` `/internal`
- 売店スタッフ: `/shop-admin`

これはプロトタイプ用の簡易ログインです。本番認証ではありません。

## 本番化時に必要な作業

- Supabase等のDB設計と接続
- mock data / localStorage からDB保存への置き換え
- NextAuth、Supabase Auth等による本番認証
- ユーザー、部署、売店、試合単位の権限管理
- 画像アップロードとメディア管理
- 監査ログ、更新履歴、公開承認フロー
- APIレイヤーの本実装
- E2Eテスト、権限別テスト、実機スマホ検証
- 本番用環境変数、HTTPS、運用監視の設定
