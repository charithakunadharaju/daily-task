/*Two Sum
Given an array of positive integers and a target integer, return the indices of two elements that sum to the target or [-1, -1] if no such pair exists.

Example 1

Input:

taskDurations = [2, 7, 11, 15]
slotLength = 9
Output:

[0, 1]
Explanation:

We look for two durations that sum to the slotLength. Starting with index 0 (2), we need 7 (9-2). At index 1, duration is 7. Thus indices [0, 1] sum to 9.

Example 2

Input:

taskDurations = [1, 2, 3, 4]
slotLength = 8
Output:

[-1, -1]
Explanation:

No two durations in the list sum to 8. All pairs are: 1+2=3, 1+3=4, 1+4=5, 2+3=5, 2+4=6, 3+4=7. None match 8.

Input Format

The input consists of three lines:

An integer n, the number of tasks (0 <= n <= 1000).
n space-separated positive integers: taskDurations[0], taskDurations[1], ..., taskDurations[n-1] (each between 1 and 1,000,000).
An integer slotLength, the desired sum of two task durations (1 <= slotLength <= 2,000,000).
Constraints

Let n = taskDurations.length
0 <= n <= 1000
1 <= taskDurations[i] <= 1000000 for all 0 <= i < n
1 <= slotLength <= 2000000
Indices are 0-based
If a solution exists, return two distinct indices i, j such that 0 <= i < j < n and taskDurations[i] + taskDurations[j] = slotLength
If no valid pair exists, return [-1, -1]
Output Format

Print two space-separated integers i and j (0 <= i < j < n) representing the indices of the two tasks whose durations sum exactly to slotLength. If multiple valid pairs exist, any one may be printed. If no valid pair exists, print "-1 -1".

Sample Input 0

0
10
Sample Output 0

-1
-1
Sample Input 1

1
5
5
Sample Output 1

-1
-1*/

function findTaskPairForSlot(taskDurations, slotLength) {
    // Write your code here
    const map = new Map(); 

    for (let i = 0; i < taskDurations.length; i++) {
        const current = taskDurations[i];
        const required = slotLength - current;

        if (map.has(required)) {
            return [map.get(required), i];
        }

        map.set(current, i);
    }

    return [-1, -1];
    

}