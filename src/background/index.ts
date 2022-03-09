import { parseCSVDB } from './dbReader';
import generateSpellCheckTree from './BKTree';
import db from './db.csv';

const domain = process.env.DOMAIN;
const domainPrefix = `${domain}/`;
const urlMap = parseCSVDB(db);
const spellCheckTree = generateSpellCheckTree(urlMap);

const { webNavigation, tabs } = chrome;

function isValidLink(link: string): boolean {
  return link?.startsWith(domainPrefix);
}

function getLinkFromQueryParamFn(param: string): LinkHandler {
  const queryParam = param;
  function getLinkFromQueryParam(url: URL): string {
    const link = url.searchParams.get(queryParam) || '';
    if (!isValidLink(link)) {
      return '';
    }
    return link;
  }
  return getLinkFromQueryParam;
}

function defaultLinkHandler(url: URL): string {
  const baseLink = url.href.replace(/^https?:\/\//, '');
  if (!isValidLink(baseLink)) {
    return '';
  }
  return baseLink;
}

const linkHandlers: LinkHandlerMap[] = [
  { hostSuffix: 'google.com', handler: getLinkFromQueryParamFn('q') },
  { hostSuffix: 'duckduckgo.com', handler: getLinkFromQueryParamFn('q') },
  { hostSuffix: 'bing.com', handler: getLinkFromQueryParamFn('q') },
  { hostSuffix: 'yahoo.com', handler: getLinkFromQueryParamFn('p') },
];

function getLinkHandler(hostname: string): LinkHandler {
  const customLinkHandler = linkHandlers.find((link) => {
    if (!hostname.endsWith(link.hostSuffix)) {
      return false;
    }
    return link.handler;
  });
  return customLinkHandler?.handler || defaultLinkHandler;
}

function getLink(url: URL): string {
  const { hostname } = url;
  const linkHandler = getLinkHandler(hostname);
  const link = linkHandler(url);
  return link;
}

function handleBeforeNavigate(
  details: chrome.webNavigation.WebNavigationParentedCallbackDetails
): void {
  const { url, frameId, tabId } = details;
  if (frameId !== 0) {
    console.log('ignoring child action');
    return;
  }

  const myURL = new URL(url);
  console.log('analize myURL', myURL);
  const link = getLink(myURL);
  if (!link) {
    console.log('not a valid link, skipping');
    return;
  }

  const internalLink = link.replace(domainPrefix, '');

  if (myURL.host === domain && internalLink === 'home') {
    console.log('is home page, do nothing');
    return;
  }

  const redirect = urlMap[internalLink];
  if (!redirect) {
    console.log('no match found TODO: render a not found page and a list?', link);
    const popupUrl = chrome.runtime.getURL('popup.html');
    tabs.update({
      url: `${popupUrl}#/link-not-found?link=${link}`,
    });
    // tabs.remove(tabId);
    return;
  }

  // remove and create looks better than tabs.update({ url: redirect });
  tabs.create({ url: redirect });
  tabs.remove(tabId);
}

webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, {
  url: [
    { hostSuffix: 'google.com' },
    { hostSuffix: 'duckduckgo.com' },
    { hostSuffix: 'bing.com' },
    { hostSuffix: 'yahoo.com' },
    { hostEquals: domain },
  ],
});

type SlugData = {
  slug: string;
  link: string;
};
type CleanSlugToLink = Record<string, SlugData>;
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  const { action, data } = message as Message;
  if (!action && !data) {
    return;
  }
  if (action === 'similarities' && data.link) {
    const { link, tolerance } = data;
    const internalLink = link.replace(domainPrefix, '');
    const similarities = spellCheckTree.search(internalLink, tolerance);
    const cleanSlugToLink = Object.entries(urlMap).reduce((acc, [slug, slugLink]) => {
      const cleanSlug = slug.replace(/[-_]/g, '');
      return {
        ...acc,
        [cleanSlug]: {
          slug,
          link: slugLink,
        },
      };
    }, {} as CleanSlugToLink);
    const similaritiesData = similarities.map((similarity) => cleanSlugToLink[similarity]);
    const dedupSimilarities = similaritiesData.reduce((acc, slugData) => {
      const isExistentLink = Boolean(
        acc.find((currentSlugData) => currentSlugData.link === slugData.link)
      );
      if (!isExistentLink) {
        acc.push(slugData);
      }
      return acc;
    }, [] as SlugData[]);
    const sims = dedupSimilarities.map((slugData) => `${domainPrefix}${slugData.slug}`);
    sendResponse(sims);
  }
});
