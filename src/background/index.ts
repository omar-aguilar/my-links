import LocalPouchAPI from './api/short-links/local/pouch';
import StorageDomainAPI from './api/domains/local/storage';
import SearchEngineLinkHandler, {
  GoogleSearch,
  BingSearch,
  YahooSearch,
  DuckDuckGoSearch,
} from './manager/link/SearchEngine';
import DomainLinkHandler, { SimpleDomain } from './manager/link/Domain';
import APIHandler from './manager/api/APIHandler';
import MessageManager from './manager/extension/Message';
import { ShortLinkMessage, DomainMessage } from '@/shared/messages';
import OmniboxManager, {
  SuggestionsInputChanged,
  RedirectInputEntered,
} from './manager/extension/Omnibox';
import {
  loadCSVIntoAPI,
  onNonMainDomainsUpdated,
  setMainDomain,
  loadCSVFromURL,
  getEnvironment,
} from './utils';
import getBrowserAPIs from '@/shared/web-extension';
import { extensionRedirect } from '@/shared/utils';

const env = getEnvironment();

const extensionMainDomain = env.DOMAIN;

const browserAPIs = getBrowserAPIs();
const redirect = extensionRedirect(browserAPIs);
const shortLinksAPI = LocalPouchAPI();
const domainsAPI = StorageDomainAPI(browserAPIs);
const domainHandler = DomainLinkHandler(browserAPIs, redirect);
const searchEngineHandler = SearchEngineLinkHandler(browserAPIs, redirect);
const messageWrapper = MessageManager(browserAPIs);
const omniboxManager = OmniboxManager(browserAPIs);
const apiHandler = APIHandler();

setMainDomain(extensionMainDomain);

loadCSVFromURL(env.CSV_DB_URL)
  .catch(() => loadCSVFromURL(browserAPIs.runtime.getURL(env.LOCAL_CSV_DB_URL)))
  .then((csv) => {
    const data = csv || '';
    loadCSVIntoAPI(data, extensionMainDomain, shortLinksAPI);
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.debug('no initial csv data loaded');
  });

apiHandler.register(extensionMainDomain, shortLinksAPI);
onNonMainDomainsUpdated((domains: string[]) =>
  domains.map((domain) => apiHandler.register(domain, shortLinksAPI))
);

domainHandler.register(SimpleDomain(extensionMainDomain));
onNonMainDomainsUpdated((domains: string[]) =>
  domains.map((domain) => domainHandler.register(SimpleDomain(domain)))
);

searchEngineHandler.register(GoogleSearch());
searchEngineHandler.register(BingSearch());
searchEngineHandler.register(YahooSearch());
searchEngineHandler.register(DuckDuckGoSearch());
searchEngineHandler.register(BingSearch());

ShortLinkMessage(apiHandler.api).forEach(([id, handler]) => messageWrapper.register(id, handler));
DomainMessage(domainsAPI).forEach(([id, handler]) => messageWrapper.register(id, handler));

omniboxManager.register('inputChanged', SuggestionsInputChanged(shortLinksAPI, domainsAPI));
omniboxManager.register('inputEntered', RedirectInputEntered(redirect, domainsAPI));
