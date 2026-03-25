/**
 * Smoke test — verifies vitest framework is configured correctly.
 */
describe("vitest setup", () => {
  it("should run tests", () => {
    expect(1 + 1).toBe(2);
  });

  it("should have happy-dom environment", () => {
    expect(typeof document).toBe("object");
    expect(typeof window).toBe("object");
  });

  it("should resolve @/ path alias", async () => {
    const { getPerson } = await import("@/utils/people");
    expect(typeof getPerson).toBe("function");
  });
});
