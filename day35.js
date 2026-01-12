/*Reverse Even-Indexed Nodes and Append
Given a singly linked list, extract all even-indexed nodes, reverse their order, and append them to the end of the list in one traversal. Return the head of the modified list.

Example

Input

head = [10, 20, 30, 40, 50, 60]
Output

[20, 40, 60, 50, 30, 10]
Explanation

- Step 1: Extract sponsored nodes at even positions 0, 2, 4 → [10, 30, 50]. 
- Step 2: Remaining non-sponsored nodes are [20, 40, 60]. 
- Step 3: Reverse the extracted sponsored list → [50, 30, 10]. 
- Step 4: Append the reversed list to [20, 40, 60], yielding [20, 40, 60, 50, 30, 10].
Input Format

The first line contains an integer n denoting the length of linked list.
The next n lines contains elements of the linked list.
Example

6
10
20
30
40
50
60
Constraints

Let n be the number of nodes in the list
0 <= n <= 100000
-10^9 <= value of each node <= 10^9
Sponsored nodes are those at even indices: 0, 2, 4, ...
The list may be empty (n = 0)
Output Format

An array representing the values of the modified linked list.
Sample Input 0

1
42
Sample Output 0

42
Sample Input 1

2
1
2
Sample Output 1

2
1*/

function extractAndAppendSponsoredNodes(head) {
    // Write your code here
    if (head === null || head.next === null) {
        return head;
    }

    let oddHead = null;
    let oddTail = null;
    let evenReversed = null;

    let index = 0;
    let current = head;

    while (current !== null) {
        let nextNode = current.next;
        current.next = null;

        if (index % 2 === 0) {
            current.next = evenReversed;
            evenReversed = current;
        } else {
            if (oddHead === null) {
                oddHead = current;
                oddTail = current;
            } else {
                oddTail.next = current;
                oddTail = current;
            }
        }

        index++;
        current = nextNode;
    }

    if (oddTail !== null) {
        oddTail.next = evenReversed;
        return oddHead;
    }

    return evenReversed;

}