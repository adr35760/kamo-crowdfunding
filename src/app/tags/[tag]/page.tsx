import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pager } from "@/components/Pager";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TAGS, projectsByTag, tagBySlug } from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";

type Params = { params: { tag: string } };

export function generateMetadata({ params }: Params): Metadata {
  const tag = tagBySlug(params.tag);
  return { title: tag ? `${tag.label}の案件` : "タグ別の案件" };
}

/** タグ別一覧（PRD §6-3 / モック 3.タグ別一覧）。一覧と同じカードグリッド */
export default async function TagPage({ params }: Params) {
  const site = await getCurrentSite();
  const tag = tagBySlug(params.tag);
  if (!tag) notFound();

  const projects = projectsByTag(tag.label);

  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="crumb">
          ホーム ＞ タグ ＞ <b>{tag.label}</b>
        </div>
        <div className="pghead" style={{ paddingTop: 14 }}>
          <h1>{tag.label}</h1>
          <p>{tag.label}ジャンルの掲載案件 {projects.length}件</p>
        </div>
        <div className="filters" style={{ borderBottom: 0, paddingBottom: 6 }}>
          <Link className="tag tag--lg" href="/projects">
            すべて
          </Link>
          {TAGS.map((t) => (
            <Link
              key={t.slug}
              href={`/tags/${t.slug}`}
              className={`tag tag--lg${t.slug === tag.slug ? " tag--on" : ""}`}
            >
              {t.label}
            </Link>
          ))}
          <input className="search" placeholder="キーワードで探す" readOnly aria-label="キーワードで探す" />
          <span className="select">達成率順</span>
        </div>
        {projects.length > 0 ? (
          <div className="grid" style={{ marginTop: 14 }}>
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p style={{ marginTop: 18, fontSize: 12, color: "var(--sub)" }}>
            このタグの掲載案件はまだありません。
          </p>
        )}
        <Pager />
      </div>
      <SiteFooter site={site} />
    </>
  );
}
