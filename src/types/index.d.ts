declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.csv' {
  const content: string;
  export = content;
}

type LinkHandler = (url: URL) => string;
type URLMap = Record<string, string>;

type LinkHandlerMap = {
  hostSuffix: string;
  handler: LinkHandler;
};

type SIMILARITIES = 'similarities';
type SimilaritiesData = {
  link: string;
  tolerance?: number;
};

type SimilaritiesMessage = {
  action: SIMILARITIES;
  data: SimilaritiesData;
};

type Message = SimilaritiesMessage;
