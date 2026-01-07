/*Height of Binary Search Tree
Given the root of a binary search tree, return the height of the tree. Height is the number of nodes along the longest path from root to leaf.

Example

Input

n = 7
values = [4, 2, 6, 1, 3, 5, 7]
leftChild = [1, 3, 5, -1, -1, -1, -1]
rightChild = [2, 4, 6, -1, -1, -1, -1]
Output

3
Explanation

The tree is perfectly balanced with three levels: 
- Level 1: Node 4 (root)
- Level 2: Nodes 2 and 6 
- Level 3: Leaves 1, 3, 5, 7 The longest path from root to any leaf has 3 nodes, so the height is 3.
Input Format

The first line contains n: integer denoting number of nodes in the binary search tree.
The next n lines contains individual elements of the array. values[i] is the integer value stored in the iᵗʰ node.
The next line contains an integer m denoting length of leftChild.
The next m lines contains the elements of leftChild. leftChild[i] is the index of the left child of node i, or -1 if none.
The next line contains an integer p denoting length of rightChild.
The next p lines contains the elements of rightChild. rightChild[i] is the index of the right child of node i, or -1 if none.
Constraints

0 <= n <= 1000
values.length == n
leftChild.length == n
rightChild.length == n
For all 0 <= i < n: -10^9 <= values[i] <= 10^9
All values[i] are unique
For all 0 <= i < n: leftChild[i] == -1 or (0 <= leftChild[i] < n)
For all 0 <= i < n: rightChild[i] == -1 or (0 <= rightChild[i] < n)
For all 0 <= i < n: if leftChild[i] != -1 then values[leftChild[i]] < values[i]
For all 0 <= i < n: if rightChild[i] != -1 then values[rightChild[i]] > values[i]
The set of edges defined by (i, leftChild[i]) and (i, rightChild[i]) forms a single connected acyclic graph (a tree)
Output Format

Return a single integer representing the height of the tree: the number of nodes along the longest path from the root to any leaf. If n = 0, return 0.
Sample Input 0

1
10
1
-1
1
-1
Sample Output 0

1
Sample Input 1

2
5
3
2
1
-1
2
-1
-1
Sample Output 1

2*/


function getBinarySearchTreeHeight(values, leftChild, rightChild) {
    // Write your code here
const n = values.length;
    
    if (n === 0) return 0;

    const isChild = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (leftChild[i] !== -1) isChild[leftChild[i]] = true;
        if (rightChild[i] !== -1) isChild[rightChild[i]] = true;
    }

    let root = -1;
    for (let i = 0; i < n; i++) {
        if (!isChild[i]) {
            root = i;
            break;
        }
    }

    function dfs(node) {
        if (node === -1) return 0;

        const leftHeight = dfs(leftChild[node]);
        const rightHeight = dfs(rightChild[node]);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    return dfs(root);
}