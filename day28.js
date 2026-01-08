/*Pivoted Search
Given a sorted array of unique integers that has been rotated at an unknown pivot, find the index of a target value or return -1 if not found.

Example

Input:

nums = [1609466400, 1609470000, 1609473600, 1609459200, 1609462800]
target = 1609459200
Output:

3
Explanation:

We perform a binary search on the rotated array:

left=0, right=4, mid=(0+4)//2=2, nums[mid]=1609473600.
nums[left]=1609466400 <= nums[mid], so the left half [indices 0..2] is sorted. Target 1609459200 is not in [1609466400..1609473600], so search in right half: left=mid+1=3.
Now left=3, right=4, mid=(3+4)//2=3, nums[mid]=1609459200, which equals the target. Return index 3.
Input Format

The input is given in three lines.

Line 1: an integer n (0 ≤ n ≤ 100000), the number of timestamps.

Line 2: n space-separated long integers nums[i] (0 ≤ nums[i] ≤ 10^18), representing a rotated version of a strictly increasing array of unique Unix timestamps.

Line 3: a single long integer target (0 ≤ target ≤ 10^18), the timestamp to search for. The sequence in nums is guaranteed to be the result of rotating an originally strictly increasing sorted array at an unknown pivot.

Constraints

0 <= nums.length <= 100000
0 <= nums[i] <= 10^18
All elements in nums are unique
nums is obtained by taking a strictly increasing sorted array and rotating it at an unknown pivot
0 <= target <= 10^18
Output Format

Output a single integer: the 0-based index of target in nums if it exists; otherwise output -1.

Sample Input 0

0
5
Sample Output 0

-1
Sample Input 1

1
100
100
Sample Output 1

0*/

function searchRotatedTimestamps(nums, target) {
    // Write your code here
    if (nums.length === 0) return -1;

    let left = 0;
    let right = nums.length - 1;

    const tgt = BigInt(target);

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = BigInt(nums[mid]);
        const leftVal = BigInt(nums[left]);
        const rightVal = BigInt(nums[right]);

        if (midVal === tgt) {
            return mid;
        }

        if (leftVal <= midVal) {
            if (tgt >= leftVal && tgt < midVal) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        else {
            if (tgt > midVal && tgt <= rightVal) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;

}