export const DBMock: DB = {
  getExternalLink: jest.fn(),
  getSimilarities: jest.fn(),
};

export const LinkManagerMock: LinkManager = {
  getLink: jest.fn(),
};

export const RedirectManagerMock: RedirectManager = {
  redirect: jest.fn(),
};

export const ChromeMock = {
  tabs: {
    update: jest.fn(),
  } as unknown as typeof chrome.tabs,
  runtime: {
    getURL: jest.fn(),
  } as unknown as typeof chrome.runtime,
};
