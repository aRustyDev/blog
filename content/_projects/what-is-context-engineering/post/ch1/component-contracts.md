# Component Contracts for Post 1

These contracts define the placeholder syntax and expected props for each component used in this post. Content authors use the placeholder syntax now; component implementors build to match these interfaces.

## Placeholder Syntax

In outline and draft files, reference components as:

```markdown
<!-- COMPONENT: ComponentName { prop: "value", prop2: true } -->
Description of what should render here
<!-- /COMPONENT -->
```

In the actual Astro MDX file, these become:

```astro
<ComponentName prop="value" prop2 />
```

---

## Tweet

**Placeholder**: `<!-- COMPONENT: Tweet { id: "1937902205765607626", author: "karpathy" } -->`

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | Tweet ID (from URL) |
| `author` | string | yes | Twitter handle (without @) |
| `fallbackText` | string | no | Quoted text if embed fails |

**Renders**: Clickable SVG card styled like a tweet. Links to `https://x.com/{author}/status/{id}`. Shows author name, handle, avatar (from people DB), tweet text, and date. Dark/light theme aware via CSS variables.

**Used in Post 1**: Section 2.1 (Lutke tweet, Karpathy tweet)

---

## PersonPopup

**Placeholder**: `<!-- COMPONENT: PersonPopup { id: "karpathy" } -->Andrej Karpathy<!-- /COMPONENT -->`

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | Key in people.jsonld |

**Renders**: Inline text (the person's name) that on hover/click shows a popup card with photo, name, role, affiliation, and links (Twitter, LinkedIn, URL). Link precedence: Twitter > personal URL > LinkedIn > affiliation. NOT collapsible.

**Used in Post 1**: Every person mentioned (Karpathy, Lutke, Willison, Schmid, Mei, Gupta)

---

## OGCard

**Placeholder**: `<!-- COMPONENT: OGCard { url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" } -->`

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | string | yes | URL to fetch OG metadata from |
| `title` | string | no | Override OG title |
| `description` | string | no | Override OG description |
| `image` | string | no | Override OG image |

**Renders**: Card showing the page's Open Graph title, description, image, and favicon. Clickable link to the URL. NOT collapsible. Dark/light theme aware.

**Used in Post 1**: Section 2.2 (Mei et al. survey link, Anthropic CE blog link)

---

## Timeline

**Placeholder**:
```markdown
<!-- COMPONENT: Timeline { orientation: "vertical", collapsible: true } -->
- 2025-06-22: Tobi Lutke tweets CE definition
- 2025-06-25: Karpathy amplifies
- 2025-06-27: Willison connects both
- 2025-06-30: Schmid 7-component framework (915 HN points)
- 2025-07-02: LangChain 4-strategy framework
- 2025-07-17: Mei et al. academic survey (1400 papers)
- 2025-Q3: Gartner endorsement
<!-- /COMPONENT -->
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `orientation` | "vertical" \| "horizontal" | no (default: vertical) | Layout direction |
| `collapsible` | boolean | no (default: true) | Collapse/expand toggle |
| `items` | TimelineItem[] | yes (via children or data) | Timeline entries |

**TimelineItem**: `{ date: string, label: string, description?: string, url?: string, icon?: string }`

**Renders**: Interactive timeline with dots/lines connecting events. Each event shows date, label, optional description. Clickable if URL provided. Collapsible with summary showing date range.

**Used in Post 1**: Section 2 (Origin story — 72 hours timeline)

---

## DirTree

**Placeholder**:
```markdown
<!-- COMPONENT: DirTree { collapsible: true, label: "Plugin bundle structure" } -->
my-plugin/
  .claude-plugin/plugin.json
  skills/
    brainstorm/SKILL.md
    review/SKILL.md
  .claude/rules/
    frontmatter.md
  hooks/hooks.json
  .mcp.json
<!-- /COMPONENT -->
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `collapsible` | boolean | no (default: true) | Collapse/expand toggle |
| `label` | string | no | Caption above the tree |
| `highlight` | string[] | no | Paths to visually highlight |

**Renders**: Styled directory tree with file/folder icons. Collapsible with summary showing root name. Highlighted paths shown in accent color.

**Used in Post 1**: Section 3.2 callout box (plugins as bundles of component types)

---

## CodeBlock

**Placeholder**:
```markdown
<!-- COMPONENT: CodeBlock { lang: "json", collapsible: true, title: "settings.json hooks config" } -->
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{ "type": "command", "command": "validator.sh" }]
    }]
  }
}
<!-- /COMPONENT -->
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `lang` | string | yes | Language for syntax highlighting |
| `collapsible` | boolean | no (default: true) | Collapse/expand toggle |
| `title` | string | no | Header label |
| `lineNumbers` | boolean | no (default: false) | Show line numbers |

**Renders**: Syntax-highlighted code block with optional title bar and collapse toggle. Uses existing code highlight theme from the blog.

**Used in Post 1**: Section 3.3 (scope hierarchy example, if included)

---

## CLISnippet

**Placeholder**:
```markdown
<!-- COMPONENT: CLISnippet { collapsible: true, title: "Checking what loaded" } -->
$ claude --hooks-debug
[InstructionsLoaded] session_start: CLAUDE.md (user)
[InstructionsLoaded] session_start: .claude/rules/cf-wrangler.md (skipped, no glob match)
[InstructionsLoaded] path_glob_match: .claude/rules/cf-wrangler.md (activated)
<!-- /COMPONENT -->
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `collapsible` | boolean | no (default: true) | Collapse/expand toggle |
| `title` | string | no | Header label |
| `prompt` | string | no (default: "$") | Shell prompt character |

**Renders**: Terminal-styled block with prompt/command distinction. Input lines prefixed with prompt char; output lines styled differently. Collapsible.

**Used in Post 1**: Section 3.3 (demonstrating pipeline evidence)

---

## Asciinema

Not used in Post 1. Contract included for completeness.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | string | yes | Path to `.cast` file OR asciinema.org URL |
| `cols` | number | no | Terminal columns |
| `rows` | number | no | Terminal rows |
| `autoplay` | boolean | no (default: false) | Auto-start playback |
| `collapsible` | boolean | no (default: true) | Collapse/expand toggle |

---

## People DB Contract

**Location**: `src/data/people.json` (or `.jsonld`)

**Schema** (schema.org/Person compatible):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "karpathy",
  "name": "Andrej Karpathy",
  "jobTitle": "AI Researcher",
  "affiliation": {
    "@type": "Organization",
    "name": "Independent (prev. Tesla, OpenAI)"
  },
  "sameAs": [
    "https://x.com/karpathy",
    "https://karpathy.ai",
    "https://www.linkedin.com/in/andrejkarpathy"
  ],
  "image": "/assets/people/karpathy.jpg",
  "tags": ["ai", "context-engineering", "llm"]
}
```

**Link precedence**: When rendering a person's name as a link, select the first available from:
1. Twitter/X URL (contains `x.com` or `twitter.com`)
2. Personal URL (not a social platform)
3. LinkedIn URL (contains `linkedin.com`)
4. Affiliation URL

**Custom fields** (beyond schema.org): `tags` array for filtering. These don't conflict with schema.org — they're simply additional properties, which JSON-LD allows freely.

**Initial entries needed for Post 1**:

| ID | Name | Affiliation | Used In |
|----|------|-------------|---------|
| `karpathy` | Andrej Karpathy | Independent (prev. Tesla, OpenAI) | Sec 2.1 (tweet, popup), Sec 2.3 |
| `lutke` | Tobi Lutke | Shopify (CEO) | Sec 2.1 (tweet) |
| `willison` | Simon Willison | Independent | Sec 2.3 |
| `schmid` | Phil Schmid | Hugging Face | Sec 2.2 |
| `schulhoff` | Sander Schulhoff | University of Maryland / Prompt Report | Sec 1.1 |
| `sahoo` | Pranab Sahoo | IIT Kharagpur / PE Survey | Sec 1.1 |
| `mei-lingrui` | Lingrui Mei | CE Survey lead author | Sec 3.1 (via OGCard) |
| `hua-qishuo` | Qishuo Hua | CE 2.0 lead author | Sec 2.3 |
| `gupta-aakash` | Aakash Gupta | Product Growth (newsletter) | Sec 4.2 |

**NOTE**: The draft Tweet component on line 44 uses `author: "lutke"` (not `"tobi"`). All person references use the `@id` from the People DB, not social handles.
