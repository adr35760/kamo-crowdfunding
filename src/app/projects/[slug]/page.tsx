import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  PLEDGE_MESSAGES,
  projectBySlug,
  rewardsForProject,
} from "@/lib/data";
import { getCurrentSite } from "@/lib/sites";
import type { Project, Reward } from "@/lib/types";

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  const project = projectBySlug(params.slug);
  if (!project) return { title: "案件が見つかりません" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.mainImageUrl }],
    },
  };
}

const yen = (n: number) => n.toLocaleString("ja-JP");
const pct = (p: Project) => Math.round((p.collectedAmount / p.goalAmount) * 100);

const STEPS = [
  {
    no: "01",
    title: "企画の方針",
    body: "何を、誰に、どう届けるか。企画書とリターン設計を運営が伴走して固めます。",
  },
  {
    no: "02",
    title: "拡散",
    body: "説明会・SNS・パートナー網をつないで、初動の支援を集めます。",
  },
  {
    no: "03",
    title: "リアルなつながり",
    body: "支援者と起案者が直接つながる場（ライブ・体験・交流会）を設計します。",
  },
  {
    no: "04",
    title: "終了後のマネタイズ",
    body: "作品・リターンを商品として販路につなげ、終了後も売り続けられる形にします。",
  },
];

/** モックの story ブロック。伴走4ステップと画像を本文の途中に差し込む */
function StoryBody({ project }: { project: Project }) {
  const nodes: ReactNode[] = [];
  const hasBanjo = project.story.includes("企画から終了後まで、一緒に走ります");

  project.story.forEach((line, i) => {
    if (line === "企画から終了後まで、一緒に走ります") {
      nodes.push(<h3 key={`h${i}`}>{line}</h3>);
      nodes.push(
        <div className="steps" key={`steps${i}`}>
          {STEPS.map((s) => (
            <div className="step" key={s.no}>
              <u>{s.no}</u>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>,
      );
      return;
    }
    if (line === "資金の使いみち" || line === "起案者プロフィール") {
      if (line === "起案者プロフィール" && hasBanjo) {
        nodes.push(
          <Image
            key={`img2`}
            src={project.storyImages[1] ?? project.storyImages[0]}
            alt=""
            width={1100}
            height={733}
          />,
        );
      }
      nodes.push(<h3 key={`h${i}`}>{line}</h3>);
      return;
    }
    nodes.push(<p key={`p${i}`}>{line}</p>);
    if (i === 1) {
      nodes.push(
        <Image
          key={`img1`}
          src={project.storyImages[0]}
          alt=""
          width={1100}
          height={733}
        />,
      );
    }
  });

  return <div className="story">{nodes}</div>;
}

function rewardLeftLabel(r: Reward): { label: string; soldOut: boolean } {
  const soldOut = r.quantityLimit !== null && r.claimedCount >= r.quantityLimit;
  if (soldOut) return { label: "SOLD OUT", soldOut: true };
  if (r.quantityLimit !== null) {
    return { label: `残り${r.quantityLimit - r.claimedCount}`, soldOut: false };
  }
  // 数量無制限のリターンは、モックの表示（=支援済み数）に合わせている
  return { label: `残り${r.claimedCount}`, soldOut: false };
}

/** 案件詳細（PRD §6-4 / モック 4.案件詳細） */
export default async function ProjectDetailPage({ params }: Params) {
  const site = await getCurrentSite();
  const project = projectBySlug(params.slug);
  if (!project) notFound();

  const rewards = rewardsForProject(project);
  const remainingMatch = project.remainingLabel.match(/(\d+)/);
  const gallery = project.galleryImages;

  return (
    <>
      <SiteHeader site={site} />
      <div className="wrap">
        <div className="hero">
          <div className="hero__visual">
            <Image
              src={gallery[0]}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 1060px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className="hero__thumbs">
            {gallery.map((src, i) => (
              <div className={`hero__thumb${i === 0 ? " on" : ""}`} key={src}>
                <Image src={src} alt="" width={86} height={58} />
              </div>
            ))}
          </div>
          <h1 className="hero__t">{project.title}</h1>
          <div className="author">
            <div className="author__av">{project.creator.initials}</div>
            <div className="author__n">{project.creator.name}</div>
            <div className="author__tags">
              {project.creator.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="progress">
            <span style={{ width: `${Math.min(pct(project), 100)}%` }} />
          </div>
          <div className="nums">
            <div className="num">
              <i>達成度</i>
              <b>
                {yen(pct(project))}
                <span>%</span>
              </b>
            </div>
            <div className="num">
              <i>支援総額</i>
              <b className="w">
                {yen(project.collectedAmount)}
                <span>円</span>
              </b>
            </div>
            <div className="num">
              <i>支援者数</i>
              <b>
                {project.supporterCount}
                <span>人</span>
              </b>
            </div>
            <div className="num">
              <i>残り日数</i>
              {remainingMatch ? (
                <b>
                  {remainingMatch[1]}
                  <span>日</span>
                </b>
              ) : (
                <b className="w">{project.remainingLabel}</b>
              )}
            </div>
          </div>
          <div className="hero__note">
            {project.projectType === "commit"
              ? "目標金額に達しなかった場合も、期間内に集まった金額でプロジェクトを実施します（実行確約型）。"
              : "目標金額に達した場合にプロジェクトを実施します（目標達成型）。"}
            募集期間：{project.periodLabel}
          </div>
          <div className="btns">
            <Link className="btn" href={`/projects/${project.slug}/pledge`}>
              リターンを選んで支援する
            </Link>
            <span
              className="btn btn--2 btn--stub"
              role="link"
              aria-disabled="true"
              title="第1段では未接続です"
            >
              起案者に問い合わせる
            </span>
          </div>
        </div>

        <div className="tabs">
          <span className="tab tab--on">キャンペーン</span>
          <span className="tab">リターン一覧</span>
          <span className="tab">
            活動報告<span className="bd">{project.creator.reportCount}</span>
          </span>
          <span className="tab">
            コメント<span className="bd">{PLEDGE_MESSAGES.length + 92}</span>
          </span>
        </div>

        <div className="dbody">
          <nav className="toc">
            <div className="on">このプロジェクトについて</div>
            <div>伴走サポート</div>
            <div>資金の使いみち</div>
            <div>リターン一覧</div>
            <div>起案者プロフィール</div>
          </nav>
          <div>
            <StoryBody project={project} />

            <div className="rwhd">
              <h3>リターン一覧</h3>
              <span>全{rewards.length}コース／決済は後続フェーズで接続</span>
            </div>
            <div className="rewards">
              {rewards.map((r) => {
                const { label, soldOut } = rewardLeftLabel(r);
                return (
                  <div className={`rw${soldOut ? " rw--out" : ""}`} key={r.id}>
                    {soldOut ? <span className="rw__flag">SOLD OUT</span> : null}
                    <div className="rw__p">
                      ¥{yen(r.price)}
                      <span />
                    </div>
                    <div className="rw__t">{r.title}</div>
                    <div className="rw__d">{r.description}</div>
                    <div className="rw__meta">
                      <span className="left">{label}</span>
                      <span>{r.deliveryEstimate}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rwhd">
              <h3>応援メッセージ</h3>
              <span>{PLEDGE_MESSAGES.length + 92}件</span>
            </div>
            <div className="cmts">
              {PLEDGE_MESSAGES.map((m) => (
                <div className="cmt" key={m.name}>
                  <div className="cmt__av">{m.initials}</div>
                  <div>
                    <div className="cmt__n">
                      {m.name} <span>{m.date}</span>
                    </div>
                    <div className="cmt__t">{m.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="owner">
              <div className="owner__av">{project.creator.initials}</div>
              <div>
                <div className="owner__n">{project.creator.name}</div>
                <div className="owner__d">
                  プロフィール：{project.creator.profile}
                  <br />
                  活動報告 {project.creator.reportCount}件／過去のプロジェクト{" "}
                  {project.creator.pastProjectCount}件
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mcta">
        <div className="mcta__n">
          <b>{yen(pct(project))}%</b>
          <span>支援総額 ¥{yen(project.collectedAmount)}</span>
        </div>
        <Link className="btn" href={`/projects/${project.slug}/pledge`}>
          支援する
        </Link>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
