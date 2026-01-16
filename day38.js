/*Minimum Plans to Reach Target Bandwidth
Given an array planSizes and integer targetBandwidth, return the minimum number of plans needed to sum exactly to targetBandwidth, or -1 if impossible.

Examples
Example 1

Input:

planSizes = [1, 2, 5]
targetBandwidth = 11
Output:

3
Explanation:

We need exactly 11 Mbps.
he optimal choice is two 5 Mbps plans and one 1 Mbps plan: 5 + 5 + 1 = 11, which uses 3 plans.
No combination uses fewer than 3 plans.
Example 2

Input:

planSizes = [1, 3, 4, 7]
targetBandwidth = 10
Output:

2
Explanation:

To reach 10 Mbps, selecting the 7 Mbps plan and the 3 Mbps plan sums exactly to 10. - - That uses 2 plans.
No single plan is 10 Mbps, and any other combination requires 3 or more plans.
Input Format

The first line contains a single integer, planSizes_count, which is the total number of available data plans.
The next planSizes_count lines each contain a single integer, representing the size of each available data plan.
The final line contains a single integer, targetBandwidth.
Example
Input:

5
100
500
200
1000
50
750
Explanation:

planSizes_count = 5
planSizes = [100, 500, 200, 1000, 50]
targetBandwidth = 750
Constraints

1 <= planSizes.length <= 1000
1 <= planSizes[i] <= 10000 for all 0 <= i < planSizes.length
0 <= targetBandwidth <= 100000
planSizes and targetBandwidth are integers
Output Format

Return a single integer: the minimum number of plans needed to reach exactly targetBandwidth. If no combination of plans sums to targetBandwidth, output -1.
Sample Input 0

1
5
5
Sample Output 0

1
Sample Input 1

3
1
2
5
11
Sample Output 1

3*/

function findMinimumPlansForBandwidth(planSizes, targetBandwidth) {
    // Write your code here
 const dp = new Array(targetBandwidth + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= targetBandwidth; i++) {
        for (const size of planSizes) {
            if (i - size >= 0) {
                dp[i] = Math.min(dp[i], dp[i - size] + 1);
            }
        }
    }

    return dp[targetBandwidth] === Infinity ? -1 : dp[targetBandwidth];
}