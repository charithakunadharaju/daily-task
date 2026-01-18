/*Peak Concurrent Sessions per User Group
Given a list of events where each event is [timestamp, user_id, group_id, event_type], compute the peak concurrent sessions for each group. Return a hash map, mapping group_id to its peak count.

Example

Input:

events = [
    ['1', '101', '500', 'login'],
    ['2', '102', '500', 'login'],
    ['5', '101', '500', 'logout'], 
    ['6', '102', '500', 'logout']
]
Output:

[[500, 2]]
Explanation:

Process events for group 500 in chronological order: at time 1 user 101 logs in (count=1), at time 2 user 102 logs in (count=2 peak), then users log out at times 5 and 6. The maximum concurrent sessions is 2.

Input Format

events: 2D_STRING_ARRAY of length N, where 0 ≤ N ≤ 100000.

Each events[i] is an array of exactly 4 strings: [timestamp, user_id, group_id, event_type].

timestamp: string representing an integer t, 0 ≤ t ≤ 10^9.
user_id: string representing an integer u, 1 ≤ u ≤ 10^9.
group_id: string representing an integer g, 1 ≤ g ≤ 10^9.
event_type: either "login" or "logout".
The events array may be unsorted by timestamp and may contain multiple events with the same timestamp.

A single user may have overlapping sessions across different groups.

It is guaranteed that for every logout event there was a corresponding prior login event for the same user and group.

Constraints

0 <= events.length <= 100000
For all i in [0, events.length): events[i].length == 4
For all i in [0, events.length): 0 <= Integer.parseInt(events[i][0]) <= 10^9
For all i in [0, events.length): 1 <= Integer.parseInt(events[i][1]) <= 10^9
For all i in [0, events.length): 1 <= Integer.parseInt(events[i][2]) <= 10^9
For all i in [0, events.length): events[i][3] ∈ {"login","logout"}
Timestamps are not guaranteed to be sorted
Multiple events may share the same timestamp
Users may have overlapping sessions across different groups
Output Format

Return a 2D_INTEGER_ARRAY where each element is a two-integer array [group_id, peak_concurrent_sessions].

group_id: integer identifier of a group present in the input events.
peak_concurrent_sessions: the maximum number of simultaneous active sessions observed for that group at any point in time (integer ≥ 0).
The result must contain exactly one entry for each distinct group_id found in the input.

If events is empty, return an empty array.

The order of the [group_id, peak_concurrent_sessions] pairs in the output does not matter.

Sample Input 0

2
4
1 101 500 login
2 101 500 logout
Sample Output 0

500 1
Sample Input 1

2
4
5 123 700 login
5 123 700 logout
Sample Output 1

700 1*/

function computeGroupPeakConcurrency(events) {
    // Write your code here
    if (!events || events.length === 0) return [];

    const groupEvents = new Map();

    for (const [timestamp, userId, groupId, eventType] of events) {
        const time = Number(timestamp);
        const delta = eventType === 'login' ? 1 : -1;

        if (!groupEvents.has(groupId)) {
            groupEvents.set(groupId, []);
        }
        groupEvents.get(groupId).push([time, delta]);
    }

    const result = [];

    for (const [groupId, evts] of groupEvents.entries()) {
        evts.sort((a, b) => {
            if (a[0] !== b[0]) return a[0] - b[0];
            return b[1] - a[1];
        });

        let current = 0;
        let peak = 0;

        for (const [, delta] of evts) {
            current += delta;
            peak = Math.max(peak, current);
        }

        result.push([Number(groupId), peak]);
    }

    return result;

}