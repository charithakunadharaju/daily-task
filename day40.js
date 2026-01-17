/*Top K Frequent Events with Order Preservation
Given an array of integers and an integer k, return an array of the k most frequent elements. If two elements have the same frequency, prioritize the one that appears first.

Example 1

Input:

events = [1, 2, 1, 3, 2, 1]
k = 2
Output:

[1, 2]
Explanation:

Count frequencies: 1→3, 2→2, 3→1.
The top two frequencies are for IDs 1 and 2, so the result is [1, 2].
Example 2

Input:

events = [4, 4, 1, 2, 2, 3, 1, 3, 2]
k = 3
Output:

[2, 4, 1]
Explanation:

Frequencies: 2→3, 4→2, 1→2, 3→2.
The highest is 2.
For the next two slots, 4, 1, and 3 tie with count 2.
Their first occurrences are at indices 0 (4), 2 (1), and 5 (3), so we pick 4 then 1.
Final order: [2, 4, 1].
Input Format

A list of input cases. Each case is a pair (events, k) satisfying:

0 ≤ events.length ≤ 100000
0 ≤ events[i] ≤ 10^9 for all valid i
0 ≤ k ≤ events.length
If events.length > 0 then 1 ≤ k ≤ D, where D is the number of distinct values in events
If events.length = 0 then k = 0
Constraints

0 <= events.length <= 100000
0 <= events[i] <= 10^9 for 0 <= i < events.length
0 <= k <= events.length
If events.length > 0 then 1 <= k <= D, where D is the number of distinct values in events
If events.length = 0 then k = 0
Output Format

For each input case above, the function returns an array of length k containing the IDs of the k most frequent events. Ties in frequency are broken by the smaller first occurrence index in the original events array.

Sample Input 0

0
0
Sample Input 1

1
5
1
Sample Output 1

5*/


function getTopKFrequentEvents(events, k) {
    // Write your code here
    if (k === 0 || events.length === 0) return [];

    const freqMap = new Map();
    
    for (let i = 0; i < events.length; i++) {
        const val = events[i];
        if (!freqMap.has(val)) {
            freqMap.set(val, { count: 1, firstIndex: i });
        } else {
            freqMap.get(val).count++;
        }
    }

    const arr = [];
    for (const [value, data] of freqMap.entries()) {
        arr.push({
            value,
            count: data.count,
            firstIndex: data.firstIndex
        });
    }

    arr.sort((a, b) => {
        if (b.count !== a.count) {
            return b.count - a.count;
        }
        return a.firstIndex - b.firstIndex;
    });

    const result = [];
    for (let i = 0; i < k; i++) {
        result.push(arr[i].value);
    }

    return result;
}