/*Count Connected Components in Network
Given n computers labeled 0 to n-1 and a list of bidirectional communication links, find the number of connected components.

Example

Input

n = 4
links = [[0, 1], [2, 3]]
Output

2
Explanation

There are 4 computers: 0, 1, 2, and 3. Links connect 0-1 and 2-3. Computers 0 and 1 form one group since they are directly connectable. Similarly, 2 and 3 form another group. There are no connections between the two groups, so the number of isolated communication groups is 2.
Input Format

The first line contains an integer m denoting the length of links.
The second line denotes the length of individual elements of array links.
The next m lines contains individual elements of links.
The last line contains the value of n.
Example

2
2
0 1
2 3
4
Constraints

1 <= n <= 1000
0 <= links.length <= n * (n - 1) / 2
links[i].length == 2 for each valid i
0 <= links[i][0] < n
0 <= links[i][1] < n
links[i][0] != links[i][1] for each valid i (No self-loops)
Each pair [a, b] is bidirectional, i.e., [a, b] and [b, a] are considered the same link
No duplicate links (i.e., no repeated [a, b] or [b, a]) in links
All values in each link are integers
Output Format

Returns a single INTEGER representing the number of distinct isolated communication groups
Sample Input 0

1
2
0 1
2
Sample Output 0

1
Sample Input 1
3
2
0 1
1 2
0 2
3
Sample Output 1

1*/

function countIsolatedCommunicationGroups(links, n) {
    // Write your code here
  const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of links) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Array(n).fill(false);
    let components = 0;

    function dfs(node) {
        visited[node] = true;
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            components++;
            dfs(i);
        }
    }

    return components;
}