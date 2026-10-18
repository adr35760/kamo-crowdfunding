import type { Metadata } from "next";
import { Pager } from "@/components/Pager";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TAGS, PROJECTS } from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";

export const metadata: Metadata = { title: "案件を探す" };

/** 案件一覧（PRD §6-2 / モック 2.案件一覧）。絞り込み・並び替えは第1段では表示のみ */
export default async function ProjectsPage() {
  const site = await getCurrentSite();
  const projects = PROJECTS.slice(0, 8);

  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="pghead">
          <h1>案件を探す</h1>
          <p>掲載中の案件 {PROJECTS.length}件</p>
        </div>
        <div className="filters">
          <span className="tag tag--lg tag--on">すべて</span>
          {TAGS.map((t) => (
            <span className="tag tag--lg" key={t.slug}>
              {t.label}
            </span>
          ))}
          <input className="search" placeholder="キーワードで探す" readOnly aria-label="キーワードで探す" />
          <span className="select">新着順</span>
        </div>
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <Pager />
      </div>
      <SiteFooter site={site} />
    </>
  );
}
