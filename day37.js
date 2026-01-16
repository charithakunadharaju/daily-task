/*Find Index Combinations with Target Weight Sum
Given an array of positive integers weights and a target capacity, return all unique combinations of indices whose corresponding weights sum to the capacity.

Each weight can be reused multiple times. Return combinations as lists of indices in non-decreasing order.

Examples
Example 1

Input:

weights = [2, 3, 6, 7]
capacity = 7
Output:

[[0, 0, 1], [3]]
Explanation:

We need combinations of indices whose weights sum to 7.
Index 3 has weight 7, so [3] is one combination.
Using weight at index 0 (2) twice and index 1 (3) once gives 2+2+3=7, so [0,0,1].
No other combinations of these weights sum to 7.
The result lists each combination in non-decreasing index order without duplicates.
Example 2

Input:

weights = [2, 3, 5]
capacity = 8
Output:

[[0, 0, 0, 0], [0, 1, 1], [1, 2]]
Explanation:

We need combinations summing to 8.
Four times index 0: 2+2+2+2=8 → [0,0,0,0].
One 2 (index 0) and two 3s (index 1): 2+3+3=8 → [0,1,1].
One 3 (index 1) and one 5 (index 2): 3+5=8 → [1,2].
These are all unique and listed with non-decreasing indices.
Input Format

The first line contains a single integer, weights_count, representing the number of weights.
The next weights_count lines each contain a single integer, representing an individual weight. If weights_count is 0, these lines aren't included.
The final line contains a single integer, capacity.
6
8
4
5
3
9
6
15
Explanation:

weights_count = 6
weights = [8, 4, 5, 3, 9, 6]
capacity = 15
Constraints

1 <= weights.length <= 30
1 <= weights[i] <= 1000 for all 0 <= i < weights.length
0 <= capacity <= 1000
weights and capacity are integers
Output Format

Return a list of lists of integers, where each inner list is a combination of indices in non-decreasing order whose corresponding weights sum exactly to capacity.

Sample Input 0

2
3
5
8
Sample Output 0

0 1
Sample Input 1

3
2
3
5
8
Sample Output 1

0 0 0 0
0 1 1
1 2*/

function findCombinationsByWeightIndices(weights, capacity) {
    // Write your code here
const result = [];
    const path = [];

    function dfs(startIndex, remaining) {
        if (remaining === 0) {
            result.push([...path]);
            return;
        }

        if (remaining < 0) {
            return;
        }

        for (let i = startIndex; i < weights.length; i++) {
            path.push(i);
            dfs(i, remaining - weights[i]); 
            path.pop();
        }
    }

    dfs(0, capacity);
    return result;
}