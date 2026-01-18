/*Min Spanning Tree with One Free Edge
Given an undirected weighted graph with n nodes (0 to n-1) and m edges, find the minimum spanning tree weight when you may set at most one edge's weight to zero.

Examples
Example 1

Input:

n = 3
m = 3
edges = [[0, 1, 3], [1, 2, 4], [0, 2, 5]]
Output:

3
Explanation: We have a triangle of nodes 0–1–2 with weights 3, 4, and 5. Without using the free edge, the MST would pick edges (0–1)=3 and (1–2)=4 for total 7. Now we try making each edge weight zero (at most one) and recompute: 1) Free edge (0–1): weights become [0,1,0], choose (0–1)=0 and then the next smallest (1–2)=4 → total 4. 2) Free edge (1–2): weights become [1–2,0], choose (1–2)=0 and then (0–1)=3 → total 3. 3) Free edge (0–2): weights become [0,5], choose (0–2)=0 and then (0–1)=3 → total 3. The minimum achievable total is 3.

Example 2 Input:

n = 4
m = 5
edges = [[0, 1, 1], [0, 2, 5], [1, 2, 2], [1, 3, 4], [2, 3, 3]]
Output:

3
Explanation: First compute the standard MST (no free edge): - Sort edges: (0–1)=1, (1–2)=2, (2–3)=3, (1–3)=4, (0–2)=5. - Pick (0–1), (1–2), (2–3) to connect all 4 nodes, total = 1 + 2 + 3 = 6. Now try making each edge zero and recomputing the MST: • Free (1–3)=4 → becomes 0. New sorted weights: 0,1,2,3,5. Pick (1–3)=0, (0–1)=1, (1–2)=2 → total = 3. • Free (2–3)=3 → becomes 0. Pick (2–3)=0, (0–1)=1, (1–2)=2 → total = 3. • Free (0–2)=5 → becomes 0. Pick (0–2)=0, (0–1)=1, (1–2)=2 → total = 3. • Free (0–1)=1 → becomes 0. Pick (0–1)=0, (1–2)=2, (2–3)=3 → total = 5. The best possible total is 3.

Input Format

The function receives: an integer n (1 ≤ n ≤ 100000), an integer m (n-1 ≤ m ≤ min(200000, n*(n-1)/2)), and a 2D integer array edges of size m×3.
For each i in [0, m-1], edges[i] = [u, v, w] with 0 ≤ u < n, 0 ≤ v < n, u ≠ v, 0 ≤ w ≤ 10^9.
The graph is undirected and connected; multiple edges between the same nodes are allowed.
Constraints

1 <= n <= 100000
n-1 <= m <= min(200000, n * (n - 1) / 2)
For each edge i: edges[i].length == 3
For each edge [u, v, w]: 0 <= u < n
For each edge [u, v, w]: 0 <= v < n
For each edge [u, v, w]: u != v
For each edge [u, v, w]: 0 <= w <= 10^9
The input graph is connected (there exists at least one spanning tree)
All edge weights w are integers
Graph is undirected: edge [u, v, w] is identical to [v, u, w]
Multiple edges between the same pair of nodes are allowed
Output Format

Return a 64-bit integer equal to the minimum possible sum of the weights of a spanning tree after choosing at most one edge from edges and treating its weight as zero.
Sample Input 0

5
5
5
3
1 0 4
2 1 6
3 1 7
4 2 9
1 4 2
Sample Output 0

12
Sample Input 1

4
3
3
3
1 0 9
2 1 8
3 2 9
Sample Output 1

17
Sample Input 2

3
3
3
3
1 0 1
2 1 7
2 0 5
Sample Output 2

1*/



function calculateMinimumSpanningTreeWeightWithFreeEdge(n, m, edges) {
    // Write your code here
class DSU {
        constructor(n) {
            this.parent = Array.from({ length: n }, (_, i) => i);
            this.rank = Array(n).fill(0);
        }
        find(x) {
            if (this.parent[x] !== x)
                this.parent[x] = this.find(this.parent[x]);
            return this.parent[x];
        }
        union(a, b) {
            a = this.find(a);
            b = this.find(b);
            if (a === b) return false;
            if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
            this.parent[b] = a;
            if (this.rank[a] === this.rank[b]) this.rank[a]++;
            return true;
        }
    }
    
    edges.sort((a, b) => a[2] - b[2]);
    const dsu = new DSU(n);

    const adj = Array.from({ length: n }, () => []);
    let mstWeight = 0;

    for (const [u, v, w] of edges) {
        if (dsu.union(u, v)) {
            mstWeight += w;
            adj[u].push([v, w]);
            adj[v].push([u, w]);
        }
    }

    const LOG = Math.ceil(Math.log2(n)) + 1;
    const parent = Array.from({ length: LOG }, () => Array(n).fill(-1));
    const maxEdge = Array.from({ length: LOG }, () => Array(n).fill(0));
    const depth = Array(n).fill(0);

    function dfs(u, p) {
        for (const [v, w] of adj[u]) {
            if (v !== p) {
                depth[v] = depth[u] + 1;
                parent[0][v] = u;
                maxEdge[0][v] = w;
                dfs(v, u);
            }
        }
    }

    dfs(0, -1);

    for (let k = 1; k < LOG; k++) {
        for (let i = 0; i < n; i++) {
            if (parent[k - 1][i] !== -1) {
                parent[k][i] = parent[k - 1][parent[k - 1][i]];
                maxEdge[k][i] = Math.max(
                    maxEdge[k - 1][i],
                    maxEdge[k - 1][parent[k - 1][i]]
                );
            }
        }
    }

    function getMaxEdge(u, v) {
        let res = 0;
        if (depth[u] < depth[v]) [u, v] = [v, u];

        let diff = depth[u] - depth[v];
        for (let k = 0; k < LOG; k++) {
            if (diff & (1 << k)) {
                res = Math.max(res, maxEdge[k][u]);
                u = parent[k][u];
            }
        }

        if (u === v) return res;

        for (let k = LOG - 1; k >= 0; k--) {
            if (parent[k][u] !== parent[k][v]) {
                res = Math.max(res, maxEdge[k][u], maxEdge[k][v]);
                u = parent[k][u];
                v = parent[k][v];
            }
        }

        return Math.max(res, maxEdge[0][u], maxEdge[0][v]);
    }

   
    let answer = mstWeight;

    for (const [u, v] of edges) {
        const maxOnPath = getMaxEdge(u, v);
        answer = Math.min(answer, mstWeight - maxOnPath);
    }

    return answer;
}