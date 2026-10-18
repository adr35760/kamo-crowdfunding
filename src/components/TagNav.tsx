import Link from "next/link";
import { TAGS } from "@/lib/data";

/** モックの tagNav()。トップのタグナビと一覧の絞り込みで共用 */
export function TagNav({ active }: { active?: string }) {
  return (
    <div className="tagnav">
      {TAGS.map((t) => (
        <Link
          key={t.slug}
          href={`/tags/${t.slug}`}
          className={`tag tag--lg${active === t.slug ? " tag--on" : ""}`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
