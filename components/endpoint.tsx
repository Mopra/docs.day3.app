import type { ReactNode } from "react";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

// Tinted from the method tokens in globals.css rather than Tailwind's raw
// palette, so a DELETE here is the same clay the site paints a destructive
// action. Border and text share one colour at different alphas.
const methodClass: Record<Method, string> = {
  GET: "text-[var(--method-get)] border-[var(--method-get)]/35 bg-[var(--method-get)]/8",
  POST: "text-[var(--method-post)] border-[var(--method-post)]/35 bg-[var(--method-post)]/8",
  PATCH: "text-[var(--method-patch)] border-[var(--method-patch)]/35 bg-[var(--method-patch)]/8",
  PUT: "text-[var(--method-patch)] border-[var(--method-patch)]/35 bg-[var(--method-patch)]/8",
  DELETE: "text-[var(--method-delete)] border-[var(--method-delete)]/35 bg-[var(--method-delete)]/8",
};

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
    <div className="my-4 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-xs font-semibold tracking-wide ${methodClass[method]}`}
        >
          {method}
        </span>
        <code className="font-mono text-sm break-all">{path}</code>
        {scope ? (
          <span className="ml-auto shrink-0 rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
            scope: <code className="font-mono">{scope}</code>
          </span>
        ) : null}
      </div>
      {children ? (
        <div className="mt-2 text-sm text-[var(--muted-foreground)]">{children}</div>
      ) : null}
    </div>
  );
}
