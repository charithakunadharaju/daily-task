/*Shortest Path with Processing Delays at Nodes
Given n nodes, their processing times, m directed edges with weights, and a source node s, find the shortest path from s to all nodes including processing delays at intermediate nodes. Return an array where element i is the minimum time to reach node i or -1 if unreachable.

Examples
Example 1

Input:

n = 3
handlingTimes = [1, 2, 3]
m = 3
routes = [[0, 1, 4], [1, 2, 5], [0, 2, 10]]
source = 0
Output:

[0, 4, 10]
Explanation: From source 0:

To center 0 takes 0 (starting point).
To center 1 the only path is 0→1 with travel time 4. There are no intermediate stops, so no handling delay is added. Total = 4.
To center 2 there are two paths:
Direct 0→2 has travel time 10, no intermediate stops ⇒ total 10.
Via center 1: travel = 4 + 5 = 9, intermediate stop = center 1 adds handling delay 2 ⇒ total 9 + 2 = 11.
The minimum is 10, so the result is [0, 4, 10].
Example 2

Input:

n = 5
handlingTimes = [0, 5, 2, 3, 4]
m = 6
routes = [[0, 1, 2], [0, 2, 8], [1, 3, 7], [2, 3, 1], [3, 4, 3], [1, 4, 15]]
source = 0
Output:

[0, 2, 8, 11, 17]
Explanation:

Compute shortest times from 0, adding handling delays only at intermediate stops:
Center 0: time = 0.
Center 1: direct 0→1 travel=2, no intermediate stops ⇒ 2.
Center 2: direct 0→2 travel=8, no intermediate ⇒ 8.
Center 3: two candidate paths:
0→1→3: travel = 2 + 7 = 9, intermediate stop = 1 adds 5 ⇒ 9 + 5 = 14
0→2→3: travel = 8 + 1 = 9, intermediate stop = 2 adds 2 ⇒ 9 + 2 = 11
Minimum is 11.
Center 4: three candidate paths:
0→1→4: travel = 2 + 15 = 17, intermediate = 1 adds 5 ⇒ 22
0→1→3→4: travel = 2 + 7 + 3 = 12, intermediates = 1 and 3 add 5 + 3 = 8 ⇒ 20
0→2→3→4: travel = 8 + 1 + 3 = 12, intermediates = 2 and 3 add 2 + 3 = 5 ⇒ 17
Minimum is 17.
So the resulting times are [0,2,8,11,17].
Input Format

The first line contains an integer n, denoting the number of distribution centers.
The second line contains an integer handlingTimes_count the length of the array handlingTimes.
The next handlingTimes_count lines contain the value of the array.
The next line contains an integer routes_rows denoting the rows in the 2D array routes.
The next line contains an integer routes_columns denoting the columns in the 2D array routes.
The next routes_rows contains the value of the 2D array.
The last line contains the value of source, denoting the index of starting center.
Constraints

1 <= n <= 100000
handling_times.length == n
0 <= handling_times[i] <= 1000000 for all 0 <= i < n
0 <= m <= 200000
routes.length == m
routes[j].length == 3 for all 0 <= j < m
0 <= routes[j][0] < n and 0 <= routes[j][1] < n for all 0 <= j < m
0 <= routes[j][2] <= 1000000 for all 0 <= j < m
0 <= s < n
Output Format

Returns an integer array of length n. For each i in [0, n-1], the value is the minimum total time to travel from source to i, counting travel times plus handling delays at all intermediate centers (excluding delay at the source itself).
If center i is unreachable, the value is -1.
Sample Input 0

1
1
0
0
0
0
0
Sample Output 0

0
Sample Input 1

2
2
1
2
1
1
3
0 1 3
0
Sample Output 1

0
3
Sample Input 2

3
3
1
2
3
3
3
3
0 1 4
1 2 5
0 2 10
0
Sample Output 2

0
4
10*/




function computeShortestDeliveryTimes(n, handlingTimes, m, routes, source) {
    // Write your code here
const graph = Array.from({ length: n }, () => []);
    for (const [u, v, w] of routes) {
        graph[u].push([v, w]);
    }

    const dist = Array(n).fill(Infinity);
    dist[source] = 0;

    
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        push(item) {
            this.heap.push(item);
            this._bubbleUp(this.heap.length - 1);
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._bubbleDown(0);
            return top;
        }
        _bubbleUp(i) {
            while (i > 0) {
                const p = Math.floor((i - 1) / 2);
                if (this.heap[p][0] <= this.heap[i][0]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }
        _bubbleDown(i) {
            const n = this.heap.length;
            while (true) {
                let smallest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
                if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
                if (smallest === i) break;
                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }
        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const pq = new MinHeap();
    pq.push([0, source]);


    while (!pq.isEmpty()) {
        const [currentDist, u] = pq.pop();
        if (currentDist > dist[u]) continue;

        for (const [v, w] of graph[u]) {
            const handlingCost = (u === source) ? 0 : handlingTimes[u];
            const newDist = currentDist + w + handlingCost;

            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push([newDist, v]);
            }
        }
    }

    return dist.map(d => d === Infinity ? -1 : d);
}