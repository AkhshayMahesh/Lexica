import TrieNode from './trieNode';

export default class Trie {
    rootNode: TrieNode;

    constructor(words: string[]) {
        this.rootNode = new TrieNode("");
        this.addWords(words);
    }

    addWord(word: string): void {
        word = word.toLowerCase();

        const letters = word.split('');
        this.rootNode.addLetters(letters, word);
    }

    addWords(words: string[]): void {
        for (let i = 0; i < words.length; i++) {
            this.addWord(words[i]);
        }
    }

    search(prefix: string): string[] {
        prefix = prefix.toLowerCase();

        const words: string[] = [];
        const letters = prefix.split('');
        this.rootNode.getChildWords(letters, words);
        return words;
    }

    find(word: string): boolean {
        word = word.toLowerCase();
        const letters = word.split('');
        return this.searchWord(this.rootNode, letters);
    }
    
    private searchWord(node: TrieNode, letters: string[]): boolean {
        if (letters.length === 0) {
            return node.isEndNode;
        }
    
        const firstLetter = letters[0];
        if (firstLetter in node.childNodes) {
            const childNode = node.childNodes[firstLetter];
            return this.searchWord(childNode, letters.slice(1));
        }
    
        return false;
    }

    longestCommonPrefix(): string {
        return this.traverse(this.rootNode, "");
    }

    private traverse(node: TrieNode, acc: string): string {
        let word = "";
        if (node.letter) {
            word = acc.concat(node.letter);
        }

        if (node.getChildNodeCount() != 1 || node.isEndNode) {
            return word
        }
        let childNode = node.childNodes[Object.keys(node.childNodes)[0]];
        return this.traverse(childNode, word);
    }
};