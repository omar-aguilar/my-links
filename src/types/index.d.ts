/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.csv' {
  const content: string;
  export = content;
}

type Domain = string;

interface RawLinkHandler {
  urlFilter: chrome.events.UrlFilter;
  canHandleURL: (url: URL) => boolean;
  getRawLink: (url: URL) => string;
}

type SourceLink = URL;
type RawLink = string;
interface Link {
  domain: string;
  slug: string;
  rawLink: string;

  isValid(): boolean;
  toString(): string;
}
type ExternalLink = string;
type Similarity = {
  link: Link;
  description: string;
};

interface LinkManager {
  getLink(url: SourceLink): Promise<Link>;
}

declare namespace ChromeNavigationManager {
  type OnBeforeNavigate = (
    details: chrome.webNavigation.WebNavigationParentedCallbackDetails
  ) => Promise<void>;
}
interface ChromeNavigationManager {
  onBeforeNavigate: ChromeNavigationManager.OnBeforeNavigate;
}

interface RedirectManager {
  redirect(link: Link, externalLink: ExternalLink): void;
}

interface DB {
  getExternalLink: (link: Link) => Promise<ExternalLink>;
  getSimilarities: (link: Link) => Promise<Similarity[]>;
}

declare namespace ChromeMessageManager {
  type RuntimeSendResponseFn = (response?: any) => void;
  type Sender = chrome.runtime.MessageSender;
  type OnMessage = (
    message: any,
    sender: ChromeMessageManager.Sender,
    sendResponse: ChromeMessageManager.RuntimeSendResponseFn
  ) => boolean;
}
interface ChromeMessageManager {
  onMessage: ChromeMessageManager.OnMessage;
}

declare namespace MessageManager {
  type SIMILARITIES = 'similarities';
  type SimilaritiesData = {
    rawLink: RawLink;
  };
  type SimilaritiesMessage = {
    action: SIMILARITIES;
    data: SimilaritiesData;
  };
  type Message = SimilaritiesMessage;
}

declare namespace ChromeOmniboxManager {
  type SuggestFn = (suggestResults: chrome.omnibox.SuggestResult[]) => void;
  type OnInputEntered = (rawLink: string) => boolean;
  type OnInputChanged = (inputText: string, sendSuggestions: SuggestFn) => boolean;
}
interface ChromeOmniboxManager {
  onInputEntered: ChromeOmniboxManager.OnInputEntered;
  onInputChanged: ChromeOmniboxManager.OnInputChanged;
}
