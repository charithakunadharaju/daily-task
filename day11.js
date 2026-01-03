/*Count Number Pairs
Given a sorted array of positive integers and a target value, count the number of pairs (i, j) where i < j and array[i] + array[j] <= target.

Example

Input:

prices = [1, 2, 3, 4, 5]
budget = 7
Output:

8
Explanation:

We need pairs (i, j) with i < j and prices[i] + prices[j] ≤ 7. List all pairs:

(1, 2) = 3 ≤ 7
(1, 3) = 4 ≤ 7
(1, 4) = 5 ≤ 7
(1, 5) = 6 ≤ 7
(2, 3) = 5 ≤ 7
(2, 4) = 6 ≤ 7
(2, 5) = 7 ≤ 7
(3, 4) = 7 ≤ 7
Pairs like (3,5)=8, (4,5)=9 exceed the budget. Total valid pairs = 8.

Input Format

The input is provided in two lines:

The first line contains two space-separated integers n and budget, where:

0 ≤ n ≤ 1000
1 ≤ budget ≤ 10^9
The second line contains n space-separated integers prices[0], prices[1], ..., prices[n-1], where:

1 ≤ prices[i] ≤ 10^9 for all 0 ≤ i < n
prices is sorted in non-decreasing order
Constraints

0 ≤ prices.length ≤ 1000
1 ≤ prices[i] ≤ 10^9 for all 0 ≤ i < prices.length
prices is sorted in non-decreasing order
1 ≤ budget ≤ 10^9
All inputs are integers
Output Format

Output a single integer representing the total count of unique index pairs (i, j) with 0 ≤ i < j < n such that prices[i] + prices[j] ≤ budget. If n < 2, output 0.

Sample Input 0

0
100
Sample Output 0

0
Sample Input 1

1
5
5
Sample Output 1

0*/

function countAffordablePairs(prices, budget) {
    // Write your code here
    let n = prices.length;
    if (n < 2) return 0;

    let left = 0;
    let right = n - 1;
    let count = 0;

    while (left < right) {
        if (prices[left] + prices[right] <= budget) {
            // All pairs (left, left+1 ... right) are valid
            count += (right - left);
            left++;
        } else {
            // Sum too large, decrease right
            right--;
        }
    }

    return count;

}