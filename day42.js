/*Queue from Two Stacks
Implement a queue using two stacks that supports enqueue, dequeue, peek, and size operations in amortized O(1) time. The queue must maintain FIFO order.

Example

Input

Q = 6
operations = ['enqueue', 'enqueue', 'peek', 'dequeue', 'size', 'dequeue']
values = [5, 3, 0, 0, 0, 0]
Output

[5, 5, 1, 3]
Explanation

We start with an empty queue. Use two stacks, inStack and outStack.

- enqueue(5): push 5 onto inStack. inStack=[5], outStack=[].
- enqueue(3): push 3 onto inStack. inStack=[5,3], outStack=[].
- peek(): since outStack is empty, transfer all from inStack to outStack: outStack=[3,5], inStack=[]. The front is outStack.top()=5. Record 5.
- dequeue(): outStack.top()=5, pop it. Now outStack=[3]. Record 5.
- size(): total elements = inStack.size()+outStack.size() = 0+1 = 1. Record 1.
- dequeue(): outStack.top()=3, pop it. Record 3. Collected results of non-enqueue operations in order: [5, 5, 1, 3].
Input Format

The first line contains an integer Q denoting the length of operations.
The next Q lines contain the elements of operations.
The next line contains an integer denoting the length of values.
The next n lines denote the elements of array values.
Constraints

0 <= Q <= 100000
operations.length == Q
values.length == Q
operations[i] ∈ {'enqueue','dequeue','peek','size'} for all 0 <= i < Q
0 <= values[i] <= 10^9 for all 0 <= i < Q
For every k in [1, Q]: count_enqueue(operations[0..k-1]) ≥ count_dequeue(operations[0..k-1])
For every k in [1, Q]: count_enqueue(operations[0..k-1]) - count_dequeue(operations[0..k-1]) ≥ count_peek(operations[0..k-1])
All 'dequeue' and 'peek' operations occur only when the queue is non-empty
Output Format

Return an integer array of length M, where M is the number of operations in the input that are 'dequeue', 'peek', or 'size'.
Sample Input 0

3
enqueue
enqueue
peek
3
5
10
0
Sample Output 0

5
Sample Input 1

2
enqueue
dequeue
2
7
0
Sample Output 1

7*/



function processRequestQueueOperations(operations, values) {
    const inStack = [];
    const outStack = [];
    const result = [];

    const moveIfNeeded = () => {
        if (outStack.length === 0) {
            while (inStack.length > 0) {
                outStack.push(inStack.pop());
            }
        }
    };

    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];

        if (op === 'enqueue') {
            inStack.push(values[i]);
        } 
        else if (op === 'dequeue') {
            moveIfNeeded();
            result.push(outStack.pop());
        } 
        else if (op === 'peek') {
            moveIfNeeded();
            result.push(outStack[outStack.length - 1]);
        } 
        else if (op === 'size') {
            result.push(inStack.length + outStack.length);
        }
    }

    return result;
}
