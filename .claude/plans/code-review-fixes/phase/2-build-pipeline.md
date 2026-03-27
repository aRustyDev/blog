# Phase 2: Build Pipeline Fixes

**Priority**: Critical — deployment blockers
**Findings**: BUILD-001, BUILD-002, BUILD-003, BUILD-006
**Estimated time**: 30 minutes
**Dependencies**: None

## Tasks

### BUILD-001: Add wrangler to devDependencies
- [ ] `npm install -D wrangler`
- [ ] Verify `wrangler.jsonc` $schema resolves

### BUILD-002 + BUILD-003: Fix deploy recipes
- [ ] `justfile` line 45: change `npx wrangler pages deploy dist --project-name=blog` to `npx wrangler deploy`
- [ ] `justfile` line 50: same change for deploy-only

### BUILD-006: tag-projects.ts dry-run counter
- [ ] Move `updated++` inside the `else` branch (actual write path)
- [ ] Or print "would-update" count separately in dry-run mode

### Verification
- [ ] `just graph-dev` works
- [ ] `just graph-prod` works
- [ ] `just tag-projects --dry-run` shows correct count
- [ ] Commit: `fix: add wrangler dep, fix deploy recipes, fix dry-run counter`
