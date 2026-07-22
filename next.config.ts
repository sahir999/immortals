import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from a sub-path (`/<repo>`), so the app
 * needs a matching basePath — but only there. Locally and on any other host the
 * site lives at the root, so basePath stays empty and `npm run dev` is
 * unaffected.
 *
 * The repo name is read from GITHUB_REPOSITORY ("owner/repo"), which GitHub
 * Actions sets automatically. Nothing to hard-code, and renaming the repo needs
 * no change here. A user/org site (`<owner>.github.io`) is already served from
 * the root, so it gets no basePath either.
 */
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectSite = repository !== "" && !repository.endsWith(".github.io");
const basePath =
  process.env.GITHUB_PAGES === "true" && isProjectSite ? `/${repository}` : "";

const nextConfig: NextConfig = {
  // Emit a plain HTML/CSS/JS bundle into `out/`. Every route in this app is
  // already static, so nothing is lost by dropping the Node server.
  output: "export",

  // `/writers` -> `out/writers/index.html`, which every static host resolves
  // correctly. Without this the export emits `writers.html` instead.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  // There is no image optimiser without a server. Nothing here uses
  // `next/image` today; this keeps the build working if anything ever does.
  images: { unoptimized: true },
};

export default nextConfig;
