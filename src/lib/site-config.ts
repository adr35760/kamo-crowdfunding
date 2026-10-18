import type { Site } from "./types";
import { THEME_A, THEME_B } from "./theme";

/**
 * サイト（テナント）の定義。
 *
 * 本来は `sites` テーブル（PRD §5.6）が唯一の出所で、ホスト名から
 * `sites.domain` を引いて判定する。ただし第1段ではまだ SQL を実行しない
 * （PRD §5.3 / PM 指示）ため、`sites` に投入する内容と同じものを
 * ここに同梱し、DB 未適用でも全画面が動くようにしている。
 * SQL 実行後は src/lib/sites.ts が DB を優先して読む（DB に無い/読めない
 * ときだけこの定義にフォールバックする）。
 */
export const SITES: Site[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "kamo",
    name: "KAMOファインディング",
    domain: "www.kamofunding.com",
    logoUrl: "/brand/kamo-logo.svg",
    theme: THEME_B, // 案B＝赤×金（t iku 決定 2026-10-18）
    contactEmail: "info@local-creation.com",
    status: "active",
    copy: {
      conceptTitle: "夢の実現装置",
      conceptDescription:
        "夢の実現に向けて、企画の方針・拡散とリアルなつながり・終了後のマネタイズを合わせてサポートする国内唯一の伴走型サイトです。",
      footerNote: "夢の実現装置 ─ 伴走型クラウドファンディング",
      copyright: "© KAMO FUNDING / Tokyo Kamogashira Land Co., Ltd.",
    },
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "mirai-no-tobira",
    name: "未来の扉",
    // ドメインは未定（PRD §5.6）。サイトごとのテーマ切替の検証用に
    // 仮のドメインを置いている。確定したらここ（と sites.domain）を差し替える。
    domain: "mirai-no-tobira.example.com",
    logoUrl: "/brand/kamo-logo.svg",
    theme: THEME_A, // 仮。未来の扉の配色が決まったら theme を差し替える
    contactEmail: "info@local-creation.com",
    status: "active",
    copy: {
      conceptTitle: "夢の実現装置",
      conceptDescription:
        "夢の実現に向けて、企画の方針・拡散とリアルなつながり・終了後のマネタイズを合わせてサポートする国内唯一の伴走型サイトです。",
      footerNote: "夢の実現装置 ─ 伴走型クラウドファンディング",
      copyright: "© 未来の扉",
    },
  },
];

/** どのホストにも一致しなかったときに使うサイト（プレビュー用の既定） */
export const DEFAULT_SITE_SLUG = "kamo";
