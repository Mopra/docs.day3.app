import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const BASE = "https://go.day3.app/api";

// Tinted from the method tokens in globals.css, so a DELETE here is the same
// clay the site paints a destructive action.
const methodClass: Record<Method, string> = {
  GET: "text-[var(--method-get)] bg-[var(--method-get)]/10",
  POST: "text-[var(--method-post)] bg-[var(--method-post)]/12",
  PATCH: "text-[var(--method-patch)] bg-[var(--method-patch)]/12",
  PUT: "text-[var(--method-patch)] bg-[var(--method-patch)]/12",
  DELETE: "text-[var(--method-delete)] bg-[var(--method-delete)]/12",
};

// `{email_id}` segments are the part a reader fills in, so they get the accent.
function Path({ path }: { path: string }) {
  return (
    <>
      {path.split(/(\{[^}]+\})/).map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className="text-[var(--link)]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * The signature line for one operation. Sits directly under the heading that
 * names it, so a reader scanning a resource page sees method + path without
 * reading prose.
 */
export function Endpoint({
  method,
  path,
  scope,
  children,
}: {
  method: Method;
  path: string;
  /** Named only when the operation needs a scope beyond the base grant. */
  scope?: string;
  children?: ReactNode;
}) {
  return (
    <div className="d3-endpoint not-prose my-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2 pr-2 pl-2.5">
        <span
          className={`shrink-0 rounded-md px-2 py-1 font-mono text-[0.7rem] leading-none font-semibold tracking-wider ${methodClass[method]}`}
        >
          {method}
        </span>
        <code className="min-w-0 flex-1 font-mono text-[0.85rem] break-all text-[var(--foreground)]">
          <Path path={path} />
        </code>
        {scope ? (
          <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[0.7rem] text-[var(--muted-foreground)]">
            needs <code className="font-mono text-[var(--foreground)]">{scope}</code>
          </span>
        ) : null}
        <CopyButton value={BASE + path} label="Copy URL" />
      </div>
      {children ? (
        <div className="border-t border-[var(--border)] px-3.5 py-2.5 text-sm text-[var(--muted-foreground)]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
