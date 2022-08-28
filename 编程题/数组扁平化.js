var arr = [[1,2,3],[3,4,5,5,],[6,7,8,9,[11,12,[12,13,[14]]]],10]
let result = '';
let set = new Set(arr.toString().split(',').sort((a,b)=>a-b).map(Number))
result = Array.from(set);
console.log(result,'result')
