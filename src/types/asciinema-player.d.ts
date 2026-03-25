declare module "asciinema-player" {
  interface PlayerOptions {
    cols?: number;
    rows?: number;
    autoPlay?: boolean;
    loop?: boolean;
    speed?: number;
    theme?: string;
  }

  function create(
    src: string,
    element: HTMLElement,
    options?: PlayerOptions
  ): unknown;
}

declare module "asciinema-player/dist/bundle/asciinema-player.css" {
  const content: string;
  export default content;
}
