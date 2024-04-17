export default class TrieNode {
    letter: string;
    childNodes: { [letter: string]: TrieNode };
    word: string;
    isEndNode: boolean;

    constructor(data: string) {
        this.letter = data;
        this.childNodes = {};
        this.word = "";
        this.isEndNode = false;
    }

    addLetters(letters: string[], word: string) {
        if (letters.length < 1) {
            return;
        }

        const firstLetter = letters[0];
        let childNode;
        if (firstLetter in this.childNodes) {
            childNode = this.childNodes[firstLetter];
        } else {
            childNode = new TrieNode(firstLetter);
            this.childNodes[firstLetter] = childNode;
        }

        if (letters.length > 1) {
            childNode.addLetters(letters.slice(1), word);
        } else {
            childNode.word = word;
            childNode.setAsEndNode();
        }
    }

    getChildWords(prefix: string[], acc: string[]) {
        const childNodeKeys = Object.keys(this.childNodes);

        for (let i = 0; i < childNodeKeys.length; i++) {
            const childNode = this.childNodes[childNodeKeys[i]];
            if (childNode.isEndNode && prefix.length <= 1) {
                if (prefix.length === 1 && prefix[0] === childNode.letter) {
                    acc.push(childNode.word);
                } else if (prefix.length === 0) {
                    acc.push(childNode.word);
                }
            }
            if (prefix.length < 1 || prefix[0] === childNode.letter) {
                childNode.getChildWords(prefix.slice(1), acc);
            }
        }
        return acc;
    }

    getLetter() {
        return this.letter;
    }

    getChildNodeCount(): number {
        return Object.keys(this.childNodes).length;
    }

    setAsEndNode() {
        this.isEndNode = true;
    }
}