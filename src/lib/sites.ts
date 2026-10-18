import { headers } from "next/headers";
import { DEFAULT_SITE_SLUG, SITES } from "./site-config";
import { THEME_B } from "./theme";
import type { Site, SiteTheme } from "./types";

/** www. を落として小文字化した比較用のホスト名 */
export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  return host
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "") // ポートを落とす
    .replace(/^www\./, "");
}

function matchConfigSite(host: string, slugOverride?: string | null): Site | null {
  if (slugOverride) {
    const bySlug = SITES.find((s) => s.slug === slugOverride);
    if (bySlug) return bySlug;
  }
  const h = normalizeHost(host);
  if (!h) return null;
  const exact = SITES.find((s) => s.domain && normalizeHost(s.domain) === h);
  if (exact) return exact;
  // サブドメイン（例: kamo.kamofunding.com）でも親ドメインのサイトに寄せる
  const parent = SITES.find(
    (s) => s.domain && h.endsWith(`.${normalizeHost(s.domain)}`),
  );
  return parent ?? null;
}

function defaultSite(): Site {
  return SITES.find((s) => s.slug === DEFAULT_SITE_SLUG) ?? SITES[0];
}

/** sites.theme に欠けているキーを既定テーマで埋める */
function normalizeTheme(raw: unknown): SiteTheme {
  if (!raw || typeof raw !== "object") return THEME_B;
  const merged = { ...THEME_B, ...(raw as Partial<SiteTheme>) };
  merged.variant = merged.variant === "a" ? "a" : "b";
  return merged;
}

/**
 * `sites` テーブルからホスト名（sites.domain）でサイトを引く。
 * - 環境変数が無い / テーブル未作成 / 通信失敗 のいずれでも null を返し、
 *   呼び出し側が同梱定義（site-config）へフォールバックする。
 *   （クライアント生成自体を try の中に入れているのは、環境変数欠落時に
 *     生成時点で例外になるため。落ちると全画面が表示できなくなる。）
 */
async function getSiteFromDb(host: string): Promise<Site | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const h = normalizeHost(host);
    const candidates = Array.from(new Set([h, `www.${h}`].filter(Boolean)));
    const { data, error } = await supabase
      .from("sites")
      .select("id,slug,name,domain,logo_url,theme,contact_email,status")
      .in("domain", candidates)
      .limit(1)
      .maybeSingle();
    if (error || !data) return null;

    const row = data as Record<string, unknown>;
    const slug = String(row.slug ?? "");
    const fallbackCopy = SITES.find((s) => s.slug === slug)?.copy ?? {
      conceptTitle: "夢の実現装置",
      conceptDescription:
        "夢の実現に向けて、企画の方針・拡散とリアルなつながり・終了後のマネタイズを合わせてサポートする国内唯一の伴走型サイトです。",
      footerNote: "夢の実現装置 ─ 伴走型クラウドファンディング",
      copyright: `© ${String(row.name ?? "")}`,
    };

    return {
      id: String(row.id),
      slug,
      name: String(row.name ?? ""),
      domain: (row.domain as string | null) ?? null,
      logoUrl: (row.logo_url as string | null) ?? null,
      theme: normalizeTheme(row.theme),
      contactEmail: (row.contact_email as string | null) ?? null,
      status: (row.status as Site["status"]) ?? "active",
      copy: fallbackCopy,
    };
  } catch {
    return null;
  }
}

/**
 * このリクエストを描画するサイトを決める。
 * 1. middleware が入れた x-site-slug（`?site=<slug>` のプレビュー用）
 * 2. sites テーブルの sites.domain（DB が使えるとき）
 * 3. 同梱定義の domain（DB 未適用でも動く）
 * 4. 既定サイト（KAMO）
 */
export async function getCurrentSite(): Promise<Site> {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const slugOverride = h.get("x-site-slug");

  if (slugOverride) {
    const bySlug = SITES.find((s) => s.slug === slugOverride);
    if (bySlug) return bySlug;
  }

  const fromDb = await getSiteFromDb(host);
  if (fromDb) return fromDb;

  return matchConfigSite(host, null) ?? defaultSite();
}

/** 案件・リターンは site_id で絞る（ダミーデータ側の絞り込みにも使う） */
export function siteBySlug(slug: string): Site | null {
  return SITES.find((s) => s.slug === slug) ?? null;
}
