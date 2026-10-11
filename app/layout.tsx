import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "nextra-theme-docs/style.css";
import "./globals.css";
import type { Metadata } from "next";

// The marketing site's two faces, self-hosted by next/font so the docs don't
// depend on a Google Fonts round-trip.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.day3.app"),
  title: {
    default: "day3 API documentation",
    template: "%s | day3 API docs",
  },
  description:
    "Reference for the day3 API: send transactional email, manage audiences, contacts, segments and suppressions, receive webhooks, and drive it all from an AI editor over MCP.",
  openGraph: {
    type: "website",
    siteName: "day3 API docs",
    url: "https://docs.day3.app",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
};

// The brand mark is three rounded squares reading "day 3", drawn exactly as the
// site's header draws it: two espresso squares that invert with the theme, and
// the caramel third square that never does.
const logo = (
  <span className="flex items-center gap-2.5">
    <svg viewBox="0 0 356 100" aria-hidden="true" className="h-[15px] w-auto shrink-0">
      <rect width="100" height="100" rx="18" fill="currentColor" />
      <rect x="128" width="100" height="100" rx="18" fill="currentColor" />
      <rect x="256" width="100" height="100" rx="18" fill="#c28a4d" />
    </svg>
    <span className="text-[1.15rem] leading-none tracking-tight">day3</span>
    <span className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[0.7rem] leading-none font-medium tracking-wide text-[var(--muted-foreground)]">
      docs
    </span>
  </span>
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      {/*
        Nextra derives its whole primary/accent scale from one HSL triple and
        paints the page canvas from `backgroundColor`. Both come from the
        marketing site's tokens: hue 31 / sat 46% is caramel (#b98145), and the
        canvases are the site's cream (#f7f1e8) and its #1a1410 dark counterpart.

        Lightness deviates from caramel's native 50%: Nextra spends the primary
        on link and active-nav *text*, where 50% only reaches 2.97:1 on cream.
        38/56 clears 4.5:1 in both themes. Mirrored as `--link` in globals.css,
        change both together.
      */}
      <Head
        color={{ hue: 31, saturation: 46, lightness: { light: 38, dark: 56 } }}
        backgroundColor={{ light: "#f7f1e8", dark: "#1a1410" }}
      />
      <body>
        <Layout
          navbar={
            <Navbar logo={logo} logoLink="/" projectLink="https://github.com/Mopra/docs.day3.app">
              <a href="https://day3.app" target="_blank" rel="noopener noreferrer" className="d3-navlink max-md:hidden">
                day3.app
              </a>
              <a
                href="https://go.day3.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[var(--foreground)] px-3 py-1.5 text-[0.8rem] font-medium !text-[var(--background)] transition-opacity hover:opacity-85 max-md:hidden"
              >
                Open the app
              </a>
            </Navbar>
          }
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Mopra/docs.day3.app/tree/main"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          nextThemes={{ defaultTheme: "light" }}
          sidebar={{ defaultMenuCollapseLevel: 2, toggleButton: true }}
          toc={{ backToTop: "Back to top", title: "On this page" }}
          footer={
            <Footer className="!py-8">
              <div className="flex w-full flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
                <p>&copy; {new Date().getFullYear()} day3. Email billed by what you send.</p>
                <nav className="flex gap-5">
                  <a href="https://day3.app" className="hover:text-[var(--foreground)]">day3.app</a>
                  <a href="https://day3.app/pricing" className="hover:text-[var(--foreground)]">Pricing</a>
                  <a href="https://day3.app/security" className="hover:text-[var(--foreground)]">Security</a>
                  <a href="/llms.txt" className="hover:text-[var(--foreground)]">llms.txt</a>
                </nav>
              </div>
            </Footer>
          }
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
