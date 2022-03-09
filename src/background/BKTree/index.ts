import BKTree from './BKTree';

function generateSpellCheckTree(dictionary: URLMap): BKTree {
  const slugs = Object.keys(dictionary);
  const cleanSlugs = slugs.map((slug) => slug.replace(/[-_]/g, ''));
  const tree = new BKTree();
  cleanSlugs.forEach((slug) => {
    tree.append(slug);
  });
  return tree;
}

export default generateSpellCheckTree;
