/*Max Unique Substring Length in a Session
Given a string of lowercase letters with sessions separated by '' characters, find the maximum length of a substring with all distinct letters within any single session.

Example

Input

sessionString = abcabcbb
Output

3
Explanation

- There is only one session: "abcabcbb". 
- Scanning with a sliding window for distinct letters, the longest substrings without repeats are "abc", "bca" and so on, each of length 3. 
- Therefore, the result is 3.
Input Format

A single line containing the string sessionString.
Constraints

0 <= S.length <= 100000
For all i in [0, S.length]: S[i] is either '*' or a lowercase letter 'a' to 'z'
Each session is defined as a maximal contiguous substring of S without '*' characters
Number of sessions (segments between '*') is at most S.length + 1
Output Format

A single integer denoting the maximum length among all substrings. If sessionString is empty or contains only '*', output 0.
Sample Input 0

*
Sample Output 0

0
Sample Input 1

aa
Sample Output 1

1*/

function maxDistinctSubstringLengthInSessions(sessionString) {
    // Write your code here
    let maxLen = 0;
    let left = 0;
    const lastSeen = new Map();

    for (let right = 0; right < sessionString.length; right++) {
        const ch = sessionString[right];

        if (ch === '*') {
            lastSeen.clear();
            left = right + 1;
            continue;
        }

        if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
            left = lastSeen.get(ch) + 1;
        }

        lastSeen.set(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;

}