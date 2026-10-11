import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

const BASE_URL = "https://go.day3.app/api/v1";

/** The top of the introduction: what this is, and the one request that proves the key works. */
export function Hero() {
  return (
    <section className="not-prose mt-6 mb-14">
      <p className="text-xs font-semibold tracking-[0.12em] text-[var(--link)] uppercase">day3 API</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.02em] text-[var(--foreground)]">
        Email from your code.
        <br />
        <span className="text-[var(--muted-foreground)]">One key, JSON in, JSON out.</span>
      </h1>
      <p className="mt-5 max-w-xl text-[1.075rem] leading-relaxed text-[var(--muted-foreground)]">
        Send transactional email, sync your users into audiences, and drive campaigns and
        automations over HTTPS. Billed by emails sent, never by list size.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href="/quickstart"
          className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-85"
        >
          Quickstart
        </Link>
        <Link
          href="/emails"
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
        >
          API reference
        </Link>
        <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 pr-1 pl-3 font-mono text-[0.8rem] text-[var(--muted-foreground)]">
          {BASE_URL}
          <CopyButton value={BASE_URL} label="Copy base URL" />
        </div>
      </div>
    </section>
  );
}

type Card = { href: string; title: string; body: string; icon: ReactNode };

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const cards: Card[] = [
  {
    href: "/emails",
    title: "Send transactional email",
    body: "Resets, receipts, magic links. One POST, Resend-compatible.",
    icon: icon("M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"),
  },
  {
    href: "/contacts",
    title: "Sync your users",
    body: "Upsert by email, batch 1,000 per call, attributes that register themselves.",
    icon: icon("M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 19v-1a4 4 0 0 0-3-3.85M15.5 3.15a3.5 3.5 0 0 1 0 6.7"),
  },
  {
    href: "/guides/migrate-a-list",
    title: "Migrate a list",
    body: "Move off Resend, Mailchimp or Kit without re-mailing anyone who left.",
    icon: icon("M4 12h13M13 6l6 6-6 6"),
  },
  {
    href: "/webhooks",
    title: "Webhooks",
    body: "Signed events for deliveries, bounces and complaints. No polling.",
    icon: icon("M13 3L4 14h7l-1 7 9-11h-7l1-7z"),
  },
  {
    href: "/campaigns",
    title: "Campaigns and automations",
    body: "Draft, preview and send newsletters. Enroll contacts into flows.",
    icon: icon("M4 19V5M4 5h11l-2 4 2 4H4"),
  },
  {
    href: "/mcp",
    title: "MCP server",
    body: "Let Claude Code or Cursor draft and test a campaign for you.",
    icon: icon("M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"),
  },
];

/** The "where do I start" grid. Replaces a table of links with something you can hit. */
export function Cards() {
  return (
    <div className="not-prose mt-6 grid gap-3 sm:grid-cols-2">
      {cards.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="d3-card group flex gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--caramel)_45%,var(--border))] hover:shadow-[0_6px_20px_-12px_rgba(36,28,23,0.35)]"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--muted)] text-[var(--link)]">
            {c.icon}
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[0.95rem] font-medium text-[var(--foreground)]">
              {c.title}
              <span className="text-[var(--muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </span>
            <span className="mt-0.5 block text-sm leading-snug text-[var(--muted-foreground)]">{c.body}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
