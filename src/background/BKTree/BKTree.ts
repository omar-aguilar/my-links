import BKTreeNode from './Node';

type DistanceFunction = (str1: string, str2: string) => number;

const levenshteinDistance: DistanceFunction = (str1 = '', str2 = '') => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

class BKTree {
  root: BKTreeNode | undefined;

  distanceFunction: DistanceFunction;

  constructor(distanceFunction?: DistanceFunction) {
    this.distanceFunction = distanceFunction || levenshteinDistance;
  }

  append(word: string) {
    const newNode = new BKTreeNode(word);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (current) {
      const distance = this.distanceFunction(word, current.word);
      const childNode = current.children[distance];
      if (!childNode) {
        current.children[distance] = newNode;
      }
      current = childNode;
    }
  }

  searchRecursive(
    word: string,
    current: BKTreeNode,
    tolerance = 2,
    words: string[] = []
  ): string[] {
    const distance = this.distanceFunction(word, current.word);
    if (distance <= tolerance) {
      words.push(current.word);
    }
    const lowRange = Math.min(1, distance - tolerance);
    const highRange = distance + tolerance;
    current.children.forEach((node, childDistance) => {
      const nodeInRange = childDistance >= lowRange && childDistance <= highRange;
      if (!nodeInRange) {
        return;
      }
      this.searchRecursive(word, node, tolerance, words);
    });
    return words;
  }

  search(word: string, tolerance = 2): string[] {
    if (this.root === undefined) {
      return [];
    }
    const words = this.searchRecursive(word, this.root, tolerance);
    return words;
  }

  print(node = this.root, tab = '  ') {
    if (!node) {
      return;
    }
    if (node === this.root) {
      // eslint-disable-next-line no-console
      console.log('root', this.root?.word);
    }
    node.children.forEach((childNode, distance) => {
      // eslint-disable-next-line no-console
      console.log(`${tab}${childNode.word} (${distance})`);
      this.print(childNode, `${tab}  `);
    });
  }
}

export default BKTree;
