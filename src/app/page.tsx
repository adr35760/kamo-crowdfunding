import { ConceptStrip } from "@/components/ConceptStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TagNav } from "@/components/TagNav";
import { PROJECTS } from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";

/**
 * トップ（PRD §6-1 / モック 1.トップ）
 * ヒーロー画像は置かず、注目案件の横スクロール → ジャンルタグナビ → カードグリッド。
 */
export default async function HomePage() {
  const site = await getCurrentSite();
  const featured = PROJECTS.filter((p) => p.isFeatured);
  const news = PROJECTS.slice(0, 8);
  const soon = [
    ...PROJECTS.filter((p) => p.endingSoon),
    ...PROJECTS.filter((p) => !p.endingSoon).slice(0, 3),
  ].slice(0, 4);

  return (
    <>
      <SiteHeader site={site} />
      <ConceptStrip site={site} />
      <div className="wrap">
        <section className="sec2" style={{ paddingTop: 38 }}>
          <div className="sec2__hd">
            <h2 className="sec2__t">注目の案件</h2>
            <span className="sec2__more">もっと見る</span>
          </div>
          <div className="rail">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section className="sec2" style={{ paddingTop: 44 }}>
          <div className="tagnav__hd">
            <b>ジャンルから探す</b>
            <span>タグで絞り込み（/tags/[tag]）</span>
          </div>
          <TagNav />
        </section>

        <section className="sec2">
          <div className="sec2__hd">
            <h2 className="sec2__t">新しい案件</h2>
            <span className="sec2__more">もっと見る</span>
          </div>
          <div className="grid">
            {news.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section className="sec2">
          <div className="sec2__hd">
            <h2 className="sec2__t">もうすぐ終了</h2>
            <span className="sec2__more">もっと見る</span>
          </div>
          <div className="grid">
            {soon.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
