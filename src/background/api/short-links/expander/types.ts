export type LinkExpander = {
  build({ shortLink, link }: { shortLink: string; link: string }): string;
};
