/*Maximize Profit with Task Deadlines and Multiple Servers
Given n tasks with deadlines and profits, and m servers, schedule tasks to maximize total profit. Each task takes one time unit, up to m tasks can run per time slot, and each task must finish by its deadline.

Examples
Example 1

Input:

n = 3
m = 1
deadlines = [2, 1, 3]
profits = [20, 10, 30]
Output:

60
Explanation: With one server (m=1) and three tasks:

Sort or consider scheduling by profit within deadlines:
Task 2 (profit 30, deadline 3) → assign to time slot 3
Task 0 (profit 20, deadline 2) → assign to time slot 2
Task 1 (profit 10, deadline 1) → assign to time slot 1
Each fits before its deadline and we have exactly one task per slot.
Total profit = 30 + 20 + 10 = 60.
Example 2

Input:

n = 7
m = 2
deadlines = [1, 1, 1, 2, 2, 3, 3]
profits = [10, 20, 5, 30, 25, 15, 18]
Output:

118
Explanation: We have 7 tasks and 2 servers per time unit. We fill from the latest slot back:

Time slot 3 (capacity 2): tasks with deadline ≥ 3 are #5 (15) and #6 (18). Schedule both → profit = 15 + 18 = 33.
Time slot 2 (capacity 2): remaining tasks with deadline ≥ 2 are #3 (30) and #4 (25). Schedule both → profit = 30 + 25 = 55.
Time slot 1 (capacity 2): remaining tasks with deadline ≥ 1 are #0 (10), #1 (20), #2 (5). Pick the top 2 profits: 20 and 10 → profit = 30. Total profit = 33 + 55 + 30 = 118.
Input Format

The first line contains a single integer, n.
The second line contains a single integer, m.
The third line contains an integer, deadlines_count, representing the number of deadlines.
The next deadlines_count lines each contain a single integer for a deadline.
The following line contains an integer, profits_count, representing the number of profits. (Note: For a valid problem, profits_count should be equal to deadlines_count).
The final profits_count lines each contain a single integer for a profit, corresponding to each deadline.
Example
Input:

4
50
4
2
1
4
2
4
70
60
50
40
Explanation:

n = 4
m = 50
deadlines_count = 4
deadlines = [2, 1, 4, 2]
profits_count = 4
profits = [70, 60, 50, 40]
Constraints

0 <= n <= 1000000
1 <= m <= 1000000
deadlines.length == n
profits.length == n
1 <= deadlines[i] <= 1000000000 for all 0 <= i < n
0 <= profits[i] <= 1000000000 for all 0 <= i < n
Output Format

A single integer denoting the maximum total profit obtainable under the given constraints.
Sample Input 0

1
1
1
1
1
100
Sample Output 0

100
Sample Input 1

3
1
3
2
2
2
3
10
20
15
Sample Output 1

35*/


function maximizeNonOverlappingMeetings(n, m, deadlines, profits) {
    // Write your code here
    if (n === 0 || m === 0) return 0;

   
    const tasks = [];
    for (let i = 0; i < n; i++) {
        tasks.push([deadlines[i], profits[i]]);
    }

    tasks.sort((a, b) => a[0] - b[0]);

    
    class MinHeap {
        constructor() {
            this.h = [];
        }
        push(x) {
            this.h.push(x);
            this._up(this.h.length - 1);
        }
        pop() {
            if (this.h.length === 1) return this.h.pop();
            const root = this.h[0];
            this.h[0] = this.h.pop();
            this._down(0);
            return root;
        }
        size() {
            return this.h.length;
        }
        _up(i) {
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.h[p] <= this.h[i]) break;
                [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
                i = p;
            }
        }
        _down(i) {
            const n = this.h.length;
            while (true) {
                let s = i;
                const l = i * 2 + 1;
                const r = i * 2 + 2;
                if (l < n && this.h[l] < this.h[s]) s = l;
                if (r < n && this.h[r] < this.h[s]) s = r;
                if (s === i) break;
                [this.h[s], this.h[i]] = [this.h[i], this.h[s]];
                i = s;
            }
        }
    }

    const heap = new MinHeap();

    for (const [deadline, profit] of tasks) {
        heap.push(profit);

        if (heap.size() > deadline * m) {
            heap.pop();
        }
    }

    let total = 0n;
    while (heap.size() > 0) {
        total += BigInt(heap.pop());
    }

    return total;

}