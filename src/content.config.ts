// src/content.config.ts — v1.B content surface.
// The 7 supporting articles are a glob collection; the pillar and the FAQ are
// one-off pages and are imported directly by their routes.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    // `title` is the SERP title; `h1` is the on-page heading. They are
    // deliberately different — an H1 identical to the title tag reads as
    // templated.
    title: z.string(),
    h1: z.string(),
    description: z.string(),
    keyword: z.string(),
  }),
});

export const collections = { blog };
