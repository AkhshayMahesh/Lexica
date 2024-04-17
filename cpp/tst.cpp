// #include <bits/stdc++.h> 
// using namespace std; 
// #define MAX 50 

// struct Node { 
// 	char data; 
// 	unsigned isEndOfString = 1; 
// 	Node *left, *eq, *right; 
// }; 

// Node* newNode(char data) 
// { 
// 	Node* temp = new Node(); 
// 	temp->data = data; 
// 	temp->isEndOfString = 0; 
// 	temp->left = temp->eq = temp->right = NULL; 
// 	return temp; 
// } 

// void insert(Node** root, char* word) 
// { 
// 	if (!(*root)) 
// 		*root = newNode(*word); 

// 	if ((*word) < (*root)->data) 
// 		insert(&((*root)->left), word); 

// 	else if ((*word) > (*root)->data) 
// 		insert(&((*root)->right), word); 

// 	else { 
// 		if (*(word + 1)) 
// 			insert(&((*root)->eq), word + 1); 

// 		else
// 			(*root)->isEndOfString = 1; 
// 	} 
// } 

// void traverseTSTUtil(Node* root, char* buffer, int depth) 
// { 
// 	if (root) { 
// 		traverseTSTUtil(root->left, buffer, depth); 

// 		buffer[depth] = root->data; 
// 		if (root->isEndOfString) { 
// 			buffer[depth + 1] = '\0'; 
// 			cout << buffer << endl; 
// 		} 

// 		traverseTSTUtil(root->eq, buffer, depth + 1); 
// 		traverseTSTUtil(root->right, buffer, depth); 
// 	} 
// } 

// void traverseTST(struct Node* root) 
// { 
// 	char buffer[MAX]; 
// 	traverseTSTUtil(root, buffer, 0); 
// } 

// int searchTST(Node* root, char* word) 
// { 
// 	if (!root) 
// 		return 0; 

// 	if (*word < (root)->data) 
// 		return searchTST(root->left, word); 

// 	else if (*word > (root)->data) 
// 		return searchTST(root->right, word); 

// 	else { 
// 		if (*(word + 1) == '\0') 
// 			return root->isEndOfString; 

// 		return searchTST(root->eq, word + 1); 
// 	} 
// } 

// void suggestionsRecTST(Node* root, string prefix) {
//     if (root) {
//         // If the current node represents the end of a word, print it
//         if (root->isEndOfString)
//             cout << prefix << endl;

//         // Traverse the left subtree
//         suggestionsRecTST(root->left, prefix);

//         // Append the character to the prefix
//         string newPrefix = prefix + root->data;

//         // Traverse the middle subtree
//         suggestionsRecTST(root->eq, newPrefix);

//         // Traverse the right subtree
//         suggestionsRecTST(root->right, prefix);
//     }
// }

// void printAutoSuggestionsTST(Node* root, const string prefix) {
//     Node* pCrawl = root;
//     string buffer = "";
//     int level = 0;

//     // Traverse to the node representing the prefix
//     while (pCrawl) {
//         char currentChar = prefix[level];
//         if (currentChar < pCrawl->data)
//             pCrawl = pCrawl->left;
//         else if (currentChar > pCrawl->data)
//             pCrawl = pCrawl->right;
//         else {
//             buffer += currentChar;
//             level++;
//             // If the prefix is found, traverse the middle subtree
//             if (level == prefix.length()) {
//                 suggestionsRecTST(pCrawl->eq, buffer);
//             } else {
//                 pCrawl = pCrawl->eq;
//             }
//         }
//     }

//     // If the prefix is not found in the TST
//     if (!pCrawl)
//         cout << "No words found with the prefix " << prefix << endl;
// }



// int main() 
// { 
// 	Node* root = NULL; 
// 	char cat[] = "cat"; 
// 	char cats[] = "cats"; 
// 	char up[] = "up"; 
// 	char bug[] = "bug"; 
// 	char bu[] = "bu"; 
// 	insert(&root, cat); 
// 	insert(&root, cats); 
// 	insert(&root, up); 
// 	insert(&root, bug); 

// 	auto start = chrono::high_resolution_clock::now();
	
// 	// searchTST(root, cats) ? cout << "Found\n"
// 	// 					: cout << "Not Found\n";

//     printAutoSuggestionsTST(root,"cat");
						
// 	auto end = chrono::high_resolution_clock::now();
// 	auto duration = chrono::duration_cast<chrono::microseconds>(end - start);

// 	cout << "Time taken for searching 'cats': " << duration.count() << " microseconds" << endl;
// 	return 0; 
// } 


// C++ Program to generate
// autocompleted texts from
// a given prefix using a
// Ternary Search Tree
#include <bits/stdc++.h>
using namespace std;

// Define the Node of the
// tree
struct Node {

	// Store the character
	// of a string
	char data;
	// Store the end of
	// word
	int end;
	// Left Subtree
	struct Node* left;

	// Equal Subtree
	struct Node* eq;

	// Right Subtree
	struct Node* right;
};

// Function to create a Node
Node* createNode(char newData)
{
	struct Node* newNode = new Node();
	newNode->data = newData;
	newNode->end = 0;
	newNode->left = NULL;
	newNode->eq = NULL;
	newNode->right = NULL;
	return newNode;
}

// Function to insert a word
// in the tree
void insert(Node** root,
			string word,
			int pos = 0)
{

	// Base case
	if (!(*root))
		*root = createNode(word[pos]);

	// If the current character is
	// less than root's data, then
	// it is inserted in the
	// left subtree

	if ((*root)->data > word[pos])
		insert(&((*root)->left), word,
			pos);

	// If current character is
	// more than root's data, then
	// it is inserted in the right
	// subtree

	else if ((*root)->data < word[pos])
		insert(&((*root)->right), word,
			pos);

	// If current character is same
	// as that of the root's data

	else {
		// If it is the end of word

		if (pos + 1 == word.size())
			// Mark it as the
			// end of word
			(*root)->end = 1;

		// If it is not the end of
		// the string, then the
		// current character is
		// inserted in the equal subtree

		else
			insert(&((*root)->eq), word, pos + 1);
	}
}

// Function to traverse the ternary search tree
void traverse(Node* root,
			vector<string>& ret,
			char* buff,
			int depth = 0)
{
	// Base case
	if (!root)
		return;
	// The left subtree is
	// traversed first
	traverse(root->left, ret,
			buff, depth);

	// Store the current character
	buff[depth] = root->data;

	// If the end of the string
	// is detected, store it in
	// the final ans
	if (root->end) {
		buff[depth + 1] = '\0';
		ret.push_back(string(buff));
	}

	// Traverse the equal subtree
	traverse(root->eq, ret,
			buff, depth + 1);

	// Traverse the right subtree
	traverse(root->right, ret,
			buff, depth);
}

// Utility function to find
// all the words
vector<string> util(Node* root,
					string pattern)
{
	// Stores the words
	// to suggest
	char buffer[1001];

	vector<string> ret;

	traverse(root, ret, buffer);

	if (root->end == 1)
		ret.push_back(pattern);
		// cout<<pattern<<endl;
	return ret;
}

// Function to autocomplete
// based on the given prefix
// and return the suggestions
vector<string> autocomplete(Node* root,
							string pattern)
{
	vector<string> words;
	int pos = 0;

	// If pattern is empty
	// return an empty list
	if (pattern.empty())
		return words;

	// Iterating over the characters
	// of the pattern and find it's
	// corresponding node in the tree

	while (root && pos < pattern.length()) {

		// If current character is smaller
		if (root->data > pattern[pos])
			// Search the left subtree
			root = root->left;

		// current character is greater
		else if (root->data < pattern[pos])
			// Search right subtree
			root = root->right;

		// If current character is equal
		else if (root->data == pattern[pos]) {
		
			// Search equal subtree
			// since character is found, move to the next character in the pattern
			root = root->eq;
			pos++;
		}

		// If not found
		else
			return words;

	}

	// Search for all the words
	// from the current node
	words = util(root, pattern);

	return words;
}

// Function to print
// suggested words

void print(vector<string> sugg,
		string pat)
{
    for (int i = 0; i < sugg.size(); i++) {
        // Check if the suggested word is not equal to the prefix
        if (sugg[i] != pat)
            cout << pat << sugg[i] << "\n";
        else 
        cout<< pat <<endl;
    }
}
size_t getNodeSize() {
    return sizeof(struct Node);
}

size_t getTSTMemoryUsage(Node* root) {
    if (!root)
        return 0;

    size_t totalMemory = 0;
    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();
        if (curr) {
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
// Driver Code
int main() {
    vector<string> S = { "cat", "cats", "catch", "up", "bug" };

    Node* tree = nullptr;

    // Insert the words in the Ternary Search Tree
    for (const string& str : S)
        insert(&tree, str);

    string pat = "cat";

    auto start = chrono::steady_clock::now(); 
    vector<string> sugg = autocomplete(tree, pat);
    auto end = chrono::steady_clock::now(); 

	print(sugg, pat);

	auto diff = chrono::duration_cast<chrono::microseconds>(end - start);

    cout << "Time taken: " << chrono::duration <double, micro>(diff).count() << " microseconds" << endl;

    size_t memoryUsage = getTSTMemoryUsage(tree);
    cout << "Memory occupied by the Ternary Search Tree: " << memoryUsage << " bytes" << endl;

    return 0;
}

