import Papa from 'papaparse';
import Link from '../../../LinkManager/Link';
import CSVDB from '../../../DB/CSVDB';

const mockDB = [
  {
    Link: 'http://some-link-1',
    Slugs: 'link1,link-1',
  },
  {
    Link: 'http://some-link-2',
    Slugs: 'link2, link-2',
  },
  {
    Link: 'http://random-link',
    Slugs: 'random',
  },
];
const csvMock = Papa.unparse(mockDB);

describe('CSV DB', () => {
  const dbHandler = CSVDB(csvMock);
  describe('getExternalLink', () => {
    it('gets valid external link correctly', () => {
      const mockLink = new Link('o/link1');
      return dbHandler.getExternalLink(mockLink).then((externalLink) => {
        expect(externalLink).toBe(mockDB[0].Link);
      });
    });

    it('gets empty external link when not in DB', () => {
      const mockLink = new Link('o/linkX');
      return dbHandler.getExternalLink(mockLink).then((externalLink) => {
        expect(externalLink).toBe('');
      });
    });
  });

  describe('getSimilarities', () => {
    it('gets list of similarities and last slug is used', () => {
      const mockLink = new Link('o/link');
      const expectedRawLinks = ['o/link-1', 'o/link-2'];
      return dbHandler.getSimilarities(mockLink).then((similarities) => {
        const actualRawLinks = similarities.map((similarity) => similarity.link.rawLink);
        expect(actualRawLinks).toEqual(expectedRawLinks);
      });
    });
    it('gets empty list of similarities if not found in DB', () => {
      const mockLink = new Link('o/no-db-match');
      const expectedRawLinks: string[] = [];
      return dbHandler.getSimilarities(mockLink).then((similarities) => {
        expect(similarities).toEqual(expectedRawLinks);
      });
    });
  });
});
