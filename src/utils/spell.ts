// import Trie from "./trie";

class SpellChecker {
    // private vocabs: Trie;
    private vocabs: Set<string>;

    constructor(corpus: string[]) {
        // this.vocabs = new Trie(corpus);
        this.vocabs = new Set<string>(corpus);
    }

    private levelOneEdits(word: string): string[] {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const splits = [...Array(word.length + 1).keys()].map(i => [word.slice(0, i), word.slice(i)]);
        const deletes = splits.map(([l, r]) => l + r.slice(1));
        const swaps = splits.map(([l, r]) => r.length > 1 ? l + r[1] + r[0] + r.slice(2) : '');
        const replaces = splits.flatMap(([l, r]) => r ? letters.split('').map(c => l + c + r.slice(1)) : []);
        const inserts = splits.flatMap(([l, r]) => letters.split('').map(c => l + c + r));

        return [...deletes, ...swaps, ...replaces, ...inserts];
    }

    private levelTwoEdits(word: string): Set<string> {
        return new Set<string>([...this.levelOneEdits(word)].flatMap(edit => [...this.levelOneEdits(edit)]));
    }

    check(word: string): string[] {
        const candidates = this.levelOneEdits(word);
        const validCandidates = Array.from(candidates).filter(w => this.vocabs.has(w));
        if (validCandidates.length < 5) {
            const validCandidates2 = Array.from(this.levelTwoEdits(word)).filter(w => this.vocabs.has(w));
            validCandidates.push(...validCandidates2);
        }
        if (validCandidates.length < 5 && this.vocabs.has(word)) {
            validCandidates.push(word);
        }

        return validCandidates;
    }
}

export default SpellChecker;