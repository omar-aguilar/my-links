# My Links

Simple go links implementation

The intention of this project is to enable users to be able to register some short url that are easy to remember and redirect them to a real url.

Some differences on the go links implementation is that this doesn't require any modifications to the `/etc/hosts` file, logic for redirect and fetching real links is handled by the extension.

## Build and install extension
Currently the extension should work on `Chrome` based browsers like: `Chrome`, `Edge` or `Brave`, as well as `Firefox` (firefox needs a specific build step)

### Build
#### Chrome Based Browsers
1. `npm i`
1. `npm run build`
1. A folder named `dist` will be generated with the extension files.

#### Firefox Browser
Firefox supports manifest v3, but doesn't like to use web workers, so the background page needs to follow the format as manifest v2 for this browser.

1. `npm i`
1. `BROWSER=firefox npm run build`
1. A folder named `dist` will be generated with the extension files.

### Install
Each browser has its own process to enable unpacked or developer extensions.
- **Chrome**: https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked
- **Edge**: https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading=
- **Firefox**: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/
  - Remember for firefox, a [specific build is needed](#firefox-browser)

### Extension Usage

By default extension slugs can be accessed with the main registered domain (the `DOMAIN` env variable declared in `.env`)
  - For example if `g` is registered as a slug that redirects to `https://www.google.com` and `DOMAIN` is `links`, if the user types `links/g` in the browser and once enter is hit, the current browser tab will be redirected to the google home page or to a page to be able to register the link if is not registered already.

### Link storage and initial load

Currently links are stored using [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [pouchdb](https://pouchdb.com/).

Optionally the extension builder can accept a local seed db (`src/background/data/seedDB.csv`) or a url with some CSV data, the CSV needs to have the following headers:
- Link, the actual link to be redirected when using a slug, **required**
- Slugs, the slugs that will redirect to the actual link, is a comma separated field **required**
- Description, an optional description for the link.
- Tags, tags that can help to identify the link.

**NOTES:**
  - Although the seed db is obtained every time the extension is loaded, only new entries are added, meaning it will not update existing short links.
  - The data is local to the browser so currently there is no way sync links between different browsers

To pre-fetch the db from a URL, an environment variable `CSV_DB_URL` needs to be set, before building our extension.

### Add links
There are 2 options to add a link:
1. Type the link in the web browser and the hit enter, if is not found you will get redirected to a page where you can add it.
1. Click the extension icon and click on the `Add Link` menu.

### Search existing links
1. Click on the extension icon, it will open the home page which includes 2 search options:
    1. **short link**, this is a prefix search, so you will get any short link registered with that domain/prefix (domain is checkbox that will be populated based on the registered domains).
    2. **tag**, any of the tags registered within a short link.
1. Items returned in search can be edited or removed.

### Multiple domains
Besides the main domain, is also possible to add more domains:
1. Click on the extension icon
1. Click on `Manage Domains`

**NOTES:** the main domain cannot be removed.


## Extension structure

The structure of the extension is divided in 2 pieces:
  - **background**: which has wrapper around the extension web apis to support `browser` or `chrome`, and logic to talk to an API that have CRUD operation around short links, so far it only talks to a local pouchdb database.
  - **ui**: which uses react and is used to display the screens that help to make it easier to manage short links, the communication from UI to background is done primarily via `runtime.sendMessage`


### Short link resolve flow

Most browsers search whatever you type on the url bar, so in order to be able to perform a redirect, some search engine handlers are needed, so we can get the query parameter and see if we are trying to search for a short link and try to resolve that link.
There are 2 use cases for resolving a short link, via search engine or via direct url like `https://domain/short-link`

## Search Engine
There extension already supports the following search engines: Google, Yahoo, DuckDuckGo and Bing, but it can be extended to support more, the flow is as follows:
  1. User types `links/g` on the url bar of the browser
  1. The browser redirects to the default search engine, ex: if google the url will look like: https://www.google.com/search?q=links%2Fg
  1. The extension checks wether the search engine is supported, if so it will check whether the search includes a short link.
  1. The resolver page sends a message to get the real link and redirect to the real link.
  1. The search engine handler gets redirects the short link to a resolver page.
  1. The resolver page sends a message to the background to get the real link and redirect to the real link or the form to add it if is not found.

**NOTES:**
If the search engine is not supported or a short link is not detected the search works as usual.

### Direct URL
In case the user types the full url, the flow is as follows:
  1. User types `https://links/g`
  1. Browser redirects to the domain
  1. A domain handler within the extension will catch the url if the domain is registered.
  1. A redirect to the resolver page is made with the short link
  1. The resolver page sends a message to the background to get the real link and redirect to the real link or the form to add it if is not found.

Doing an extra redirect to the resolver page, is to be able to show a friendly ui while the short links gets resolved, otherwise the user will see the network error page until the link gets resolved.

### Dynamic Links

Trying to follow the spirit of go links, in theory is possible to create links as mentioned in https://www.golinks.com/help/variable-go-links/ or https://www.golinks.com/help/advanced-variable-golinks-with-default-values/

