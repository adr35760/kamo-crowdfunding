import Image from "next/image";
import Link from "next/link";
import { TAGS } from "@/lib/data";
import type { Site } from "@/lib/types";

/** モックの footer() */
export function SiteFooter({ site }: { site: Site }) {
  return (
    <footer className="ft">
      <div className="ft__in">
        <div>
          <Image
            className="ft__logo"
            src={site.logoUrl ?? "/brand/kamo-logo.svg"}
            alt={site.name}
            width={210}
            height={32}
          />
          <p style={{ marginTop: 8 }}>{site.copy.footerNote}</p>
        </div>
        <div>
          <h5>さがす</h5>
          <Link href="/projects">案件一覧</Link>
          {TAGS.slice(0, 3).map((t) => (
            <Link key={t.slug} href={`/tags/${t.slug}`}>
              {t.label}
            </Link>
          ))}
        </div>
        <div>
          <h5>はじめる</h5>
          <Link href="/projects">掲載を申し込む</Link>
          <Link href="/projects">説明会に参加する</Link>
          <Link href="/projects">手数料について</Link>
        </div>
        <div>
          <h5>運営</h5>
          <Link href="/projects">会社概要</Link>
          <Link href="/projects">利用規約</Link>
          <Link href="/projects">プライバシーポリシー</Link>
          <Link href="/projects">お問い合わせ</Link>
        </div>
      </div>
      <div className="ft__c">{site.copy.copyright}</div>
    </footer>
  );
}
