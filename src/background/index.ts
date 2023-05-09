import csvData from './data/seedDB.csv';
import LocalPouchAPI from './api/short-links/local/pouch';
import SearchEngineLinkHandler, {
  GoogleSearch,
  BingSearch,
  YahooSearch,
  DuckDuckGoSearch,
} from './manager/link/SearchEngine';
import DomainLinkHandler, { SimpleDomain } from './manager/link/Domain';
import APIHandler from './manager/api/APIHandler';
import MessageManager from './manager/extension/Message';
import { ShortLinkMessage, DomainMessage } from '../shared/messages';
import OmniboxManager, {
  SuggestionsInputChanged,
  RedirectInputEntered,
} from './manager/extension/Omnibox';
import { loadCSVIntoAPI, onNonMainDomainsUpdated, setMainDomain, loadCSVFromURL } from './utils';
import getBrowserAPIs from '../shared/web-extension';

const extensionMainDomain = process.env.DOMAIN as string;

const localAPI = LocalPouchAPI();
const browserAPIs = getBrowserAPIs();
const domainHandler = DomainLinkHandler(browserAPIs);
const searchEngineHandler = SearchEngineLinkHandler(browserAPIs);
const messageWrapper = MessageManager(browserAPIs);
const omniboxManager = OmniboxManager(browserAPIs);
const apiHandler = APIHandler();

setMainDomain(extensionMainDomain);

loadCSVFromURL(process.env.CSV_DB_URL).then((csv) => {
  const data = csv || csvData;
  loadCSVIntoAPI(data, extensionMainDomain, localAPI);
});

apiHandler.register(extensionMainDomain, localAPI);
onNonMainDomainsUpdated((domains: string[]) =>
  domains.map((domain) => apiHandler.register(domain, localAPI))
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
DomainMessage().forEach(([id, handler]) => messageWrapper.register(id, handler));

omniboxManager.register('inputChanged', SuggestionsInputChanged(localAPI));
omniboxManager.register('inputEntered', RedirectInputEntered(browserAPIs));
