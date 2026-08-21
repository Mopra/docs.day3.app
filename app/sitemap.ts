import type { MetadataRoute } from "next";
import { getPageMap } from "nextra/page-map";

export const dynamic = "force-static";

const BASE = "https://docs.day3.app";

type Node = { route?: string; children?: Node[] };

// Walk the page map rather than listing routes by hand: a page added under app/
// is in the sitemap the moment it exists, and a page removed leaves it. A
// hand-kept list is the kind of thing that silently goes stale and then tells
// Google about 404s.
function routes(nodes: Node[], out = new Set<string>()): Set<string> {
  for (const node of nodes) {
    // Separators and external links have no route. `/_meta`-derived nodes and
    // the 404 route are not pages anyone should be sent to.
    if (node.route && !node.route.startsWith("/_")) out.add(node.route);
    if (node.children) routes(node.children, out);
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageMap = (await getPageMap()) as Node[];

  return [...routes(pageMap)].sort().map((route) => ({
    url: route === "/" ? BASE : `${BASE}${route}`,
    // No lastModified. Every entry would otherwise carry the build timestamp,
    // which tells Google that all 17 pages changed on every deploy and gets the
    // signal discarded. Absent beats wrong.
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
