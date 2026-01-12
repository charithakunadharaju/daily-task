/*Maximize Revenue from Video Streams with Bandwidth Limit
Given N video streams with size[i] MB and revenue[i] dollars each, and bandwidth limit B, return the maximum revenue achievable. Streams can be partially delivered for proportional revenue.

Examples
Example 1

Input:

N = 3
sizes = [10, 20, 30]
revenues = [60, 100, 120]
B = 50
Output:

240.0
Explanation:
Compute revenue per MB for each stream: [60/10=6, 100/20=5, 120/30=4].
Sort by density descending.
Take full 10 MB of stream 0 for 60, remaining bandwidth 40.
Take full 20 MB of stream 1 for 100, remaining 20.
Take 20 MB of stream 2 (fraction 20/30) for 120*(20/30)=80.
Total revenue = 60 + 100 + 80 = 240.0.
Example 2

Input:

N = 5
sizes = [5, 10, 15, 22, 25]
revenues = [30, 60, 90, 88, 100]
B = 70
Output:

340.0
Explanation:

Compute densities: [30/5=6, 60/10=6, 90/15=6, 88/22=4, 100/25=4].
Streams 0,1,2 have highest density 6.
Allocate full 5+10+15=30 MB for revenue 30+60+90=180, remaining B=40.
Next highest density streams are 3 and 4 (density 4).
Allocate full 22 MB of stream 3 for 88, remaining B=18.
Allocate 18 MB of stream 4 fractionally: 100*(18/25)=72.
Total revenue = 180 + 88 + 72 = 340.0.
Input Format

The first line contains a single integer, N.
The second line contains an integer, sizes_count, representing the number of elements in the sizes list.
The next sizes_count lines each contain a single integer for the sizes list. If sizes_count is 0, these lines are omitted.
The following line contains an integer, revenues_count, representing the number of elements in the revenues list.
The next revenues_count lines each contain a single integer for the revenues list. If revenues_count is 0, these lines are omitted.
The final line contains a single integer, B.
Input:

10
4
2
5
8
10
4
50
120
200
210
1000
Explanation:

N = 10
sizes_count = 4
sizes = [2, 5, 8, 10]
revenues_count = 4
revenues = [50, 120, 200, 210]
B = 1000
Constraints

0 <= N <= 100000
sizes.length == N
revenues.length == N
1 <= sizes[i] <= 1000000 for all 0 <= i < N
0 <= revenues[i] <= 1000000 for all 0 <= i < N
0 <= B <= 10^12
All inputs are integers
Output Format

Return a single floating-point number denoting the maximum revenue that can be earned by distributing up to B MB of bandwidth among the streams, allowing fractional delivery.
Sample Input 0

3
3
5
10
15
3
100
200
300
0
Sample Output 0

0.0
Sample Input 1

4
4
1
2
3
4
4
10
20
30
40
10
Sample Output 1

100.0*/

function allocateBandwidthMaxRevenue(N, sizes, revenues, B) {
    // Write your code here
     N = Math.min(sizes.length, revenues.length);

    if (N === 0 || B === 0) {
        return 0.0;
    }

    let streams = [];

    for (let i = 0; i < N; i++) {
        streams.push({
            size: sizes[i],
            revenue: revenues[i],
            density: revenues[i] / sizes[i]
        });
    }

    
    streams.sort((a, b) => b.density - a.density);

    let remainingBandwidth = B;
    let totalRevenue = 0.0;

    for (let i = 0; i < N && remainingBandwidth > 0; i++) {

        if (streams[i].size <= remainingBandwidth) {
            totalRevenue += streams[i].revenue;
            remainingBandwidth -= streams[i].size;
        } else {
            let fraction = remainingBandwidth / streams[i].size;
            totalRevenue += streams[i].revenue * fraction;
            break;
        }
    }

    return totalRevenue;

}