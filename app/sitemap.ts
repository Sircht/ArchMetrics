import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://archmetrics.app";
  return ["", "/calculators/stair", "/calculators/ramp", "/calculators/scale", "/calculators/built-area", "/calculators/parking", "/documentation", "/pricing"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.8 }));
}
