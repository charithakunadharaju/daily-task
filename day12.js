/*Min-Tracking Stack Implementation
Implement a stack that supports push, pop, top, and getMin operations in O(1) time, where getMin returns the minimum element.

Example

Input

n = 10
operations = ['push 2', 'push 0', 'push 3', 'push 0', 'getMin', 'pop', 'getMin', 'pop', 'top', 'getMin']
Output

[0,0,0,0]
Explanation

- push 2 → stack = [2], min = 2 2. 
- push 0 → stack = [2,0], min = 0 3.
- push 3 → stack = [2,0,3], min = 0 4. 
- push 0 → stack = [2,0,3,0], min = 0 5. 
- getMin → returns 0 6. 
- pop → removes 0, stack = [2,0,3], min = 0 7. 
- getMin → returns 0 8. 
- pop → removes 3, stack = [2,0], min = 0 9. 
- top → returns 0 10. getMin → returns 0
Input Format

operations: array of n number of operations, each matching exactly one of:
"push x" where x is an integer and 0 <= x <= 100
"pop"
"top"
"getMin"
The next n lines contain the value of elements in the array.
At any point in the sequence, the number of "pop" operations performed so far must be strictly less than the number of preceding "push" operations (so that the stack is never empty when "pop", "top", or "getMin" is called).
Constraints

For each "push x" operation, 0 <= x <= 100 and x is an integer
Each entry in operations must match the pattern ^(push \d+|pop|top|getMin)$
pop, top, and getMin operations are only invoked when the stack is non-empty
Total number of push operations <= n where n is the length of operations array
Output Format

An integer array of length equal to the total number of "top" and "getMin" operations in the input
Sample Input 0

2
push 5
getMin
Sample Output 0

5
Sample Input 1

2
push 0
top
Sample Output 1

0*/


function processCouponStackOperations(operations) {
    // Write your code here
 const stack = [];
    const minStack = [];
    const result = [];

    for (let op of operations) {
        const parts = op.split(' ');

        if (parts[0] === 'push') {
            const value = parseInt(parts[1], 10);
            stack.push(value);

            if (minStack.length === 0 || value <= minStack[minStack.length - 1]) {
                minStack.push(value);
            }
        } 
        else if (parts[0] === 'pop') {
            const removed = stack.pop();
            if (removed === minStack[minStack.length - 1]) {
                minStack.pop();
            }
        } 
        else if (parts[0] === 'top') {
            result.push(stack[stack.length - 1]);
        } 
        else if (parts[0] === 'getMin') {
            result.push(minStack[minStack.length - 1]);
        }
    }

    return result;
}