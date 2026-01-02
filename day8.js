/*Find First Occurrence
Given a sorted array of integers that may contain duplicates, return the index of the first occurrence of a target value or -1 if not found.

Example

Input:

nums = [1, 2, 3, 4, 5]
target = 3
Output:

2
Explanation:

We perform binary search on [1,2,3,4,5].

low=0, high=4 → mid=2 → nums[2]=3 equals target. Record result=2, then search left half.
Update high=mid-1=1. Now low=0, high=1 → mid=0 → nums[0]=1 < target, so move low to mid+1=1.
low=1, high=1 → mid=1 → nums[1]=2 < target, so move low to mid+1=2.
Now low(2)>high(1), terminate. The first occurrence found is at index 2.

Input Format

The input consists of two lines.

First line: two space-separated integers n and target, where 0 <= n <= 1000 and -10^9 <= target <= 10^9.

Second line: n space-separated integers nums[i], each satisfying -10^9 <= nums[i] <= 10^9, and nums is sorted in non-decreasing order.

Edge cases include: n = 0 (empty array), all elements less than target, all elements greater than target, multiple duplicates of target, single-element array.

Constraints

0 <= nums.length <= 1000
-10^9 <= nums[i] <= 10^9 for all 0 <= i < nums.length
-10^9 <= target <= 10^9
For all 0 <= i < nums.length - 1, nums[i] <= nums[i+1] (array is non-decreasingly sorted)
Output Format

Output a single integer: the index (0-based) of the first occurrence of target in the array nums. If target does not exist in nums, output -1.

Sample Input 0

0
5
Sample Output 0

-1
Sample Input 1

1
3
3
Sample Output 1

0*/


function findFirstOccurrence(nums, target) {
 let low = 0;
    let high = nums.length - 1;
    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (nums[mid] === target) {
            result = mid;      // Record current occurrence
            high = mid - 1;    // Continue searching on the left side
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return result;
}