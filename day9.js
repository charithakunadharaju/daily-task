/*Maximum Number of Non-Overlapping Intervals
Given an array of intervals where each interval has a start and end time, return the maximum number of non-overlapping intervals.

Examples
Example 1

Input:

meetings = [[1, 2], [2, 3], [3, 4], [1, 3]]
Output:

3
Explanation:

Step 1: Sort meetings by end time → [[1,2],[2,3],[1,3],[3,4]].
Step 2: Select [1,2] (count=1, last_end=2).
Step 3: [2,3] has start 2 ≥ 2, select (count=2, last_end=3).
Step 4: [1,3] start 1 < 3, skip.
Step 5: [3,4] start 3 ≥ 3, select (count=3). Result = 3.
Example 2

Input:

meetings = [[0, 5], [0, 1], [1, 2], [2, 3], [3, 5], [4, 6]]
Output:

4
Explanation:

Step 1: Sort by end time → [[0,1],[1,2],[2,3],[3,5],[0,5],[4,6]].
Step 2: Select [0,1] (count=1, end=1).
Step 3: [1,2] (count=2, end=2).
Step 4: [2,3] (count=3, end=3).
Step 5: [3,5] (count=4, end=5). Skip [0,5] and [4,6] because their start times are before last_end=5. Result = 4.
Input Format

The first line contains a single integer, meetings_rows, representing the total number of meetings.
The second line contains a single integer, meetings_columns, representing the number of properties for each meeting (typically 2 for a start and end time).
The next meetings_rows lines describe the meetings. Each line contains meetings_columns space-separated integers, representing the properties of a single meeting.
6
2
1 2
3 4
0 6
5 7
8 9
5 9
Explanation:

The first line, 6, is the value for meetings_rows.
The second line, 2, is the value for meetings_columns.
The following 6 lines represent the individual meetings, which are parsed into a 2D list: [[1, 2], [3, 4], [0, 6], [5, 7], [8, 9], [5, 9]].
Constraints

0 <= meetings.length <= 1000
meetings[i].length == 2 for all 0 <= i < meetings.length
0 <= meetings[i][0] < meetings[i][1] <= 10^9
All start and end times are integers
Meetings may share start or end times
Output Format

Return a single integer denoting the maximum number of non-overlapping meetings that can be scheduled.
Sample Input 0

1
2
5 10
Sample Output 0

1
Sample Input 1

3
2
1 2
2 3
3 4
Sample Output 1

3*/

function maximizeNonOverlappingMeetings(meetings) {
     if (meetings.length === 0) return 0;

    //Sort meetings by end time
    meetings.sort((a, b) => a[1] - b[1]);

    let count = 1;                 
    let lastEnd = meetings[0][1];

    //Iterate through remaining meetings
    for (let i = 1; i < meetings.length; i++) {
        let start = meetings[i][0];
        let end = meetings[i][1];

        // If meeting does not overlap
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}
