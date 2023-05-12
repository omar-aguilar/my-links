import defaultShortLinkExpander from '@/background/api/short-links/expander/defaultShortLinkExpander';

describe('defaultShortLinkExpander', () => {
  type TestCase = {
    shortLink: string;
    storedLink: string;
    expected: string;
    description: string;
  };

  const testCases: TestCase[] = [
    {
      shortLink: 'go/example',
      storedLink: 'https://example.com/',
      expected: 'https://example.com/',
      description: 'returns same link when no dynamic variables "{*}" are present',
    },
    {
      shortLink: 'go/example',
      storedLink: 'https://example.com/{*}',
      expected: 'https://example.com/',
      description:
        'replaces dynamic variables "{*}" with empty string when no path param is present',
    },
    {
      shortLink: 'go/example/admin',
      storedLink: 'https://example.com/{*}',
      expected: 'https://example.com/admin',
      description: 'replaces dynamic variables "{*}" with path params',
    },
    {
      shortLink: 'go/example',
      storedLink: 'https://example.com/user/{*}/page/{*}',
      expected: 'https://example.com/user//page/',
      description: 'returns invalid url because no path params are present',
    },
    {
      shortLink: 'go/example/lilo',
      storedLink: 'https://example.com/user/{*}/page/{*}',
      expected: 'https://example.com/user/lilo/page/',
      description: 'returns url with unmatched dynamic variables "{*}" replaced with empty strings',
    },
    {
      shortLink: 'go/example/lilo/settings',
      storedLink: 'https://example.com/user/{*}/page/{*}',
      expected: 'https://example.com/user/lilo/page/settings',
      description: 'replaces dynamic variables "{*}" with path params',
    },
    {
      shortLink: 'go/example/lilo/settings/ignored_path',
      storedLink: 'https://example.com/user/{*}/page/{*}',
      expected: 'https://example.com/user/lilo/page/settings',
      description:
        'replaces dynamic variables "{*}" with path params, extra path params are ignored',
    },
  ];

  const jestTestCases = testCases.map((testCase) => [
    testCase.shortLink,
    testCase.storedLink,
    testCase.expected,
    testCase.description,
  ]);
  test.each(jestTestCases)(
    'replace dynamic variables "{*}" on %s when using link %s"',
    (shortLink, link, expected) => {
      const result = defaultShortLinkExpander.build({
        link,
        shortLink,
      });
      expect(result).toBe(expected);
    }
  );
});
