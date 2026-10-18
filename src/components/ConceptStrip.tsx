import type { Site } from "@/lib/types";

/** モックの concept()。コンセプト「夢の実現装置」の細い帯 */
export function ConceptStrip({ site }: { site: Site }) {
  return (
    <div className="concept">
      <div className="concept__in">
        <div className="concept__t">{site.copy.conceptTitle}</div>
        <div className="concept__d">{site.copy.conceptDescription}</div>
      </div>
    </div>
  );
}
