// src/components/graph/graph.shared.ts
// Isomorphic module — safe for both browser and Node.js (no DOM access)

export const CATEGORY_COLORS: Record<string, string> = {
  "blog-post": "#58a6ff",
  "deep-dive-kernels": "#f97583",
  "deep-dive-editors": "#d2a8ff",
  "deep-dive-programming-swift": "#ff7b72",
  "deep-dive-programming-rust": "#ffa657",
  "deep-dive-programming-c": "#79c0ff",
  "deep-dive-programming-comparing": "#7ee787",
  "deep-dive-programming-go": "#79c0ff",
  "deep-dive-programming-zig": "#ffa657",
  "deep-dive-nix": "#a5d6ff",
  "deep-dive-pcb-design": "#d29922",
  "deep-dive-reverse-engineering": "#f85149",
  "deep-dive-ebpf": "#7ee787",
  "deep-dive-host-forensics": "#ff9bce",
  "deep-dive-memory-forensics": "#f0883e",
  "deep-dive-mobile-forensics": "#db61a2",
  "deep-dive-cloud-forensics": "#56d4dd",
  "deep-dive-filesystem-forensics": "#e3b341",
  "deep-dive-database-forensics": "#bc8cff",
  "deep-dive-benchmarking": "#79c0ff",
  "deep-dive-graph-agent": "#79c0ff",
  "deep-dive-indirect-prompt": "#f85149",
  "deep-dive-llm-backdoor": "#f85149",
  "deep-dive-semantic-testing": "#7ee787",
  "deep-dive-llm-observability": "#79c0ff",
  "deep-dive-security": "#f85149",
  "deep-dive-infrastructure": "#8b949e",
  "deep-dive-networking": "#56d4dd",
  "deep-dive": "#8b949e",
  keebs: "#d2a8ff",
  eli5: "#3fb950",
  project: "#8b949e",
  feature: "#58a6ff",
  other: "#8b949e",
};

export const CATEGORY_LABELS: Record<string, string> = {
  "blog-post": "Blog Posts",
  "deep-dive-kernels": "Kernels",
  "deep-dive-editors": "Editors",
  "deep-dive-programming-swift": "Swift",
  "deep-dive-programming-rust": "Rust",
  "deep-dive-programming-c": "C",
  "deep-dive-programming-comparing": "Comparisons",
  "deep-dive-programming-go": "Go",
  "deep-dive-programming-zig": "Zig",
  "deep-dive-nix": "Nix",
  "deep-dive-pcb-design": "PCB Design",
  "deep-dive-reverse-engineering": "Reverse Engineering",
  "deep-dive-ebpf": "eBPF",
  "deep-dive-host-forensics": "Host Forensics",
  "deep-dive-memory-forensics": "Memory Forensics",
  "deep-dive-mobile-forensics": "Mobile Forensics",
  "deep-dive-cloud-forensics": "Cloud Forensics",
  "deep-dive-filesystem-forensics": "Filesystem Forensics",
  "deep-dive-database-forensics": "Database Forensics",
  "deep-dive-benchmarking": "Benchmarking",
  "deep-dive-graph-agent": "Agent Memory",
  "deep-dive-indirect-prompt": "Prompt Injection",
  "deep-dive-llm-backdoor": "LLM Security",
  "deep-dive-semantic-testing": "Semantic Testing",
  "deep-dive-llm-observability": "LLM Observability",
  "deep-dive-security": "Security",
  "deep-dive-infrastructure": "Infrastructure",
  "deep-dive-networking": "Networking",
  "deep-dive": "Deep Dives (Other)",
  keebs: "Keyboards",
  eli5: "ELI5",
  project: "Projects",
  feature: "Features",
  other: "Other",
};

export const EDGE_COLORS: Record<string, string> = {
  parent: "#3fb950",
  child: "#3fb950",
  sibling: "#58a6ff",
  prerequisite: "#d29922",
  sequel: "#d29922",
  related: "#8b949e",
  "tag-shared": "#30363d80",
};

export const TOPIC_GROUPS: { label: string; categories: string[] }[] = [
  {
    label: "Programming",
    categories: [
      "deep-dive-programming-c",
      "deep-dive-programming-swift",
      "deep-dive-programming-rust",
      "deep-dive-programming-go",
      "deep-dive-programming-zig",
      "deep-dive-programming-comparing",
    ],
  },
  {
    label: "DFIR",
    categories: [
      "deep-dive-host-forensics",
      "deep-dive-memory-forensics",
      "deep-dive-mobile-forensics",
      "deep-dive-cloud-forensics",
      "deep-dive-filesystem-forensics",
      "deep-dive-database-forensics",
    ],
  },
  { label: "Tools", categories: ["deep-dive-editors", "deep-dive-nix"] },
  { label: "Systems", categories: ["deep-dive-kernels", "deep-dive-ebpf"] },
  { label: "Hardware", categories: ["deep-dive-pcb-design", "keebs"] },
  {
    label: "Security",
    categories: [
      "deep-dive-reverse-engineering",
      "deep-dive-llm-backdoor",
      "deep-dive-indirect-prompt",
      "deep-dive-security",
    ],
  },
  {
    label: "AI / ML",
    categories: [
      "deep-dive-benchmarking",
      "deep-dive-graph-agent",
      "deep-dive-semantic-testing",
      "deep-dive-llm-observability",
    ],
  },
  {
    label: "Infrastructure",
    categories: [
      "deep-dive-infrastructure",
      "deep-dive-networking",
    ],
  },
];

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  "deep-dive": "Deep Dive",
  eli5: "ELI5",
  "dev-blog": "Dev Blog",
  "blog-post": "Blog Post",
  feature: "Feature",
  project: "Project",
  other: "Other",
};

export function deriveContentType(category: string): string {
  if (category.startsWith("deep-dive")) return "deep-dive";
  if (category === "eli5") return "eli5";
  if (category === "keebs") return "dev-blog";
  if (category === "blog-post") return "blog-post";
  if (category === "feature") return "feature";
  if (category === "project") return "project";
  return "other";
}

export function getNodeColor(category?: string): string {
  if (!category) return "#8b949e";
  return CATEGORY_COLORS[category] || "#8b949e";
}
