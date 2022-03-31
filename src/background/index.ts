import LinkManager from './LinkManager';
import {
  GoogleSearch,
  DuckDuckGoSearch,
  BingSearch,
  YahooSearch,
  CustomDomain,
} from './LinkManager/handlers';
import { CSVDB } from './DB';
import NavigationManager from './NavigationManager';
import RedirectManager from './RedirectManager';
import MessageManager from './MessageManager';
import OmniboxManager from './OmniboxManager';
import dbData from './db.csv';

const { webNavigation, tabs, runtime } = chrome;
const domain = process.env.DOMAIN;

const mainDomain = domain as string;
const domains: Domain[] = [mainDomain];
const rawLinkHandlers: RawLinkHandler[] = [
  CustomDomain(mainDomain),
  GoogleSearch(),
  DuckDuckGoSearch(),
  BingSearch(),
  YahooSearch(),
];
const linkManager = LinkManager(rawLinkHandlers);
const db = CSVDB(dbData);
const redirectManager = RedirectManager(tabs, runtime);
const navigationManager = NavigationManager(domains, linkManager, db, redirectManager);
const linkHandlerUrls = rawLinkHandlers.map((handler) => handler.urlFilter);
webNavigation.onBeforeNavigate.addListener(navigationManager.onBeforeNavigate, {
  url: linkHandlerUrls,
});

const messageManager = MessageManager(db);
runtime.onMessage.addListener(messageManager.onMessage);

const omniboxManager = OmniboxManager(mainDomain, db, redirectManager);
chrome.omnibox.onInputEntered.addListener(omniboxManager.onInputEntered);
chrome.omnibox.onInputChanged.addListener(omniboxManager.onInputChanged);
