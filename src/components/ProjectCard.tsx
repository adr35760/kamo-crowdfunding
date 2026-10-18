import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const yen = (n: number) => n.toLocaleString("ja-JP");
const pct = (p: Project) => Math.round((p.collectedAmount / p.goalAmount) * 100);

/** モックの card()。達成率を主役数字として単独で立てる（PRD §3） */
export function ProjectCard({ project }: { project: Project }) {
  const bar = Math.min(pct(project), 100);
  return (
    <Link className="pcard" href={`/projects/${project.slug}`}>
      <div className="pcard__thumb">
        {project.isFeatured ? <span className="pcard__badge">注目</span> : null}
        <Image
          src={project.mainImageUrl}
          alt=""
          fill
          sizes="(max-width: 767px) 45vw, 325px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="pcard__bd">
        <div className="pcard__t">{project.title}</div>
        <div className="pcard__tags">
          {project.genreTags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="pcard__metric">
          <span className="pcard__pct">
            {yen(pct(project))}
            <i>%</i>
          </span>
          <span className="pcard__sup">{project.supporterCount}人が支援</span>
        </div>
        <div className="pcard__bar">
          <span style={{ width: `${bar}%` }} />
        </div>
        <div className="pcard__foot">
          <span>目標 ¥{yen(project.goalAmount)}</span>
          <span className={project.endingSoon ? "soon" : undefined}>
            {project.remainingLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
