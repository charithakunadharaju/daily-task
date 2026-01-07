/*Compare BSTs for Equal Values but Different Structure
Given two binary search trees root1 and root2, return true if they contain the same multiset of values but have different structures, otherwise return false.

Example

Input

root1 = [4, 2, 5, 1, 3, 100001, 100001]
root2 = [3, 1, 5, 100001, 2, 4, 100001]
Output

true
Explanation

- First, collect the values of each tree (ignoring the sentinel 100001 for nulls). 
- Tree1 has values [4, 2, 5, 1, 3], and Tree2 has [3, 1, 5, 2, 4]. 
- Sorting both gives [1,2,3,4,5] in each, so the multisets match. 
- Next, compare structures: Tree1's root is 4 with children 2 (which itself has children 1 and 3) and 5; Tree2's root is 3 with children 1 (right child 2) and 5 (left child 4). - The shapes differ, so the function returns true.
Input Format

The first line contains an integer n denoting length of root1.
The next n lines contains elements of root1.
The next line contains an integer m denoting length of roo2.
The next m lines contains elements of root2.
Example

7
4
2
5
1
3
100001
100001
7
3
1
5
100001
2
4
100001
Constraints

0 <= root1.length <= 1000
0 <= root2.length <= 1000
BST property holds: for every node, all values in its left subtree <= node.value <= all values in its right subtree
Trees may contain duplicate values
Output Format

Return a BOOLEAN value, 1 for True and 0 for False.
Sample Input 0

1
1
1
1
Sample Output 0

0
Sample Input 1

2
2
1
3
1
100001
2
Sample Output 1

1*/

function verifySameMultisetDifferentStructure(root1, root2) {
    // Write your code here
    var NULL = 100001;

    function extractValues(arr) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== NULL) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    var vals1 = extractValues(root1);
    var vals2 = extractValues(root2);

    if (vals1.length !== vals2.length) {
        return false;
    }

    vals1.sort(function(a, b) { return a - b; });
    vals2.sort(function(a, b) { return a - b; });

    for (var i = 0; i < vals1.length; i++) {
        if (vals1[i] !== vals2[i]) {
            return false;
        }
    }

    function buildStructure(arr, index) {
        if (index >= arr.length || arr[index] === NULL) {
            return "#";
        }
        var left = buildStructure(arr, 2 * index + 1);
        var right = buildStructure(arr, 2 * index + 2);
        return "X" + left + right;
    }

    var structure1 = buildStructure(root1, 0);
    var structure2 = buildStructure(root2, 0);

    return structure1 !== structure2;

}