# kamo-crowdfunding

KAMOファンディングのクラウドファンディングサイト（**SaaS型／マルチテナント**）。
1つのプログラムで複数のクラファンサイトを運用する。最初のサイトは
**KAMOファインディング**（配色B＝赤×金）。

- PRD: v0.6（Product Manager）
- モック: Designer（配色2案・主要4画面）
- 既存の集客サイト `kamo-funding-app` とは**別プログラム**。既存アプリ・既存DBテーブルは変更しない
- DBは既存の Supabase プロジェクトを共用し、**新規テーブルを足す**（`supabase/kamo-saas-schema-v1.sql`）

## 第1段のスコープ

| # | 内容 | 実装場所 |
| --- | --- | --- |
| ① | 新規リポジトリ（Next.js + TypeScript） | このリポジトリ |
| ② | データ設計SQL（コメントなし・冪等・1ファイル） | `supabase/kamo-saas-schema-v1.sql` |
| ③ | ホスト（ドメイン）でサイトを判定しテーマで描画 | `src/lib/sites.ts` / `src/middleware.ts` |
| ④ | KAMOサイトの3画面（トップ／案件一覧／案件詳細） | `src/app/page.tsx` / `src/app/projects/**` |
| ⑤ | サイトごとのテーマ（CSS変数 ← `sites.theme`） | `src/lib/theme.ts` / `src/app/globals.css` |
| ⑥ | 決済・会員認証はスタブ（画面のみ） | `/projects/[slug]/pledge`・`/login`・`/signup` |

## 起動

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## サイト（テナント）の判定

1. リクエストのホスト名を `sites.domain` と突合（`www.` の有無は吸収）
2. DB（`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` が設定済みのとき）を優先
3. DB が未設定・テーブル未作成・失敗時は `src/lib/site-config.ts` の同梱定義にフォールバック
   （第1段ではSQLをまだ実行しないため、同梱定義で動く）
4. 一致しなければ既定サイト（KAMO）

プレビュー用に `?site=<slug>` でサイトを切り替えられる（例 `?site=mirai-no-tobira`）。
これは検証用で、本番ドメインの判定には影響しない。

## テーマ（配色）

配色は `sites.theme`（JSONB）→ CSS 変数 → 全画面、の順で適用する。
サイトを増やすときは `sites` に1行足す（テーマを差し替える）だけでよい。
`theme.variant`（`a`/`b`）は、CSS変数では表せない構造上の差
（見出しの下線色・進捗バーのグラデーション・注目バッジの地色）だけに使う。

## 現状の制約

- 表示データは**ダミーのみ**（`src/lib/data.ts`）。個人情報は入れていない
- 画像はプレースホルダー（`public/images/*.png`）。実案件の写真に差し替える前提
- ロゴは仮（`public/brand/kamo-logo.svg`）
- 決済・会員認証・管理画面・データ移行は次段
- DNS と Vercel のドメイン設定は変更しない（確認はプレビューURLで）
