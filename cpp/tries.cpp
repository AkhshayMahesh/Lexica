#include <bits/stdc++.h>
using namespace std;

#define ALPHABET_SIZE (26)

#define CHAR_TO_INDEX(c) ((int)c - (int)'a')

struct TrieNode {
	struct TrieNode* children[ALPHABET_SIZE];
	bool isWordEnd;
};

struct TrieNode* getNode(void) {
	struct TrieNode* pNode = new TrieNode;
	pNode->isWordEnd = false;

	for (int i = 0; i < ALPHABET_SIZE; i++)
		pNode->children[i] = NULL;

	return pNode;
}

void insert(struct TrieNode* root, const string key) {
	struct TrieNode* pCrawl = root;

	for (int level = 0; level < key.length(); level++) {
		int index = CHAR_TO_INDEX(key[level]);
		if (!pCrawl->children[index])
			pCrawl->children[index] = getNode();

		pCrawl = pCrawl->children[index];
	}

	pCrawl->isWordEnd = true;
}

bool isLastNode(struct TrieNode* root) {
	for (int i = 0; i < ALPHABET_SIZE; i++)
		if (root->children[i])
			return 0;
	return 1;
}

void suggestionsRec(struct TrieNode* root,
					string currPrefix) {
	if (root->isWordEnd)
		cout << currPrefix << endl;

	for (int i = 0; i < ALPHABET_SIZE; i++)
		if (root->children[i]) {
			char child = 'a' + i;
			suggestionsRec(root->children[i],
						currPrefix + child);
		}
}

int printAutoSuggestions(TrieNode* root, const string query) {
	struct TrieNode* pCrawl = root;
	for (char c : query) {
		int ind = CHAR_TO_INDEX(c);
		if (!pCrawl->children[ind])
			return 0;

		pCrawl = pCrawl->children[ind];
	}
	if (isLastNode(pCrawl)) {
		cout << query << endl;
		return -1;
	}
	suggestionsRec(pCrawl, query);
	return 1;
}

bool search(struct TrieNode* root, const string key) {
    struct TrieNode* pCrawl = root;

    for (char c : key) {
        int index = CHAR_TO_INDEX(c);
        if (!pCrawl->children[index])
            return false;

        pCrawl = pCrawl->children[index];
    }

    return (pCrawl != NULL && pCrawl->isWordEnd);
}

size_t getNodeSize() {
    return sizeof(struct TrieNode) + ALPHABET_SIZE * sizeof(struct TrieNode*);
}

size_t getTrieMemoryUsage(struct TrieNode* root) {
    if (!root)
        return 0;

    size_t totalMemory = 0;
    queue<struct TrieNode*> q;
    q.push(root);

    while (!q.empty()) {
        struct TrieNode* curr = q.front();
        q.pop();
        if (curr) {
            totalMemory += getNodeSize();
            for (int i = 0; i < ALPHABET_SIZE; i++) {
                if (curr->children[i])
                    q.push(curr->children[i]);
            }
        }
    }

    return totalMemory;
}

int main() {
    struct TrieNode* root = getNode();
    insert(root, "bug");
    insert(root, "up");
    insert(root, "cat");
    insert(root, "cats");
    insert(root, "catch");

    auto start = chrono::high_resolution_clock::now();
    printAutoSuggestions(root, "cat");
    auto end = chrono::high_resolution_clock::now();

    auto diff = chrono::duration_cast<chrono::microseconds>(end - start);
    cout << "Time taken: " << diff.count() << " microseconds" << endl;

    size_t memoryUsage = getTrieMemoryUsage(root);
    cout << "Memory occupied by the Trie: " << memoryUsage << " bytes" << endl;

    return 0;
}
