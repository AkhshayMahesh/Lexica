#include <bits/stdc++.h>
using namespace std;

struct TrieNode {
	TrieNode* Trie[256];
	bool isEnd;
	TrieNode()
	{

		for (int i = 0; i < 256; i++) {

			Trie[i] = NULL;
		}
		isEnd = false;
	}
};

void InsertTrie(TrieNode* root, string s)
{

	TrieNode* temp = root;
	for (int i = 0; i < s.length(); i++) {

		if (temp->Trie[s[i]] == NULL) {
			temp->Trie[s[i]] = new TrieNode();
		}
		temp = temp->Trie[s[i]];
	}
	temp->isEnd = true;
}

void printSuggestions(TrieNode* root, string res)
{
	if (root->isEnd == true) {

		cout << res << " ";
	}

	for (int i = 0; i < 256; i++) {
		if (root->Trie[i] != NULL) {
			res.push_back(i);
			printSuggestions(root->Trie[i], res);
			res.pop_back();
		}
	}
}

bool checkPresent(TrieNode* root, string key)
{
	for (int i = 0; i < key.length(); i++) {

		if (root->Trie[key[i]] == NULL) {
			printSuggestions(root, key.substr(0, i));
			return false;
		}

		root = root->Trie[key[i]];
	}
	if (root->isEnd == true) {
		return true;
	}
	printSuggestions(root, key);

	return false;
}

int main()
{

	vector<string> str = { "gee", "geeks", "ape", "apple", "geeksforgeeks", "goke", "game", "gonk" };

	string key = "go";

	TrieNode* root = new TrieNode();

	for (int i = 0; i < str.size(); i++) {
		InsertTrie(root, str[i]);
	}

	if (checkPresent(root, key)) {
		cout << "YES";
	}
	return 0;
}
