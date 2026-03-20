// src/components/graph/graph.types.ts

export interface GraphNode {
  id: string;
  label: string;
  type: "post" | "project";
  url: string;
  tags: string[];            // domain concept tags (security, forensics, ai, etc.)
  languages: string[];       // programming languages (c, rust, swift, etc.)
  contentType?: string;      // format: deep-dive, eli5, tutorial, overview, build-log, etc.
  status?: string;           // project lifecycle: ideation, in-progress, completed
  category?: string;         // topic group for coloring (deep-dive-kernels, keebs, etc.)
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;      // sibling, parent, child, prerequisite, sequel, related, tag-shared
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    generatedAt: string;
    nodeCount: number;
    edgeCount: number;
    tags: string[];
    categories: string[];
    statuses: string[];
    contentTypes: string[];
    languages: string[];
  };
}
