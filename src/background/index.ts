import csvData from './data/seedDB.csv';
import LocalPouchAPI from './api/short-links/local/pouch';
import SearchEngineLinkHandler, {
  GoogleSearch,
  BingSearch,
  YahooSearch,
  DuckDuckGoSearch,
} from './manager/link/SearchEngine';
import DomainLinkHandler, { DomainWithAPI } from './manager/link/Domain';
import MessageManager, { ShortLinkMessage, DomainMessage } from './manager/extension/Message';
import OmniboxManager, {
  SuggestionsInputChanged,
  RedirectInputEntered,
} from './manager/extension/Omnibox';
import { loadCSVIntoAPI, onNonMainDomainsUpdated, setMainDomain, loadCSVFromURL } from './utils';
import getBrowserAPIs from './api/web-extension';

const extensionMainDomain = process.env.DOMAIN as string;

const localAPI = LocalPouchAPI();
const browserAPIs = getBrowserAPIs();
const domainHandler = DomainLinkHandler(browserAPIs);
const searchEngineHandler = SearchEngineLinkHandler(browserAPIs);
const messageWrapper = MessageManager(browserAPIs);
const omniboxManager = OmniboxManager(browserAPIs);

loadCSVFromURL(process.env.CSV_DB_URL).then((csv) => {
  const data = csv || csvData;
  loadCSVIntoAPI(data, extensionMainDomain, localAPI);
});

setMainDomain(extensionMainDomain);

domainHandler.register(DomainWithAPI(extensionMainDomain));
onNonMainDomainsUpdated((domains: string[]) =>
  domains.map((domain) => domainHandler.register(DomainWithAPI(domain)))
);

searchEngineHandler.register(GoogleSearch());
searchEngineHandler.register(BingSearch());
searchEngineHandler.register(YahooSearch());
searchEngineHandler.register(DuckDuckGoSearch());
searchEngineHandler.register(BingSearch());

ShortLinkMessage(localAPI).forEach(([id, handler]) => messageWrapper.register(id, handler));
DomainMessage().forEach(([id, handler]) => messageWrapper.register(id, handler));

omniboxManager.register('inputChanged', SuggestionsInputChanged(localAPI));
omniboxManager.register('inputEntered', RedirectInputEntered(browserAPIs, localAPI));
