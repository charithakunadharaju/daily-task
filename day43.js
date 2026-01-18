/*Minimize Task Cancellations to Avoid Server Overlaps
Given n tasks with start time, end time, and server IDs, return the minimum number of tasks to cancel so that no remaining tasks overlap in time on shared servers.

Examples
Example 1

Input:

n = 3
start = [1, 2, 3]
end = [4, 5, 6]
servers = [[1, 2], [2, 3], [3, 4]]
Output:

1
Explanation: We have 3 tasks indexed 0–2.

Task 0 runs [1,4], affects servers {1,2}.
Task 1 runs [2,5], affects servers {2,3}.
Task 2 runs [3,6], affects servers {3,4}.
Conflicts:

Task 0 and 1 overlap (time [2,4]) and share server 2.
Task 1 and 2 overlap (time [3,5]) and share server 3.
Task 0 and 2 overlap (time [3,4]) but share no server.
The conflict graph is a path 0–1–2. To remove all conflicts, we can cancel just task 1. Then tasks 0 and 2 remain conflict-free. Minimum cancellations = 1.
Example 2

Input:

n = 5
start = [1, 2, 6, 11, 12]
end = [10, 5, 9, 15, 14]
servers = [[1, 2], 0, [2], [1], [3, 4], [4]]
Output:

2
Explanation: We have 5 tasks:

Component A (tasks 0–2):

Task 0: [1,10], servers {1,2}
Task 1: [2,5], servers {2}
Task 2: [6,9], servers {1}
Conflicts in A:

0–1 overlap & share 2
0–2 overlap & share 1
1–2 do not overlap
To break all A conflicts, best is to cancel task 0 (1 cancellation).
Component B (tasks 3–4):

Task 3: [11,15], servers {3,4}
Task 4: [12,14], servers {4}
They overlap and share server 4, so we must cancel one of them (1 cancellation). Total cancellations = 1 (from A) + 1 (from B) = 2.

Input Format

The first line contains a single integer, n.
The second line contains an integer, start_times_count, the number of elements in the start_times list.
The next start_times_count lines each contain a single integer for the start_times list.
The following line contains an integer, end_times_count, the number of elements in the end_times list.
The next end_times_count lines each contain a single integer for the end_times list.
The next line contains an integer, servers_rows, the number of rows in the servers matrix.
The next line contains an integer, servers_columns, the number of columns in the servers matrix.
The final servers_rows lines each contain servers_columns space-separated integers, representing a row of the servers matrix.
25
4
10
20
30
40
4
15
25
35
45
3
5
1 1 0 1 0
0 1 0 0 1
1 0 1 1 0
Explanation:

n = 25
start_times_count = 4, followed by the 4 elements of start_times: [10, 20, 30, 40]
end_times_count = 4, followed by the 4 elements of end_times: [15, 25, 35, 45]
servers_rows = 3
servers_columns = 5
servers = A 3x5 matrix represented by the last 3 lines.
Constraints

0 <= n <= 1000000
start.length == n
end.length == n
servers.length == n
For all 0 <= i < n: 0 <= start[i] < end[i] <= 10^9
For all 0 <= i < n: 1 <= servers[i].length <= 1000
Sum of servers[i].length over i in [0, n) <= 1000000
For all 0 <= i < n and 0 <= j < servers[i].length: 0 <= servers[i][j] <= 10^9
For all 0 <= i < n: all values in servers[i] are unique
Output Format

Return a single integer denoting the minimum number of tasks that must be canceled to eliminate all conflicts (i.e., no two remaining tasks overlap in time on any shared server).
Sample Input 0

1
1
0
1
1
1
1
5
Sample Output 0

0
Sample Input 1

2
2
0
5
2
4
10
2
1
1
1
Sample Output 1

0*/

function minTasksToCancelForNoConflict(n, start_times, end_times, servers) {

if (n === 0) return 0;

    const tasks = [];
    for (let i = 0; i < n; i++) {
        tasks.push({
            start: start_times[i],
            end: end_times[i],
            servers: servers[i]
        });
    }

    
    tasks.sort((a, b) => a.end - b.end);

    const serverLastEnd = new Map();

    let kept = 0;

    for (const task of tasks) {
        let canKeep = true;

        for (const server of task.servers) {
            if (
                serverLastEnd.has(server) &&
                serverLastEnd.get(server) > task.start
            ) {
                canKeep = false;
                break;
            }
        }

        if (canKeep) {
            kept++;
            for (const server of task.servers) {
                serverLastEnd.set(server, task.end);
            }
        }
    }

    return n - kept;
}