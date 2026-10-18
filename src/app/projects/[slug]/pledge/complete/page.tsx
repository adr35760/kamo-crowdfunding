import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projectBySlug } from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  const project = projectBySlug(params.slug);
  return { title: project ? `支援完了｜${project.title}` : "支援完了" };
}

/** 支援完了（PRD §6-6 / 決済は未接続のスタブ） */
export default async function PledgeCompletePage({ params }: Params) {
  const site = await getCurrentSite();
  const project = projectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="pghead">
          <h1>支援が完了しました（スタブ）</h1>
          <p>{project.title}</p>
        </div>
        <div className="stub">
          <b>この画面はスタブです。</b>
          決済は第1段では未接続のため、実際の支払いは発生していません。
          決済（ソフトバンクペイメント）を接続したあとに、この画面へ
          支援番号・お支払い方法・リターンの発送予定を表示します。
        </div>
        <div className="btns" style={{ marginTop: 22 }}>
          <Link className="btn btn--2" href={`/projects/${project.slug}`}>
            案件詳細に戻る
          </Link>
          <Link className="btn" href="/projects">
            ほかの案件を見る
          </Link>
        </div>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
