class BKTreeNode {
  word: string;

  children: BKTreeNode[];

  constructor(word: string) {
    this.word = word;
    this.children = [];
  }
}

export default BKTreeNode;
