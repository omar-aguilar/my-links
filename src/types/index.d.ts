/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.csv' {
  const content: string;
  export = content;
}

type ShortLinkEntry = {
  shortLink: string;
  description: string;
  link: string;
  tags?: string[];
};

type URLFilter = chrome.events.UrlFilter[];
type SearchHandler = {
  urlFilter: URLFilter;
  getSearchTerm: (url: URL) => string;
};

type LinkHandler = {
  urlFilter: URLFilter;
  getLink: (url: URL) => Promise<ShortLinkEntry>;
};

type MessageHandler<RequestMessage = any, ResponseMessage = any> = {
  canHandle: (message: RequestMessage) => boolean;
  handle: (message: RequestMessage, sendResponse: (response?: ResponseMessage) => void) => void;
};

interface ShortLinkAPI {
  resolve: (shortLink: string) => Promise<ShortLinkEntry>;
  search: (shortLink: string) => Promise<ShortLinkEntry[]>;
  add: (linkData: ShortLinkEntry) => Promise<boolean>;
  update: (linkData: ShortLinkEntry) => Promise<boolean>;
  remove: (shortLink: string) => Promise<boolean>;
}

type BrowserAPIs = {
  storage: StorageWrapper;
  webNavigation: WebNavigationWrapper;
  runtime: RuntimeWrapper;
  tabs: TabsWrapper;
  omnibox: OmniboxWrapper;
};

declare namespace WebNavigationWrapper {
  type CallbackDetails = {
    frameId: number;
    tabId: number;
    url: string;
  };
}
interface WebNavigationWrapper<Filters = any> {
  onBeforeNavigate: (
    callback: (details: WebNavigationWrapper.CallbackDetails) => void | Promise<void>,
    filters: Filters
  ) => void;
}

declare namespace StorageWrapper {
  type Changes = Record<string, any>;
}
interface StorageWrapper {
  onChanged: (keys: string[], callback: (changes: StorageWrapper.Changes) => void) => void;
  set: (values: StorageWrapper.Changes) => Promise<void>;
  get: (values: string[]) => Promise<StorageWrapper.Changes>;
}

interface RuntimeWrapper {
  onMessage: (callback: (message: any, sendResponse: (response?: any) => void) => void) => void;
  sendMessage: <Message = any, Response = any>(message: Message) => Promise<Response>;
  getURL: (path: string) => string;
}

declare namespace TabsWrapper {
  type UpdateProperties = {
    url: string;
  };
}
interface TabsWrapper {
  update: (tabId: number, options: TabsWrapper.UpdateProperties) => void;
  updateCurrent: (options: TabsWrapper.UpdateProperties) => void;
}

declare namespace OmniboxWrapper {
  type OnInputEnteredCallback = (input: string) => void;
  type OnInputChangedCallback<SuggestResult = any> = (
    input: string,
    suggest: (suggestResults: SuggestResult[]) => void
  ) => void;
  type OmniboxEvent = 'inputChanged' | 'inputEntered';
  type OmniboxHandler<Event extends OmniboxEvent> = Event extends 'inputChanged'
    ? OnInputChangedCallback
    : Event extends 'inputEntered'
    ? OnInputEnteredCallback
    : never;
}
interface OmniboxWrapper<SuggestResult = any> {
  onInputEntered: (callback: OmniboxWrapper.OnInputEnteredCallback) => void;
  onInputChanged: (callback: OmniboxWrapper.OnInputChangedCallback<SuggestResult>) => void;
}
