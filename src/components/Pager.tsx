/** モックの pager()。ページングは第1段ではダミー（リンク先は一覧のまま） */
export function Pager({ current = 1, total = 16 }: { current?: number; total?: number }) {
  const pages = [1, 2, 3, 4];
  return (
    <div className="pager">
      {pages.map((p) => (
        <span key={p} className={p === current ? "on" : undefined}>
          {p}
        </span>
      ))}
      <span>…</span>
      <span>{total}</span>
    </div>
  );
}
