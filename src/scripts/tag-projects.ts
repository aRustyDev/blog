// src/scripts/tag-projects.ts
// Derives tags and languages for projects and writes them into index.md frontmatter.
// Run: npx tsx src/scripts/tag-projects.ts [--dry-run]

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

const PROJECTS_DIR = "content/_projects";
const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

// --- Per-project metadata ---
interface ProjectMeta {
  tags: string[];
  languages: string[];
}

// Slug → metadata mapping
const META: Record<string, ProjectMeta> = {
  // -- Forensics --
  "deep-dive-host-forensics-linux":    { tags: ["forensics", "security"], languages: [] },
  "deep-dive-host-forensics-windows":  { tags: ["forensics", "security"], languages: [] },
  "deep-dive-host-forensics-bsd":      { tags: ["forensics", "security"], languages: [] },
  "deep-dive-host-forensics-macos":    { tags: ["forensics", "security"], languages: [] },
  "deep-dive-memory-forensics-linux":  { tags: ["forensics", "memory", "security"], languages: ["c"] },
  "deep-dive-memory-forensics-windows":{ tags: ["forensics", "memory", "security"], languages: [] },
  "deep-dive-memory-forensics-bsd":    { tags: ["forensics", "memory", "security"], languages: [] },
  "deep-dive-memory-forensics-macos":  { tags: ["forensics", "memory", "security"], languages: [] },
  "deep-dive-mobile-forensics":        { tags: ["forensics", "mobile", "security"], languages: [] },
  "deep-dive-mobile-forensics-android":{ tags: ["forensics", "mobile", "security"], languages: [] },
  "deep-dive-mobile-forensics-ios":    { tags: ["forensics", "mobile", "security"], languages: [] },
  "deep-dive-cloud-forensics-containers":  { tags: ["forensics", "containers", "security"], languages: [] },
  "deep-dive-cloud-forensics-kubernetes":  { tags: ["forensics", "kubernetes", "security"], languages: [] },
  "deep-dive-filesystem-forensics":    { tags: ["forensics", "filesystems", "security"], languages: [] },
  "deep-dive-filesystem-forensics-ext4": { tags: ["forensics", "filesystems", "security"], languages: [] },
  "deep-dive-database-forensics":      { tags: ["forensics", "databases", "security"], languages: [] },
  "deep-dive-database-forensics-sqlite": { tags: ["forensics", "databases", "security"], languages: [] },

  // -- Kernels --
  "deep-dive-kernels-overview":        { tags: ["kernel"], languages: ["c"] },
  "deep-dive-kernels-linux":           { tags: ["kernel", "linux"], languages: ["c"] },
  "deep-dive-kernels-bsd":             { tags: ["kernel", "bsd"], languages: ["c"] },
  "deep-dive-kernels-darwin":          { tags: ["kernel", "darwin", "macos"], languages: ["c"] },
  "deep-dive-kernels-xnu":             { tags: ["kernel", "darwin", "macos"], languages: ["c"] },
  "deep-dive-kernels-unikernels":      { tags: ["kernel", "containers"], languages: [] },
  "deep-dive-comparing-kernels":       { tags: ["kernel"], languages: ["c"] },

  // -- eBPF --
  "deep-dive-ebpf":                    { tags: ["ebpf", "linux"], languages: ["c"] },
  "deep-dive-ebpf-internals":          { tags: ["ebpf", "linux"], languages: ["c"] },
  "deep-dive-ebpf-first-program":      { tags: ["ebpf", "linux"], languages: ["c"] },

  // -- Editors --
  "deep-dive-editors-neovim":          { tags: ["editors"], languages: [] },
  "deep-dive-editors-neovim-yazi":     { tags: ["editors"], languages: ["rust"] },
  "deep-dive-editors-vim":             { tags: ["editors"], languages: [] },
  "deep-dive-editors-vi":              { tags: ["editors"], languages: [] },
  "deep-dive-editors-ed":              { tags: ["editors"], languages: [] },
  "deep-dive-editors-nano":            { tags: ["editors"], languages: ["c"] },
  "deep-dive-editors-vscode":          { tags: ["editors"], languages: [] },
  "deep-dive-editors-zed":             { tags: ["editors"], languages: ["rust"] },

  // -- Nix --
  "deep-dive-nix-overview":            { tags: ["nix"], languages: ["nix"] },
  "deep-dive-nix-darwin":              { tags: ["nix", "macos", "darwin"], languages: ["nix"] },
  "deep-dive-nixos":                   { tags: ["nix", "linux"], languages: ["nix"] },
  "deep-dive-nix-language":            { tags: ["nix"], languages: ["nix"] },
  "deep-dive-nix-package-registry":    { tags: ["nix"], languages: ["nix"] },

  // -- PCB Design --
  "deep-dive-pcb-design-overview":     { tags: ["pcb", "hardware"], languages: [] },
  "deep-dive-pcb-design-8bit-pc":      { tags: ["pcb", "hardware"], languages: [] },
  "deep-dive-pcb-design-16bit-pc":     { tags: ["pcb", "hardware"], languages: [] },
  "deep-dive-pcb-design-32bit-pc":     { tags: ["pcb", "hardware"], languages: [] },
  "deep-dive-pcb-design-64bit-pc":     { tags: ["pcb", "hardware"], languages: [] },
  "deep-dive-pcb-design-custom-keeb":  { tags: ["pcb", "hardware", "keebs"], languages: [] },

  // -- Programming: C --
  "deep-dive-programming-c-overview":           { tags: [], languages: ["c"] },
  "deep-dive-programming-c-effective-c":        { tags: ["book"], languages: ["c"] },
  "deep-dive-programming-c-writing-a-compiler": { tags: ["compilers"], languages: ["c"] },
  "deep-dive-programming-c-writing-a-lexer":    { tags: ["compilers"], languages: ["c"] },

  // -- Programming: Comparing --
  "deep-dive-programming-comparing-c-vs-cpp":       { tags: [], languages: ["c", "cpp"] },
  "deep-dive-programming-comparing-swift-vs-cpp":    { tags: [], languages: ["swift", "cpp"] },
  "deep-dive-programming-comparing-cpp-versions":    { tags: [], languages: ["cpp"] },
  "deep-dive-programming-comparing-rust-vs-golang":  { tags: [], languages: ["rust", "go"] },

  // -- Programming: Go --
  "deep-dive-programming-go-internals": { tags: [], languages: ["go"] },

  // -- Programming: Rust --
  "deep-dive-programming-rust-effective-rust":        { tags: [], languages: ["rust"] },
  "deep-dive-programming-rust-reverse-engineering":   { tags: ["reverse-engineering", "security"], languages: ["rust"] },
  "deep-dive-programming-rust-when-to-use":           { tags: [], languages: ["rust"] },

  // -- Programming: Swift --
  "deep-dive-programming-swift-overview":             { tags: [], languages: ["swift"] },
  "deep-dive-programming-swift-effective-swift":      { tags: [], languages: ["swift"] },
  "deep-dive-programming-swift-ios-app":              { tags: ["ios"], languages: ["swift"] },
  "deep-dive-programming-swift-visionos-app":         { tags: ["visionos"], languages: ["swift"] },
  "deep-dive-programming-swift-macos-app":            { tags: ["macos"], languages: ["swift"] },
  "deep-dive-programming-swift-tvos-app":             { tags: ["tvos"], languages: ["swift"] },
  "deep-dive-programming-swift-cross-platform-app":   { tags: ["ios", "macos"], languages: ["swift"] },

  // -- Programming: Zig --
  "deep-dive-programming-zig-overview": { tags: [], languages: ["zig"] },

  // -- Reverse Engineering --
  "deep-dive-reverse-engineering-binary-ninja":   { tags: ["reverse-engineering", "security"], languages: [] },
  "deep-dive-reverse-engineering-ghidra":         { tags: ["reverse-engineering", "security"], languages: [] },
  "deep-dive-reverse-engineering-ida-pro":        { tags: ["reverse-engineering", "security"], languages: [] },
  "deep-dive-reverse-engineering-ida-free":       { tags: ["reverse-engineering", "security"], languages: [] },
  "deep-dive-reverse-engineering-radare2":        { tags: ["reverse-engineering", "security"], languages: [] },
  "deep-dive-reverse-engineering-good-resources": { tags: ["reverse-engineering", "security"], languages: [] },

  // -- Security / AI --
  "deep-dive-indirect-prompt-injection-email":    { tags: ["security", "ai", "injection"], languages: [] },
  "deep-dive-llm-backdoor-taxonomy":             { tags: ["security", "ai"], languages: [] },
  "deep-dive-benchmarking-agent-memory":          { tags: ["ai", "agents", "benchmarking"], languages: [] },
  "deep-dive-graph-agent-memory-implementation":  { tags: ["ai", "agents"], languages: [] },
  "deep-dive-semantic-testing-ai-skills":         { tags: ["ai", "testing"], languages: [] },
  "deep-dive-llm-observability-agent-development": { tags: ["ai", "agents", "observability"], languages: [] },

  // -- Networking / Infrastructure --
  "deep-dive-ipv6":             { tags: ["networking"], languages: [] },
  "deep-dive-tls":              { tags: ["networking", "security"], languages: [] },
  "deep-dive-elastic-search":   { tags: ["databases", "observability"], languages: [] },

  // -- Git --
  "deep-dive-git-internals":    { tags: ["git"], languages: [] },
  "deep-dive-git-as-a-database": { tags: ["git", "databases"], languages: [] },

  // -- Buffer overflows --
  "deep-dive-heap-based-buffer-overflows":  { tags: ["security", "memory"], languages: ["c"] },
  "deep-dive-stack-based-buffer-overflows": { tags: ["security", "memory"], languages: ["c"] },

  // -- ELI5 --
  "eli5-injection-based-attacks":  { tags: ["security", "injection"], languages: [] },
  "eli5-overflow-based-attacks":   { tags: ["security", "memory"], languages: [] },

  // -- Keebs --
  "keebs-getting-started":  { tags: ["keebs", "hardware"], languages: [] },
  "keebs-keymaps":          { tags: ["keebs", "hardware"], languages: [] },
  "keebs-corne-ish-zen":    { tags: ["keebs", "hardware"], languages: [] },

  // -- Other --
  "asic-design":                              { tags: ["hardware"], languages: [] },
  "what-is-context-engineering":              { tags: ["ai", "agents"], languages: [] },
  "feature-semantic-search-adrs":             { tags: ["ai"], languages: [] },
  "project-solving-the-context-drift-problem": { tags: ["ai"], languages: [] },
};

// --- Main ---
const projectDirs = readdirSync(PROJECTS_DIR).filter(d =>
  statSync(join(PROJECTS_DIR, d)).isDirectory()
);

let updated = 0;
let skipped = 0;

for (const dir of projectDirs) {
  const indexPath = join(PROJECTS_DIR, dir, "index.md");
  let content: string;
  try {
    content = readFileSync(indexPath, "utf-8");
  } catch {
    continue;
  }

  const meta = META[dir];
  if (!meta) {
    console.log(`  SKIP ${dir} (no mapping)`);
    skipped++;
    continue;
  }

  // Parse frontmatter
  const fmMatch = content.match(/^(---\n)([\s\S]*?)\n(---)/);
  if (!fmMatch) {
    console.log(`  SKIP ${dir} (no frontmatter)`);
    skipped++;
    continue;
  }

  const fm = parseYaml(fmMatch[2]);

  // Skip if already tagged (unless --force)
  if (!FORCE && Array.isArray(fm.tags) && fm.tags.length > 0) {
    console.log(`  KEEP ${dir} (already tagged, use --force to overwrite)`);
    skipped++;
    continue;
  }

  // Set tags and languages
  fm.tags = meta.tags.length > 0 ? meta.tags : [];
  fm.languages = meta.languages.length > 0 ? meta.languages : [];

  // Remove languages field entirely if empty (cleaner frontmatter)
  if (fm.languages.length === 0) delete fm.languages;
  // Remove tags field entirely if empty
  if (fm.tags.length === 0) delete fm.tags;

  // Rebuild frontmatter
  const newFm = stringifyYaml(fm, { lineWidth: 0 });
  const newContent = `---\n${newFm}---` + content.slice(fmMatch[0].length);

  if (DRY_RUN) {
    const tagStr = meta.tags.length ? meta.tags.join(", ") : "(none)";
    const langStr = meta.languages.length ? meta.languages.join(", ") : "(none)";
    console.log(`  DRY ${dir} → tags:[${tagStr}] langs:[${langStr}]`);
  } else {
    writeFileSync(indexPath, newContent);
    const tagStr = meta.tags.length ? meta.tags.join(", ") : "(none)";
    const langStr = meta.languages.length ? meta.languages.join(", ") : "(none)";
    console.log(`  SET ${dir} → tags:[${tagStr}] langs:[${langStr}]`);
  }
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);

// Summary
const allTags = new Set<string>();
const allLangs = new Set<string>();
for (const m of Object.values(META)) {
  m.tags.forEach(t => allTags.add(t));
  m.languages.forEach(l => allLangs.add(l));
}
console.log(`\nTags (${allTags.size}): ${[...allTags].sort().join(", ")}`);
console.log(`Languages (${allLangs.size}): ${[...allLangs].sort().join(", ")}`);
