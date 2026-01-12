/*Longest Alternating Binary Substring with Limited Flips
Given a binary string s and an integer k, find the length of the longest substring that can be made alternating (0101... or 1010...) by flipping at most k bits.

Example 1

Input:

s = 010101
k = 0
Output:

6
Explanation:

The string '010101' is already alternating. With k = 0 flips allowed, the entire string of length 6 is valid, so the answer is 6.

Example 2

Input:

s = 1001101
k = 2
Output:

7
Explanation:

We can target the alternating pattern '1010101' over the full length 7.

Comparing to '1001101', mismatches occur at indices 2 and 3.

Flipping those two bits yields '1010101', so the longest alternating substring is length 7.

Input Format

Input consists of two lines:

Line 1: A binary string s of length n, where 0 ≤ n ≤ 100000. s contains only the characters '0' and '1'.
Line 2: An integer k, where 0 ≤ k ≤ n, representing the maximum number of bit flips allowed.
Constraints

0 <= s.length <= 100000
s consists only of characters '0' and '1'
0 <= k <= s.length
Output Format

Output a single integer: the maximum length of a contiguous substring of s that can be converted into an alternating binary pattern by flipping at most k bits.

Sample Input 0

1
0
Sample Output 0

1
Sample Input 1

0
0
Sample Output 1

1*/

const n = s.length;
    if (n === 0) {
        return 0;
    }

    let left = 0;
    let mismatchA = 0; // pattern starting with '0'
    let mismatchB = 0; // pattern starting with '1'
    let maxLen = 0;

    for (let right = 0; right < n; right++) {
        const expectedA = (right % 2 === 0) ? '0' : '1';
        const expectedB = (right % 2 === 0) ? '1' : '0';

        if (s[right] !== expectedA) {
            mismatchA++;
        }
        if (s[right] !== expectedB) {
            mismatchB++;
        }

        while (Math.min(mismatchA, mismatchB) > k) {
            const leftExpectedA = (left % 2 === 0) ? '0' : '1';
            const leftExpectedB = (left % 2 === 0) ? '1' : '0';

            if (s[left] !== leftExpectedA) {
                mismatchA--;
            }
            if (s[left] !== leftExpectedB) {
                mismatchB--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;