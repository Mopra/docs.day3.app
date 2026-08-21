import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Geist, Instrument_Serif } from "next/font/google";
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

// The brand mark is three rounded squares reading "day 3". The two leading
// squares take `currentColor` so the mark inverts with the theme on its own;
// only the caramel third square is fixed, which is the whole point of it.
const logo = (
  <span className="flex items-center gap-2.5">
    <svg viewBox="0 0 356 100" aria-hidden="true" className="h-3 w-auto shrink-0">
      <rect width="100" height="100" rx="14" fill="currentColor" />
      <rect x="128" width="100" height="100" rx="14" fill="currentColor" />
      <rect x="256" width="100" height="100" rx="14" fill="#c28a4d" />
    </svg>
    <span className="text-[1.05rem] font-semibold tracking-tight">day3 docs</span>
  </span>
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geist.variable} ${instrumentSerif.variable}`}
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
            <Navbar logo={logo} projectLink="https://github.com/Mopra/docs.day3.app">
              <a href="https://day3.app" target="_blank" rel="noopener noreferrer">
                Website
              </a>
              <a href="https://go.day3.app" target="_blank" rel="noopener noreferrer">
                Dashboard
              </a>
            </Navbar>
          }
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Mopra/docs.day3.app/tree/main"


          footer={
            <Footer>
              <div className="flex w-full flex-wrap items-center justify-between gap-2">
                <p>
                  &copy; {new Date().getFullYear()} day3. Marketing + transactional email, billed by
                  sends.
                </p>
                <div className="flex gap-4">
                  <a href="https://day3.app" target="_blank" rel="noopener noreferrer">
                    day3.app
                  </a>
                  <a href="https://day3.app/pricing" target="_blank" rel="noopener noreferrer">
                    Pricing
                  </a>
                  <a href="https://day3.app/security" target="_blank" rel="noopener noreferrer">
                    Security
                  </a>
                </div>
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
