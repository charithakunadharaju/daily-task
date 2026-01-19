/*Median of Two Circularly Sorted Logs
Given two rotated sorted arrays, find the median of the merged data in O(log(min(n,m))) time and O(1) extra space.

Example

Input:

A = [4, 5, 1, 2, 3]
B = [8, 9, 6, 7]
Output:

5
Explanation:

First, note that A is a rotation of [1,2,3,4,5] and B is a rotation of [6,7,8,9]. If we merge all timestamps and sort them we get [1,2,3,4,5,6,7,8,9]. There are 9 elements (odd), so the median is at index 4 (0-based), which is 5.

Input Format

The first line contains two non-negative integers n and m (0 <= n, m <= 10^6, n + m >= 1), separated by a space, representing the lengths of arrays A and B respectively.
The second line contains n space-separated integers A[i] (0 <= A[i] < 86400000), describing the first circularly sorted (rotated) array of event timestamps.
The third line contains m space-separated integers B[j] (0 <= B[j] < 86400000), describing the second circularly sorted (rotated) array of event timestamps.
Each array is individually sorted in ascending order and then rotated at an unknown pivot. Duplicates are allowed within and across A and B.

Constraints

0 <= A.length, B.length <= 1000000
A.length + B.length >= 1
0 <= A[i] < 86400000 for all 0 <= i < A.length
0 <= B[j] < 86400000 for all 0 <= j < B.length
Each array is sorted in ascending order and then rotated at an unknown pivot
Duplicates are allowed within and across A and B
Output Format

Output a single integer: the median timestamp in milliseconds. Let N = n + m and let M be the sorted merged sequence of all timestamps from A and B. Return M[(N - 1) / 2] (0-based index), which yields the lower median when N is even and the exact middle element when N is odd.

Sample Input 0

0
1
5
Sample Output 0

5
Sample Input 1

1
10
0
Sample Output 1

10*/

function findMedianInRotatedSortedArrays(A, B) {
    // Write your code here
    const n = A.length;
    const m = B.length;

    if (n === 0) return B[Math.floor((m - 1) / 2)];
    if (m === 0) return A[Math.floor((n - 1) / 2)];

    
    function findRotation(arr) {
        let l = 0, r = arr.length - 1;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] > arr[r]) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    const rotA = findRotation(A);
    const rotB = findRotation(B);
    function get(arr, rot, idx) {
        return arr[(rot + idx) % arr.length];
    }

    const total = n + m;
    const k = Math.floor((total - 1) / 2);

    if (n > m) {
        return findMedianInRotatedSortedArrays(B, A);
    }

    let left = Math.max(0, k - m);
    let right = Math.min(k, n);

    while (left <= right) {
        const cutA = Math.floor((left + right) / 2);
        const cutB = k - cutA;

        const lA = cutA === 0 ? -Infinity : get(A, rotA, cutA - 1);
        const lB = cutB === 0 ? -Infinity : get(B, rotB, cutB - 1);
        const rA = cutA === n ? Infinity : get(A, rotA, cutA);
        const rB = cutB === m ? Infinity : get(B, rotB, cutB);

        if (lA <= rB && lB <= rA) {
            return Math.max(lA, lB);
        } else if (lA > rB) {
            right = cutA - 1;
        } else {
            left = cutA + 1;
        }
    }

    return -1; 

}