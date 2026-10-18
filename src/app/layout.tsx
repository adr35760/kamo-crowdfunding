import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { getCurrentSite } from "@/lib/sites";
import { themeToCssVars } from "@/lib/theme";

/** ホストでサイトが変わるため、全ページを動的描画にする */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getCurrentSite();
  return {
    title: {
      default: `${site.name}｜${site.copy.conceptTitle}`,
      template: `%s｜${site.name}`,
    },
    description: site.copy.conceptDescription,
    openGraph: {
      title: `${site.name}｜${site.copy.conceptTitle}`,
      description: site.copy.conceptDescription,
      siteName: site.name,
      locale: "ja_JP",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getCurrentSite();
  // sites.theme（JSONB）→ CSS 変数。サイトを増やしてもここは変わらない
  const cssVars = themeToCssVars(site.theme) as CSSProperties;

  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-site={site.slug} data-variant={site.theme.variant} style={cssVars}>
        {children}
      </body>
    </html>
  );
}
