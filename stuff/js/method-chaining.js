[1, 2, 3].reverse().join('-')
// '3-2-1'
[1, 2, 3].reverse().concat(0, -1, -2, -3)
// (7) [3, 2, 1, 0, -1, -2, -3]
[1, 2, 3].reverse().concat(0, -1, -2, -3).join(';')
// '3;2;1;0;-1;-2;-3'