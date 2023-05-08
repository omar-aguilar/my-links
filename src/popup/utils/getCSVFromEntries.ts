const getCSVFromEntries = (shortLinkEntry: ShortLinkEntry[]): string => {
  const header = 'Link,Slugs,Description,Tags';
  const csvLines = shortLinkEntry.map((entry) => {
    const { shortLink, description, link, tags } = entry;
    const tagsString = tags.join(',');
    return `${link},${shortLink},${description},${tagsString}`;
  });
  return [header].concat(csvLines).join('\n');
};

export default getCSVFromEntries;
