import nextra from "nextra";
import espresso from "./lib/espresso-theme.mjs";

const withNextra = nextra({
  // One espresso theme for both page themes, so code reads the same on cream
  // and on the dark canvas, the way the marketing site shows it.
  mdxOptions: {
    rehypePrettyCodeOptions: { theme: espresso },
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is HTML in `out/`, which is what the GitHub
  // Pages workflow uploads. Nothing here runs on a server.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
};

export default withNextra(nextConfig);
