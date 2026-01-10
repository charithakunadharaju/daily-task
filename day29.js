/*Find Peak Element in Bitonic Array
Given a bitonic array (strictly increasing then strictly decreasing), find the index of the maximum element in O(log n) time.

Example

Input:

counts = [1, 3, 5, 4, 2]
Output:

2
Explanation:

We perform a binary search on counts:

low = 0, high = 4. mid = (0 + 4) // 2 = 2. counts[2] = 5, counts[3] = 4. Since 5 > 4, we are on the descending side, so we move high = mid = 2.
low = 0, high = 2. mid = (0 + 2) // 2 = 1. counts[1] = 3, counts[2] = 5. Since 3 < 5, we are on the ascending side, so we move low = mid + 1 = 2.
Now low = 2, high = 2, loop ends and we return 2, which is the index of the maximum element (5).
Input Format

The input consists of two lines:

A single integer n (3 ≤ n ≤ 100000), the length of the array counts.
n space-separated integers counts[0] through counts[n-1], each 0 ≤ counts[i] ≤ 1,000,000, all distinct and forming a strictly increasing sequence up to a single peak, then strictly decreasing.
Constraints

1 <= counts.length <= 100000
0 <= counts[i] <= 1000000 for all 0 <= i < counts.length
All counts[i] are distinct
There exists an index p (0 < p < counts.length - 1) such that:
for all 1 <= i <= p: counts[i] > counts[i - 1]
for all p + 1 <= i < counts.length: counts[i] < counts[i - 1]
Output Format

Output a single integer: the 0-based index of the maximum element in the provided bitonic array.

Sample Input 0

3
1
3
2
Sample Output 0

1
Sample Input 1

5
1
2
3
2
1
Sample Output 1

2*/

function findPeakIndex(counts) {
    // Write your code here
let low = 0;
    let high = counts.length - 1;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);

        if (counts[mid] < counts[mid + 1]) {
            low = mid + 1;
        } else {
            
            high = mid;
        }
    }

    return low; 
}