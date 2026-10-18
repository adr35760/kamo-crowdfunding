import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentSite } from "@/lib/sites";

export const metadata: Metadata = { title: "ログイン" };

/**
 * ログイン（スタブ）。PRD §9 決定済みのとおり、登録は「メールとGoogleのみ」。
 * 未ログインでも支援できるため、認証は必須導線ではない。
 */
export default async function LoginPage() {
  const site = await getCurrentSite();
  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="pghead">
          <h1>ログイン</h1>
          <p>会員登録はメールアドレスとGoogleアカウントのみです</p>
        </div>
        <div className="stub">
          <b>この画面はスタブです。</b>
          会員認証は第1段では未接続です（画面のみ）。接続は次段の
          会員認証フェーズで行います。支援は未ログインでも可能です。
        </div>
        <form className="form">
          <div className="field">
            <label htmlFor="login-email">メールアドレス</label>
            <input id="login-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="login-password">パスワード</label>
            <input id="login-password" type="password" placeholder="••••••••" />
            <span className="hint">パスワードをお忘れの場合は再設定のご案内をお送りします</span>
          </div>
          <div className="btns" style={{ marginTop: 4 }}>
            <button type="button" className="btn" disabled>
              ログイン（未接続）
            </button>
            <button type="button" className="btn btn--2" disabled>
              Googleでログイン（未接続）
            </button>
          </div>
        </form>
        <div className="pager" style={{ marginTop: 28, justifyContent: "flex-start" }}>
          <Link className="btn btn--2" href="/signup">
            会員登録へ
          </Link>
        </div>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
