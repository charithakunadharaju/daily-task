/*Longest Increasing Subsequence Length
Given an integer array quality, return the length of the longest strictly increasing subsequence.

Examples
Example 1

Input:

n = 8
quality = [10, 9, 2, 5, 3, 7, 101, 18]
Output:

4
Explanation:

The longest strictly increasing subsequence is [2, 5, 7, 101], which has length 4.
Step-by-step:
Start with 10: tails = [10]
9 replaces 10: tails = [9]
2 replaces 9: tails = [2]
5 extends [2]: tails = [2, 5]
3 replaces 5: tails = [2, 3]
7 extends [2, 3]: tails = [2, 3, 7]
101 extends [2, 3, 7]: tails = [2, 3, 7, 101]
18 replaces 101: tails = [2, 3, 7, 18]
The maximum length achieved is 4.
Example 2

Input:

n = 8
quality = [-2, -1, 0, 1, -3, 2, 2, 3]
Output:

6
Explanation:

One of the longest strictly increasing subsequences is [-2, -1, 0, 1, 2, 3], length 6.
Step-by-step:
-2: tails = [-2]
-1 extends: tails = [-2, -1]
0 extends: tails = [-2, -1, 0]
1 extends: tails = [-2, -1, 0, 1]
-3 replaces -2: tails = [-3, -1, 0, 1]
2 extends: tails = [-3, -1, 0, 1, 2]
2 does not extend (must be strictly increasing) but replaces itself: tails unchanged
3 extends: tails = [-3, -1, 0, 1, 2, 3]
The maximum length achieved is 6.
Input Format

The first line contains a single integer, n.
The second line contains a single integer, quality_count, representing the number of items in the quality list.
The next quality_count lines each contain a single integer, representing an element of the quality list.
8
8
10
9
2
5
3
7
101
18
Explanation:

n = 8
quality_count = 8
quality = [10, 9, 2, 5, 3, 7, 101, 18]
Constraints

0 <= n <= 100000
If n > 0 then quality.length == n
-10^9 <= quality[i] <= 10^9 for all 0 <= i < n
All quality values are integers
Time complexity must be O(n log n) or better to handle n up to 100000
Space complexity must be O(n) or better
Output Format

Return a single integer: the length of the longest strictly increasing subsequence in the given quality array.

Sample Input 0

1
1
5
Sample Output 0

1
Sample Input 1

5
5
1
2
3
4
5
Sample Output 1

5*/


function computeLongestIncreasingSubsequenceLength(n, quality) {
    // Write your code here
    if (n === 0) return 0;

    const tails = [];

    for (const num of quality) {
        let left = 0;
        let right = tails.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        tails[left] = num;
    }

    return tails.length;

}