/*Remove Elements Within K Distance
Given a non-decreasing array of integers and an integer K, remove in-place any element that is within K of the previous kept element and return the new length. Use constant extra space and single pass with two pointers.

Example

Input:

timestamps = [1, 2, 3, 8, 10]
K = 3
Output:

2
Explanation:

We start by keeping the first timestamp 1.
Next, 2 − 1 = 1 < 3, so 2 is removed.
Next, 3 − 1 = 2 < 3, so 3 is removed.
Next, 8 − 1 = 7 ≥ 3, so we keep 8.
Finally, 10 − 8 = 2 < 3, so 10 is removed.
The remaining timestamps are [1, 8], so the new length is 2.
Input Format

First line contains two space-separated integers N and K, where 0 ≤ N ≤ 1000 and 0 ≤ K ≤ 10^9.
Second line contains N space-separated integers timestamps[0..N-1], each satisfying 0 ≤ timestamps[i] ≤ 10^9 and the sequence is non-decreasing (timestamps[i] ≤ timestamps[i+1] for 0 ≤ i < N-1).
Constraints

0 <= timestamps.length <= 1000
0 <= timestamps[i] <= 10^9 for all 0 <= i < timestamps.length
timestamps[i] <= timestamps[i+1] for all 0 <= i < timestamps.length - 1
0 <= K <= 10^9
Output Format

A single integer L, representing the new length of the timestamps array after retaining only those timestamps that are at least K seconds apart from the previous kept timestamp.

Sample Input 0

0
10
Sample Output 0

0
Sample Input 1

1
5
0
Sample Output 1

1*/


function debounceTimestamps(timestamps, K) {
    // Write your code here
    const n = timestamps.length;
    if (n === 0) {
        return 0;
    }
    let write = 0;

    for (let read = 1; read < n; read++) {
        if (timestamps[read] - timestamps[write] >= K) {
            write++;
            timestamps[write] = timestamps[read];
        }
    }
    return write + 1;

}