import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PledgeForm } from "@/components/PledgeForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projectBySlug, rewardsForProject } from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  const project = projectBySlug(params.slug);
  return { title: project ? `支援する｜${project.title}` : "支援する" };
}

/** 支援（PRD §6-5 / 決済は未接続のスタブ） */
export default async function PledgePage({ params }: Params) {
  const site = await getCurrentSite();
  const project = projectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="crumb">
          <Link href="/">ホーム</Link> ＞ <Link href="/projects">案件一覧</Link> ＞{" "}
          <Link href={`/projects/${project.slug}`}>{project.title}</Link> ＞{" "}
          <b>支援する</b>
        </div>
        <div className="pghead">
          <h1>支援する</h1>
          <p>{project.title}</p>
        </div>
        <PledgeForm rewards={rewardsForProject(project)} />
        <div className="pager" style={{ marginTop: 36, justifyContent: "flex-start" }}>
          <Link className="btn btn--2" href={`/projects/${project.slug}`}>
            案件詳細に戻る
          </Link>
        </div>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
