import Papa from 'papaparse';
import Link from '../../LinkManager/Link';

type CSVLine = {
  Link: string;
  Slugs: string;
};
type Slug = string;
type Data = Record<Slug, string>;

function CSVDB(csv: string): DB {
  let db: Data = {};
  let keys: string[] = [];

  function loadDB() {
    const { data: lines } = Papa.parse<CSVLine>(csv, { header: true });
    db = lines.reduce((acc, line) => {
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
    keys = Object.keys(db);
  }

  function getExternalLinkSync(link: Link): ExternalLink {
    const externalLink = db[link.slug];
    if (!externalLink) {
      return '';
    }
    return externalLink;
  }

  function getExternalLink(link: Link): Promise<ExternalLink> {
    const externalLink = getExternalLinkSync(link);
    return Promise.resolve(externalLink);
  }

  function getSimilarities(link: Link): Promise<Similarity[]> {
    const similarKeys = keys.filter((key) => {
      const cleanKey = key.replace(/[-_]/g, '');
      const cleanSlug = link.slug.replace(/[-_]/g, '');
      return cleanKey.includes(cleanSlug);
    });
    const linkSimilaritiesMap = similarKeys.reduce<Record<ExternalLink, Similarity>>((acc, key) => {
      const similarityLink = new Link(`${link.domain}/${key}`);
      const externalLink = getExternalLinkSync(similarityLink);
      return {
        ...acc,
        [externalLink]: {
          link: similarityLink,
          description: `Description ${similarityLink.rawLink}`,
        },
      };
    }, {});
    const linkSimilarities = Object.values(linkSimilaritiesMap);
    return Promise.resolve(linkSimilarities);
  }

  loadDB();

  return {
    getExternalLink,
    getSimilarities,
  };
}

export default CSVDB;
