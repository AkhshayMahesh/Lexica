#include <bits/stdc++.h>
#include <string>
using namespace std;

struct Node
{
	char data;
	int end;
	struct Node *left;
	struct Node *eq;
	struct Node *right;
};

Node *createNode(char newData)
{
	struct Node *newNode = new Node();
	newNode->data = newData;
	newNode->end = 0;
	newNode->left = NULL;
	newNode->eq = NULL;
	newNode->right = NULL;
	return newNode;
}

void insert(Node **root, string word, int pos = 0)
{

	if (!(*root))
		*root = createNode(word[pos]);

	if ((*root)->data > word[pos])
		insert(&((*root)->left), word, pos);

	else if ((*root)->data < word[pos])
		insert(&((*root)->right), word, pos);

	else
	{

		if (pos + 1 == word.size())
			(*root)->end = 1;

		else
			insert(&((*root)->eq), word, pos + 1);
	}
}

void traverse(Node *root, vector<string> &ret, char *buff, int depth = 0)
{
	if (!root)
		return;

	traverse(root->left, ret, buff, depth);

	buff[depth] = root->data;

	// If the end of the string
	// is detected, store it in
	// the final ans
	if (root->end)
	{
		buff[depth + 1] = '\0';
		ret.push_back(string(buff));
	}

	traverse(root->eq, ret,
			 buff, depth + 1);

	traverse(root->right, ret,
			 buff, depth);
}

vector<string> util(Node *root, string pattern)
{
	char buffer[1001];
	vector<string> ret;

	traverse(root, ret, buffer);

	if (root->end == 1)
		ret.push_back(pattern);

	return ret;
}

vector<string> autocomplete(Node *root, string pattern)
{
	vector<string> words;
	int pos = 0;

	if (pattern.empty())
		return words;

	while (root && pos < pattern.length())
	{

		if (root->data > pattern[pos])
			root = root->left;

		else if (root->data < pattern[pos])
			root = root->right;

		else if (root->data == pattern[pos])
		{
			root = root->eq;
			pos++;
		}

		else
			return words;
	}

	words = util(root, pattern);
	return words;
}

void print(vector<string> sugg,
		   string pat)
{
	for (int i = 0; i < sugg.size(); i++)
	{
		if (sugg[i] != pat)
			cout << pat << sugg[i] << "\n";
		else
			cout << pat << endl;
	}
}

size_t getNodeSize()
{
	return sizeof(struct Node);
}

size_t getTSTMemoryUsage(Node *root)
{
	if (!root)
		return 0;

	size_t totalMemory = 0;
	queue<Node *> q;
	q.push(root);

	while (!q.empty())
	{
		Node *curr = q.front();
		q.pop();
		if (curr)
		{
			totalMemory += getNodeSize();
			if (curr->left)
				q.push(curr->left);
			if (curr->eq)
				q.push(curr->eq);
			if (curr->right)
				q.push(curr->right);
		}
	}

	return totalMemory;
}

int main()
{
	vector<string> S = {"cat", "cats", "catch", "up", "bug"};

	Node *tree = NULL;

	for (const string &str : S)
		insert(&tree, str);

	string pat = "cat";

	auto start = chrono::steady_clock::now();
	vector<string> sugg = autocomplete(tree, pat);
	auto end = chrono::steady_clock::now();

	print(sugg, pat);

	auto diff = chrono::duration_cast<chrono::microseconds>(end - start);

	cout << "Time taken: " << chrono::duration<double, micro>(diff).count() << " microseconds" << endl;

	size_t memoryUsage = getTSTMemoryUsage(tree);
	cout << "Memory occupied by the Ternary Search Tree: " << memoryUsage << " bytes" << endl;

	return 0;
}
