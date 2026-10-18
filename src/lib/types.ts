/**
 * ドメイン型定義。
 * DB（supabase）のテーブル定義（sites / projects / rewards / pledges / users）に
 * 対応させてある。DB 未適用のあいだはダミーデータ（src/lib/data.ts）で描画する。
 */

/** sites.theme（JSONB）に入る配色トークン。CSS 変数へ1対1で写す */
export type SiteTheme = {
  /** モックの .theme-a / .theme-b に対応する構造上の差の識別子 */
  variant: "a" | "b";
  bg: string;
  bgAlt: string;
  ink: string;
  text: string;
  sub: string;
  line: string;
  accent: string;
  gold: string;
  ctaBg: string;
  ctaFg: string;
  btn2Bg: string;
  btn2Fg: string;
  tagBg: string;
  tagLine: string;
  tagFg: string;
  tagOnBg: string;
  tagOnFg: string;
  chipBg: string;
  numC: string;
  track: string;
  cardLine: string;
  panel: string;
  radius: string;
};

/** sites テーブルの1行（アプリが使う列だけ） */
export type Site = {
  id: string;
  slug: string;
  name: string;
  /** 独自ドメイン。ホスト名でこの値に一致したサイトを描画する */
  domain: string | null;
  logoUrl: string | null;
  theme: SiteTheme;
  contactEmail: string | null;
  status: "active" | "paused" | "archived";
  /** サイト固有のコピー（トップの見出し等） */
  copy: {
    conceptTitle: string;
    conceptDescription: string;
    footerNote: string;
    copyright: string;
  };
};

export type GenreTag = {
  label: string;
  slug: string;
};

export type ProjectStatus =
  | "draft"
  | "submitted"
  | "reviewing"
  | "rejected"
  | "upcoming"
  | "live"
  | "completed"
  | "cancelled";

/** projects テーブルの1行（アプリが使う列だけ） */
export type Project = {
  id: string;
  siteId: string;
  slug: string;
  title: string;
  summary: string;
  mainImageUrl: string;
  genreTags: string[];
  goalAmount: number;
  collectedAmount: number;
  supporterCount: number;
  endAt: string;
  /** 表示用の残り/終了ラベル（ダミー） */
  remainingLabel: string;
  isFeatured: boolean;
  endingSoon: boolean;
  isNew: boolean;
  creator: Creator;
  story: string[];
  storyImages: string[];
  galleryImages: string[];
  fundingBreakdown: string;
  projectType: "goal" | "commit";
  periodLabel: string;
};

export type Creator = {
  name: string;
  initials: string;
  tags: string[];
  profile: string;
  reportCount: number;
  pastProjectCount: number;
};

/** rewards テーブルの1行（アプリが使う列だけ） */
export type Reward = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  price: number;
  quantityLimit: number | null;
  claimedCount: number;
  deliveryEstimate: string;
  isActive: boolean;
};

export type PledgeMessage = {
  initials: string;
  name: string;
  date: string;
  body: string;
};
