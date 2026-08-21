import nextra from "nextra";

const withNextra = nextra({});

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
