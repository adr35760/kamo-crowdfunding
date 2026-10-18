import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="pghead">
        <h1>ページが見つかりません</h1>
        <p>URLが変わったか、掲載が終了した可能性があります。</p>
      </div>
      <div className="pager" style={{ marginTop: 28, justifyContent: "flex-start" }}>
        <Link className="btn" href="/">
          トップへ戻る
        </Link>
        <Link className="btn btn--2" href="/projects">
          案件一覧を見る
        </Link>
      </div>
    </div>
  );
}
