import Image from "next/image";
import Link from "next/link";
import type { Site } from "@/lib/types";

/** モックの header()。検索・ログイン・会員登録は第1段ではスタブ画面へ飛ばす */
export function SiteHeader({ site }: { site: Site }) {
  return (
    <header className="hd">
      <div className="hd__in">
        <span className="burger" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <Link href="/" aria-label={`${site.name} トップ`}>
          <Image
            className="hd__logo"
            src={site.logoUrl ?? "/brand/kamo-logo.svg"}
            alt={site.name}
            width={210}
            height={32}
            priority
          />
        </Link>
        <div className="hd__search">
          <input type="text" placeholder="キーワードで探す" readOnly aria-label="キーワードで探す" />
        </div>
        <nav className="hd__nav">
          <Link href="/projects">案件を探す</Link>
          <Link href="/projects">はじめての方へ</Link>
          <Link href="/projects">掲載を申し込む</Link>
        </nav>
        <Link className="hd__ghost" href="/login">
          ログイン
        </Link>
        <Link className="hd__cta" href="/signup">
          会員登録
        </Link>
      </div>
    </header>
  );
}
