# Phase 0: Broken Tokens

**Priority**: Immediate — visual regression from Tailwind @theme rename
**Findings**: DEAD-004
**Estimated time**: 5 minutes

## Tasks

- [ ] Fix `src/components/Tag.astro:19` — `border-foreground` → `border-fg`
- [ ] Fix `src/components/Tag.astro:20` — `border-accent` → `border-ac`
- [ ] Verify: `grep -rn 'border-foreground\|border-accent' src/ --include="*.astro" --include="*.css"`
- [ ] Verify: `just build` passes
- [ ] Commit: `fix: Tag.astro broken Tailwind tokens from @theme rename`
