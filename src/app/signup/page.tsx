import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentSite } from "@/lib/sites";

export const metadata: Metadata = { title: "会員登録" };

/** 会員登録（スタブ）。登録は「メールとGoogleのみ」（PRD §9 決定済み） */
export default async function SignupPage() {
  const site = await getCurrentSite();
  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="pghead">
          <h1>会員登録</h1>
          <p>メールアドレスとGoogleアカウントのみで登録できます</p>
        </div>
        <div className="stub">
          <b>この画面はスタブです。</b>
          会員認証は第1段では未接続です（画面のみ）。登録がなくても支援はできます。
        </div>
        <form className="form">
          <div className="field">
            <label htmlFor="signup-name">お名前</label>
            <input id="signup-name" type="text" placeholder="山田 太郎" />
          </div>
          <div className="field">
            <label htmlFor="signup-email">メールアドレス</label>
            <input id="signup-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="signup-password">パスワード</label>
            <input id="signup-password" type="password" placeholder="••••••••" />
            <span className="hint">8文字以上</span>
          </div>
          <div className="btns" style={{ marginTop: 4 }}>
            <button type="button" className="btn" disabled>
              会員登録する（未接続）
            </button>
            <button type="button" className="btn btn--2" disabled>
              Googleで登録（未接続）
            </button>
          </div>
        </form>
        <div className="pager" style={{ marginTop: 28, justifyContent: "flex-start" }}>
          <Link className="btn btn--2" href="/login">
            ログインへ
          </Link>
        </div>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
