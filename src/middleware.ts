import { NextResponse, type NextRequest } from "next/server";

/**
 * ホスト（ドメイン）でサイトを判定するための入口。
 *
 * - 実際のサイト判定はサーバー側（src/lib/sites.ts）が `sites.domain` を見て行う。
 * - middleware は「プレビュー用のサイト指定（?site=<slug>）」を
 *   リクエストヘッダ x-site-slug として渡すためだけに存在する。
 *   本番ドメイン（www.kamofunding.com 等）では何も上書きしない。
 * - 将来、サイトごとのリダイレクトや独自ドメインの検証を足す場所でもある。
 */
export function middleware(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("site");
  if (!slug) return NextResponse.next();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-site-slug", slug);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // 静的アセットは対象外（テーマ判定に不要）
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/).*)"],
};
