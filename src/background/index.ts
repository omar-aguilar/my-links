import csvData from './data/seedDB.csv';
import LocalMemoryAPI from './api/short-links/local/memory';
import SearchEngineLinkHandler, { GoogleSearch } from './manager/link/SearchEngine';
import DomainLinkHandler, { DomainWithAPI } from './manager/link/Domain';
import MessageManager, { SimilaritiesMessage, AddLinkMessage } from './manager/extension/Message';
import OmniboxManager, {
  SuggestionsInputChanged,
  RedirectInputEntered,
} from './manager/extension/Omnibox';
import { loadCSVIntoAPI, setMainDomain } from './utils';
import getBrowserAPIs from './api/web-extension';

const extensionMainDomain = process.env.DOMAIN as string;

const localMemoryAPI = LocalMemoryAPI();
const browserAPIs = getBrowserAPIs();
const domainHandler = DomainLinkHandler(browserAPIs);
const searchEngineHandler = SearchEngineLinkHandler(browserAPIs);
const messageWrapper = MessageManager(browserAPIs);
const omniboxManager = OmniboxManager(browserAPIs);

loadCSVIntoAPI(csvData, extensionMainDomain, localMemoryAPI);
setMainDomain(extensionMainDomain);

domainHandler.register(DomainWithAPI(extensionMainDomain, localMemoryAPI));
searchEngineHandler.register(GoogleSearch());
messageWrapper.register(SimilaritiesMessage(localMemoryAPI));
messageWrapper.register(AddLinkMessage(localMemoryAPI));
omniboxManager.register('inputChanged', SuggestionsInputChanged(localMemoryAPI));
omniboxManager.register('inputEntered', RedirectInputEntered(browserAPIs, localMemoryAPI));
