import Papa from 'papaparse';

type CSVLine = {
  Link: string;
  Slugs: string;
  Description: string;
  Tags: string;
};

export const csvLoader = (csv: string) => {
  const load = (): ShortLinkEntry[] => {
    const { data: lines } = Papa.parse<CSVLine>(csv, { header: true });
    return lines.reduce((results, line) => {
      const { Slugs = '', Tags = '', Description = '', Link = '' } = line;
      const slugs = Slugs.split(',')
        .map((slug) => slug.trim())
        .filter(Boolean);
      const tags: string[] = Tags.split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      const entries = slugs.map<ShortLinkEntry>((slug) => ({
        shortLink: slug,
        link: Link,
        description: Description,
        tags,
      }));

      entries.forEach((entry) => {
        results.push(entry);
      });

      return results;
    }, [] as ShortLinkEntry[]);
  };

  return { load };
};

export const loadCSVIntoAPI = (csvData: string, mainDomain: string, api: ShortLinkAPI) => {
  const loadedCSVData = csvLoader(csvData).load();
  loadedCSVData.forEach(async (entry) => {
    await api.add({
      ...entry,
      shortLink: `${mainDomain}/${entry.shortLink}`,
    });
  });
};
