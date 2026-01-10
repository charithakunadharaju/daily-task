/*Task Scheduler with Cooldown and Multiple Machines
Given an array tasks and m machines, find the minimum time to complete all tasks. Each time unit can process up to m tasks in parallel. A machine cannot process the same task type again for k time units.

Examples
Example 1

Input:

tasks = [1, 1, 2, 1]
m = 2
k = 2
Output:

3
Explanation:

We have 4 tasks: [1,1,2,1] and 2 machines with cooldown k=2.
Time unit 1: schedule type 1 on both machines → remaining [2,1].
Time unit 2: neither machine can run type 1 (cooldown until time 3), so we run task 2 on one machine; the other is idle → remaining [1].
Time unit 3: cooldown for type 1 has passed on at least one machine, so we schedule the last task 1. Total time = 3.
Example 2

Input:

tasks = [1, 1, 1, 2, 2, 3]
m = 3
k = 2
Output:

2
Explanation:

We have 6 tasks and 3 machines, k=2.
Time unit 1: schedule three tasks of type 1 in parallel → remaining [2,2,3].
Time unit 2: all machines are free to run types 2, 2, and 3 (none violate cooldown) → remaining [].
All tasks complete in 2 time units.
Input Format

The first line contains a single integer, tasks_count, representing the number of tasks.

The next tasks_count lines each contain a single integer, representing an individual task. If tasks_count is 0, these lines aren't included.

The line following the tasks contains a single integer, m.

The final line contains a single integer, k.

5
60
30
15
45
90
3
2
Explanation:

tasks_count = 5

tasks = [60, 30, 15, 45, 90]

m = 3

k = 2

Constraints

0 <= tasks.length <= 100000
0 <= tasks[i] <= 100000 for all 0 <= i < tasks.length
1 <= m <= 100000
0 <= k <= 100000
Output Format

Return a single integer representing the minimum number of time units required to complete all tasks under the given constraints.
Sample Input 0

1
5
1
0
Sample Output 0

1
Sample Input 1

3
1
2
3
5
2
Sample Output 1

1*/

function calculateMinimumTimeUnits(tasks, m, k) {
    // Write your code here
    if (tasks.length === 0) return 0;

    const freq = new Map();
    for (const t of tasks) {
        freq.set(t, (freq.get(t) || 0) + 1);
    }

    let maxFreq = 0;
    let countMax = 0;

    for (const f of freq.values()) {
        if (f > maxFreq) {
            maxFreq = f;
            countMax = 1;
        } else if (f === maxFreq) {
            countMax++;
        }
    }

    const capacityTime = Math.ceil(tasks.length / m);

    const cooldownTime =
        (maxFreq - 1) * (k + 1) + Math.ceil(countMax / m);

    return Math.max(capacityTime, cooldownTime);

}