import { test, expect } from "@playwright/test";

test.describe("Component Test Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dev/component-test/");
  });

  test("page loads successfully", async ({ page }) => {
    // Verify HTTP 200 by checking page content loaded
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Component Test Page");
  });

  test("CodeBlock renders with Shiki highlighting", async ({ page }) => {
    const shikiElement = page.locator(".shiki").first();
    await expect(shikiElement).toBeVisible();
  });

  test("CodeBlock collapsible toggle works", async ({ page }) => {
    // The first CodeBlock is collapsible (default) — wrapped in <details open>
    const details = page.locator("details").first();
    await expect(details).toHaveAttribute("open", "");

    // The body content should be visible when open
    const body = details.locator(".code-block-body");
    await expect(body).toBeVisible();

    // Click summary to collapse
    const summary = details.locator("summary");
    await summary.click();

    // After closing, the body should be hidden
    await expect(body).not.toBeVisible();

    // Click again to re-open
    await summary.click();
    await expect(body).toBeVisible();
  });

  test("CLISnippet shows prompt chars with accent styling", async ({
    page,
  }) => {
    const prompt = page.locator(".cli-prompt").first();
    await expect(prompt).toBeVisible();

    // Prompt should contain the $ character
    await expect(prompt).toContainText("$");

    // Verify accent color styling is applied (class cli-prompt has text-ac)
    const color = await prompt.evaluate(
      el => getComputedStyle(el).color
    );
    // Just verify a color value is set (non-empty, not transparent)
    expect(color).toBeTruthy();
    expect(color).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("DirTree shows tree connector characters", async ({ page }) => {
    const dirTree = page.locator(".dir-tree").first();
    await expect(dirTree).toBeVisible();

    // Check for tree connector characters in the rendered tree
    const treeText = await dirTree.textContent();
    expect(treeText).toContain("\u251C\u2500\u2500"); // ├──
    expect(treeText).toContain("\u2514\u2500\u2500"); // └──
  });

  test("Tweet card has link to x.com", async ({ page }) => {
    const tweetCard = page.locator(".tweet-card").first();
    await expect(tweetCard).toBeVisible();

    const href = await tweetCard.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("x.com");
  });

  test("PersonPopup: hover on person name shows popup", async ({ page }) => {
    const trigger = page.locator(".person-trigger").first();
    await expect(trigger).toBeVisible();

    // Popup should be invisible initially
    const popup = page.locator(".person-popup").first();
    await expect(popup).not.toBeVisible();

    // Hover on the person wrapper to trigger CSS :hover
    const wrapper = page.locator(".person-wrapper").first();
    await wrapper.hover();

    // Popup should now be visible
    await expect(popup).toBeVisible();
  });

  test("Timeline vertical: dots visible", async ({ page }) => {
    const dots = page.locator(".timeline-dot");
    const count = await dots.count();
    expect(count).toBeGreaterThan(0);

    // First dot should be visible
    await expect(dots.first()).toBeVisible();
  });

  test("Timeline horizontal: container has overflow-x", async ({ page }) => {
    const horizontal = page.locator(".timeline-horizontal").first();
    await expect(horizontal).toBeVisible();

    // Verify the container has overflow-x-auto styling
    const overflowX = await horizontal.evaluate(
      el => getComputedStyle(el).overflowX
    );
    expect(overflowX).toBe("auto");
  });

  test("OGCard: card element present with link", async ({ page }) => {
    const ogCard = page.locator(".og-card").first();
    await expect(ogCard).toBeVisible();

    const href = await ogCard.getAttribute("href");
    expect(href).toBeTruthy();
    // Should link to the URL passed as prop
    expect(href).toContain("docs.astro.build");
  });
});
