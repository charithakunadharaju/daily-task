/*Subarrays with Given Sum and Bounded Maximum
Given an integer array nums and integers k and M, count the number of contiguous subarrays whose sum equals k and whose maximum element is at most M.

Example

Input

nums = [2, -1, 2, 1, -2, 3]
k = 3
M = 2
Output

2
Explanation

We need subarrays with sum = 3 and all elements ≤ 2. 
Also, any subarray containing 3 is invalid because 3 > M. Check all starts:

- From index 0: [2, -1, 2] → sum = 3, max = 2 → valid (count = 1).
- From index 2: [2, 1] → sum = 3, max = 2 → valid (count = 2). No other subarray qualifies. Thus the total count is 2.
Input Format

The first line contains an integer n denoting the number of elements in nums.
The next n lines contains an integer denoting elements in nums followed by the value of k & M.
Example

6 → number of elements in nums
2 → elements of nums
-1
2
1
-2
3
3 → value of k
2 → value of M
Constraints

0 <= nums.length <= 1000000
-10^9 <= nums[i] <= 10^9 for all 0 <= i < nums.length
-10^15 <= k <= 10^15
-10^9 <= M <= 10^9
Output Format

Returns a non-negative integer denoting the count of all contiguous subarrays of nums.
Sample Input 0

0
0
0
Sample Output 0

0
Sample Input 1

1
5
5
5
Sample Output 1

1*/

function countSubarraysWithSumAndMaxAtMost(nums, k, M) {
    let count = 0n;
    let prefixSum = 0n;
    const freq = new Map();
    freq.set(0n, 1n);

    for (let i = 0; i < nums.length; i++) {
        const val = BigInt(nums[i]);

        // Break segment if max > M
        if (val > M) {
            prefixSum = 0n;
            freq.clear();
            freq.set(0n, 1n);
            continue;
        }

        prefixSum += val;
        const needed = prefixSum - k;

        if (freq.has(needed)) {
            count += freq.get(needed);
        }

        freq.set(prefixSum, (freq.get(prefixSum) || 0n) + 1n);
    }

    return count;
}

function main() {
    const n = Number(read());

    let nums = [];
    for (let i = 0; i < n; i++) {
        nums.push(Number(read()));
    }

    const k = BigInt(read());
    const M = BigInt(read());

    const result = countSubarraysWithSumAndMaxAtMost(nums, k, M);
    console.log(result.toString());

}