export type Redirect = {
  setLink(url: string): void;
  setFallback(url: string): void;
  readonly link: string;
  readonly fallback: string;
};

export type GoStrategy = {
  go({ redirect, tabId }: { redirect: Redirect; tabId: number | null }): void;
};

export type RedirectBuilderReturnType = {
  setLink(url: string): RedirectBuilderReturnType;
  setLink(url: string): RedirectBuilderReturnType;
  setFallback(url: string): RedirectBuilderReturnType;
  setTabId(id: number): RedirectBuilderReturnType;
  go(): void;
  readonly link: string;
  readonly fallback: string;
  readonly tabId: number | null;
};

export type RedirectBuilder = (goStrategy: GoStrategy) => RedirectBuilderReturnType;

export type ExtensionPages<PageNames extends string> = {
  [Page in PageNames]: ReturnType<RedirectBuilder>;
};

export type ExtensionRedirect = (browserAPIs: BrowserAPIs) => ExtensionPages<'resolver' | 'main'>;
