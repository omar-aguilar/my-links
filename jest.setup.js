global.chrome = {
  storage: {
    onChanged: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    local: {
      get: jest.fn(() =>
        Promise.resolve({
          'domain:registered': [
            {
              domain: 'test',
            },
          ],
          'domain:main': 'test',
        })
      ),
      set: jest.fn(),
    },
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
  webNavigation: {
    onCompleted: {
      addListener: jest.fn(),
    },
  },
};
