import type { SiteTheme } from "./types";

/**
 * sites.theme（JSONB）→ CSS 変数 の写像。
 * 配色は必ずこの関数を通して CSS 変数に落とすので、
 * サイトを増やすときは theme を足すだけで全画面に反映される。
 */
export function themeToCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--bg": theme.bg,
    "--bg-alt": theme.bgAlt,
    "--ink": theme.ink,
    "--text": theme.text,
    "--sub": theme.sub,
    "--line": theme.line,
    "--accent": theme.accent,
    "--gold": theme.gold,
    "--cta-bg": theme.ctaBg,
    "--cta-fg": theme.ctaFg,
    "--btn2-bg": theme.btn2Bg,
    "--btn2-fg": theme.btn2Fg,
    "--tag-bg": theme.tagBg,
    "--tag-line": theme.tagLine,
    "--tag-fg": theme.tagFg,
    "--tag-on-bg": theme.tagOnBg,
    "--tag-on-fg": theme.tagOnFg,
    "--chip-bg": theme.chipBg,
    "--num-c": theme.numC,
    "--track": theme.track,
    "--card-line": theme.cardLine,
    "--panel": theme.panel,
    "--radius": theme.radius,
  };
}

/** Designer モックの .theme-b（KAMOファインディング＝赤×金） */
export const THEME_B: SiteTheme = {
  variant: "b",
  bg: "#fff",
  bgAlt: "#FFF7F3",
  ink: "#1A1A1A",
  text: "#333",
  sub: "#8A8A8A",
  line: "#F0E2E0",
  accent: "#E60012",
  gold: "#D4A017",
  ctaBg: "#E60012",
  ctaFg: "#fff",
  btn2Bg: "#FFF1EC",
  btn2Fg: "#E60012",
  tagBg: "#fff",
  tagLine: "#F0E2E0",
  tagFg: "#333",
  tagOnBg: "#E60012",
  tagOnFg: "#fff",
  chipBg: "#FFF1EC",
  numC: "#E60012",
  track: "#F3E7E4",
  cardLine: "#F1E4E2",
  panel: "#FFFBF8",
  radius: "12px",
};

/** Designer モックの .theme-a（モノトーン基調）。2サイト目以降の検証用 */
export const THEME_A: SiteTheme = {
  variant: "a",
  bg: "#fff",
  bgAlt: "#F7F7F5",
  ink: "#111",
  text: "#333",
  sub: "#8A8A8A",
  line: "#EAEAEA",
  accent: "#E60012",
  gold: "#111",
  ctaBg: "#111",
  ctaFg: "#fff",
  btn2Bg: "#F3F3F1",
  btn2Fg: "#111",
  tagBg: "#fff",
  tagLine: "#E4E4E4",
  tagFg: "#333",
  tagOnBg: "#111",
  tagOnFg: "#fff",
  chipBg: "#F1F1EE",
  numC: "#E60012",
  track: "#EDEDED",
  cardLine: "#EDEDED",
  panel: "#fff",
  radius: "10px",
};
