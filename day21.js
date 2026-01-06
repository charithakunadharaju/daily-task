/*Ways to Fill Slots with Single or Double Coverage
Given n slots numbered 0 to n-1, return the number of ways to fill all slots where each operation covers either 1 slot or 2 adjacent slots.

Examples
Example 1

Input:

n = 3
Output:

3
Explanation:

We want the number of ways to install panels in 3 slots with operations of size 1 or 2. Let dp[i] be the number of ways to fill i slots.
Base cases: dp[0] = 1 (do nothing), dp[1] = 1 (only one 1-panel install).
For each i ≥ 2: dp[i] = dp[i-1] + dp[i-2].
dp[2] = dp[1] + dp[0] = 1 + 1 = 2 (sequences: [1,1], [2])
dp[3] = dp[2] + dp[1] = 2 + 1 = 3 (sequences: [1,1,1], [1,2], [2,1])
Therefore, the answer for n=3 is "3".
Example 2

Input:

n = 5
Output:

8
Explanation: Compute dp up to 5:

dp[0]=1, dp[1]=1
dp[2]=dp[1]+dp[0]=1+1=2 ( [1,1], [2] )
dp[3]=dp[2]+dp[1]=2+1=3 ( [1,1,1], [1,2], [2,1] )
dp[4]=dp[3]+dp[2]=3+2=5 ( [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2] )
dp[5]=dp[4]+dp[3]=5+3=8 (eight distinct sequences)
Hence for n=5 the function returns "8".
Input Format

The input consists of a single integer n on one line.

Constraints

0 <= n <= 1000
Output Format

Output a single line containing the number of distinct installation sequences for a rack of size n, represented as a decimal string.

Sample Input 0

2
Sample Output 0

2
Sample Input 1

3
Sample Output 1

3*/

function countInstallationSequences(n) {
    // Write your code here
 if (n === 0) return '1';
    if (n === 1) return '1';

    let prev2 = 1n;
    let prev1 = 1n; 

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1.toString();
}