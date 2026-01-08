/*Place N Cameras Without Conflict on Blocked Grid
Given an NxN grid where 0 is empty and 1 is blocked, return true if N cameras can be placed on empty cells such that no two share the same row, column, or diagonal.

Examples
Example 1

Input:

N = 4
grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
Output:

True
Explanation:

We need to place 4 cameras so that no two share a row, column, or diagonal. One valid arrangement is:
Row 0 → column 1
Row 1 → column 3
Row 2 → column 0
Row 3 → column 2
Each row has exactly one camera, no two are in the same column, and no two lie on the same diagonal. Thus the function returns true.
Example 2

Input:

N = 4
grid = [[0, 1, 0, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 0, 1, 0]]
Output:

True
Explanation:

Some cells are blocked by skylights (marked 1).
We still need 4 cameras. One possible placement:
Row 0 → column 2 (cell [0][2] is empty)
Row 1 → column 0 (cell [1][0] is empty, no conflict with row 0)
Row 2 → column 3 (cell [2][3] is empty, no conflicts)
Row 3 → column 1 (cell [3][1] is empty, no conflicts)
All cameras are on empty cells, and none share a row, column, or diagonal.
The function returns true.
Input Format

The first line contains a single integer, N.
The second line contains a single integer, grid_rows, representing the number of rows in the grid.
The third line contains a single integer, grid_columns, representing the number of columns in the grid.
The next grid_rows lines describe the grid. Each of these lines contains grid_columns space-separated integers.
5
3
4
1 0 0 1
0 1 1 0
1 0 1 0
Explanation:

N = 5
grid_rows = 3
grid_columns = 4
grid = [[1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 0]]
Constraints

1 <= N <= 15
grid.length == N
For all 0 <= i < N, grid[i].length == N
For all 0 <= i, j < N, grid[i][j] ∈ {0, 1}
Output Format

Return a single boolean value (true or false) indicating whether a valid arrangement of N cameras exists under the given constraints.

Sample Input 0

1
1
1
0
Sample Output 0

1
Sample Input 1

2
2
2
0 1
1 0
Sample Output 1

0*/


function canPlaceSecurityCameras(N, grid) {
    // Write your code here
      const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col

    function backtrack(row) {
        if (row === N) {
            return true;
        }

        for (let col = 0; col < N; col++) {
            if (grid[row][col] === 1) continue;

            if (
                cols.has(col) ||
                diag1.has(row - col) ||
                diag2.has(row + col)
            ) {
                continue;
            }

            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            if (backtrack(row + 1)) {
                return true;
            }

            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }

        return false;
    }

    return backtrack(0);

}