/* eslint-disable no-console */
// src/scripts/build-graph.ts

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
import { parse as parseYaml } from "yaml";
import type {
  GraphData,
  GraphNode,
  GraphEdge,
} from "../components/graph/graph.types";
import { deriveContentType } from "../components/graph/graph.shared";

const BLOG_DIR = "src/data/blog";
const PROJECTS_DIR = "content/_projects";
const OUTPUT = "public/graph.json";
const DEV_MODE = process.argv.includes("--dev");

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  try {
    return parseYaml(match[1]) ?? {};
  } catch {
    return {};
  }
}

function parseRelatedProjects(
  content: string
): { project: string; relationship: string }[] {
  const tableMatch = content.match(
    /## Related Projects\s*\n\n\|[^\n]+\n\|[^\n]+\n((?:\|[^\n]+\n?)*)/
  );
  if (!tableMatch) return [];
  return tableMatch[1]
    .split("\n")
    .filter(line => line.startsWith("|"))
    .map(line => {
      const cells = line
        .split("|")
        .map(c => c.trim())
        .filter(Boolean);
      if (cells.length < 2) return null;
      return { project: cells[0], relationship: cells[1] };
    })
    .filter((r): r is { project: string; relationship: string } => r !== null);
}

function shortenLabel(title: string): string {
  // Strip common prefixes — the category already conveys the type
  const prefixes = [
    "Deep Dive: Programming - ",
    "Deep Dive: Reverse Engineering - ",
    "Deep Dive: PCB Design - ",
    "Deep Dive: Kernels - ",
    "Deep Dive: Nix - ",
    "Deep Dive: Cloud Forensics — ",
    "Deep Dive: Database Forensics — ",
    "Deep Dive: Filesystem Forensics — ",
    "Deep Dive: Host Forensics — ",
    "Deep Dive: Memory Forensics — ",
    "Deep Dive: Mobile Forensics — ",
    "Deep Dive: ",
    "ELI5: ",
    "Keebs: ",
    "Project: ",
    "Feature: ",
  ];
  for (const prefix of prefixes) {
    if (title.startsWith(prefix)) {
      return title.slice(prefix.length);
    }
  }
  return title;
}

function deriveCategory(slug: string): string {
  // Explicit remaps: slug prefix → category (when prefix !== desired category)
  const remaps: [string, string][] = [
    ["deep-dive-comparing-kernels", "deep-dive-kernels"],
    ["deep-dive-llm-observability", "deep-dive-llm-observability"],
    ["deep-dive-stack-based", "deep-dive-security"],
    ["deep-dive-heap-based", "deep-dive-security"],
    ["deep-dive-elastic", "deep-dive-infrastructure"],
    ["deep-dive-git", "deep-dive-infrastructure"],
    ["deep-dive-ipv6", "deep-dive-networking"],
    ["deep-dive-tls", "deep-dive-networking"],
  ];
  for (const [prefix, category] of remaps) {
    if (slug.startsWith(prefix)) return category;
  }

  // Standard prefix matching (prefix === category)
  const prefixes = [
    "deep-dive-programming-comparing",
    "deep-dive-programming-swift",
    "deep-dive-programming-rust",
    "deep-dive-programming-c",
    "deep-dive-programming-go",
    "deep-dive-programming-zig",
    "deep-dive-kernels",
    "deep-dive-editors",
    "deep-dive-reverse-engineering",
    "deep-dive-pcb-design",
    "deep-dive-nix",
    "deep-dive-ebpf",
    "deep-dive-host-forensics",
    "deep-dive-memory-forensics",
    "deep-dive-mobile-forensics",
    "deep-dive-cloud-forensics",
    "deep-dive-filesystem-forensics",
    "deep-dive-database-forensics",
    "deep-dive-benchmarking",
    "deep-dive-graph-agent",
    "deep-dive-indirect-prompt",
    "deep-dive-llm-backdoor",
    "deep-dive-semantic-testing",
    "deep-dive",
    "eli5",
    "keebs",
    "project",
    "feature",
  ];
  for (const prefix of prefixes) {
    if (slug.startsWith(prefix)) return prefix;
  }
  return "other";
}

function buildGraph(): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const allTags = new Set<string>();
  const allCategories = new Set<string>();
  const allStatuses = new Set<string>();
  const allContentTypes = new Set<string>();
  const allLanguages = new Set<string>();

  // --- Parse blog posts ---
  const postFiles = readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
  for (const file of postFiles) {
    const content = readFileSync(join(BLOG_DIR, file), "utf-8");
    const fm = parseFrontmatter(content);
    const slug = basename(file, ".md");
    const tags = Array.isArray(fm.tags) ? (fm.tags as string[]) : [];

    if (fm.draft === true || fm.draft === "true") continue;

    tags.forEach(t => allTags.add(t));

    const postContentType = deriveContentType("blog-post");
    allContentTypes.add(postContentType);

    const postLangs = Array.isArray(fm.languages)
      ? (fm.languages as string[])
      : [];
    postLangs.forEach(l => allLanguages.add(l));

    nodes.push({
      id: `post:${slug}`,
      label: shortenLabel((fm.title as string) || slug),
      type: "post",
      url: `/posts/${slug}/`,
      tags,
      languages: postLangs,
      contentType: postContentType,
      category: "blog-post",
    });
    allCategories.add("blog-post");
  }

  // --- Parse projects (dev mode only) ---
  if (!DEV_MODE) {
    console.log(
      "Production mode: skipping project nodes (use --dev to include)"
    );
  }
  const projectDirs = DEV_MODE
    ? readdirSync(PROJECTS_DIR).filter(d =>
        statSync(join(PROJECTS_DIR, d)).isDirectory()
      )
    : [];

  for (const dir of projectDirs) {
    const indexPath = join(PROJECTS_DIR, dir, "index.md");
    let content: string;
    try {
      content = readFileSync(indexPath, "utf-8");
    } catch {
      continue;
    }

    const fm = parseFrontmatter(content);
    const category = deriveCategory(dir);
    allCategories.add(category);

    const projectContentType = deriveContentType(category);
    allContentTypes.add(projectContentType);

    const status = (fm.status as string) || "ideation";
    allStatuses.add(status);

    const projectTags = Array.isArray(fm.tags) ? (fm.tags as string[]) : [];
    projectTags.forEach(t => allTags.add(t));

    const projectLangs = Array.isArray(fm.languages)
      ? (fm.languages as string[])
      : [];
    projectLangs.forEach(l => allLanguages.add(l));

    nodes.push({
      id: `project:${dir}`,
      label: shortenLabel((fm.title as string) || dir),
      type: "project",
      url: `/projects/${dir}/`,
      tags: projectTags,
      languages: projectLangs,
      contentType: projectContentType,
      status: fm.status as string,
      category,
    });

    // Parse relationship edges
    const relations = parseRelatedProjects(content);
    for (const rel of relations) {
      edges.push({
        source: `project:${dir}`,
        target: `project:${rel.project}`,
        relationship: rel.relationship,
      });
    }
  }

  // --- Filter out edges with missing targets ---
  const nodeIds = new Set(nodes.map(n => n.id));
  const validEdges = edges.filter(
    e => nodeIds.has(e.source) && nodeIds.has(e.target)
  );
  edges.length = 0;
  edges.push(...validEdges);

  // --- Generate tag-shared edges between nodes sharing tags ---
  // Require 2+ shared tags to avoid noisy edges (except between posts, where 1 suffices)
  const taggedNodes = nodes.filter(n => n.tags.length > 0);
  for (let i = 0; i < taggedNodes.length; i++) {
    for (let j = i + 1; j < taggedNodes.length; j++) {
      const shared = taggedNodes[i].tags.filter(t =>
        taggedNodes[j].tags.includes(t)
      );
      const threshold =
        taggedNodes[i].type === "post" && taggedNodes[j].type === "post"
          ? 1
          : 2;
      if (shared.length >= threshold) {
        edges.push({
          source: taggedNodes[i].id,
          target: taggedNodes[j].id,
          relationship: "tag-shared",
        });
      }
    }
  }

  // --- Deduplicate edges (A→B and B→A for siblings) ---
  const edgeSet = new Set<string>();
  const dedupedEdges: GraphEdge[] = [];
  for (const edge of edges) {
    // For symmetric relationships, normalize key order
    const symmetric = ["sibling", "related", "tag-shared"];
    let key: string;
    if (symmetric.includes(edge.relationship)) {
      const [a, b] = [edge.source, edge.target].sort();
      key = `${a}|${b}|${edge.relationship}`;
    } else {
      key = `${edge.source}|${edge.target}|${edge.relationship}`;
    }
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      dedupedEdges.push(edge);
    }
  }

  return {
    nodes,
    edges: dedupedEdges,
    metadata: {
      generatedAt: new Date().toISOString(),
      nodeCount: nodes.length,
      edgeCount: dedupedEdges.length,
      tags: [...allTags].sort(),
      categories: [...allCategories].sort(),
      statuses: [...allStatuses].sort(),
      contentTypes: [...allContentTypes].sort(),
      languages: [...allLanguages].sort(),
    },
  };
}

const graph = buildGraph();
writeFileSync(OUTPUT, JSON.stringify(graph, null, 2));
console.log(
  `Graph built (${DEV_MODE ? "dev" : "prod"}): ${graph.metadata.nodeCount} nodes, ${graph.metadata.edgeCount} edges`
);
