import Papa from 'papaparse';

type CSVLine = {
  Link: string;
  Slugs: string;
};

function parseCSVDB(data: string): URLMap {
  const { data: lines } = Papa.parse<CSVLine>(data, { header: true });

  const urlMap = lines.reduce((acc, line) => {
    const slugs = line.Slugs.split(',');
    const slugEntries = slugs.reduce(
      (slugMap, slug) => ({
        ...slugMap,
        [slug.trim()]: line.Link,
      }),
      {}
    );
    return {
      ...acc,
      ...slugEntries,
    };
  }, {});

  return urlMap;
}

// eslint-disable-next-line import/prefer-default-export
export { parseCSVDB };
