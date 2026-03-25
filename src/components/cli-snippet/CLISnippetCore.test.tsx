import { render, screen } from "@testing-library/react";
import CLISnippetCore from "./CLISnippetCore";
import { SAMPLE_SHIKI_HTML } from "@/test/fixtures";

// Mock useTokenMap so it doesn't rely on rAF / real DOM parsing
vi.mock("./hooks/useTokenMap", () => ({
  useTokenMap: () => null,
}));

// Mock @/utils/shiki so dev-mode import doesn't explode in happy-dom
vi.mock("@/utils/shiki", () => ({
  getHighlighter: () => Promise.reject(new Error("no shiki in test")),
}));

describe("CLISnippetCore", () => {
  it("should render pre-rendered HTML via the html prop", () => {
    const { container } = render(<CLISnippetCore html={SAMPLE_SHIKI_HTML} />);
    // dangerouslySetInnerHTML injects the Shiki output
    const codeContainer = container.querySelector(".cli-snippet-code div");
    expect(codeContainer).not.toBeNull();
    expect(codeContainer!.innerHTML).toBe(SAMPLE_SHIKI_HTML);
  });

  it("should show Chrome (dots + title) when chrome=true", () => {
    const { container } = render(
      <CLISnippetCore html={SAMPLE_SHIKI_HTML} chrome={true} title="my-file.ts" />
    );
    expect(container.querySelector(".cli-snippet-chrome")).toBeInTheDocument();
    expect(container.querySelector(".cli-snippet-dots")).toBeInTheDocument();
    expect(screen.getByText("my-file.ts")).toBeInTheDocument();
  });

  it("should hide Chrome when chrome=false", () => {
    const { container } = render(
      <CLISnippetCore html={SAMPLE_SHIKI_HTML} chrome={false} title="hidden" />
    );
    expect(container.querySelector(".cli-snippet-chrome")).not.toBeInTheDocument();
  });

  it("should show copy button when showCopy=true", () => {
    render(<CLISnippetCore html={SAMPLE_SHIKI_HTML} showCopy={true} />);
    expect(
      screen.getByRole("button", { name: "Copy code as markdown" })
    ).toBeInTheDocument();
  });

  it("should hide copy button when showCopy=false", () => {
    render(<CLISnippetCore html={SAMPLE_SHIKI_HTML} showCopy={false} />);
    expect(
      screen.queryByRole("button", { name: "Copy code as markdown" })
    ).not.toBeInTheDocument();
  });

  it("should show loading skeleton when no html and no code", () => {
    const { container } = render(<CLISnippetCore />);
    expect(container.querySelector(".cli-snippet-skeleton")).toBeInTheDocument();
    // No chrome or code container
    expect(container.querySelector(".cli-snippet-chrome")).not.toBeInTheDocument();
  });

  it("should show error fallback when code is provided but html is undefined", () => {
    // In happy-dom Shiki won't load, so displayHtml stays null -> fallback path
    const { container } = render(
      <CLISnippetCore code="hello world" lang="text" html={undefined} />
    );
    const fallback = container.querySelector(".cli-snippet-fallback");
    expect(fallback).toBeInTheDocument();
    expect(fallback!.querySelector("code")!.textContent).toBe("hello world");
  });

  it("should call the render-prop child with tokenMap parameter", () => {
    // useTokenMap is mocked to return null
    render(
      <CLISnippetCore html={SAMPLE_SHIKI_HTML}>
        {(tokenMap) => (
          <div data-testid="child">{tokenMap ? "yes" : "no"}</div>
        )}
      </CLISnippetCore>
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    // tokenMap is null because of our mock
    expect(child.textContent).toBe("no");
  });
});
