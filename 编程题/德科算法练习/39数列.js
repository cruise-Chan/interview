/*
    有一个数列A[n]
    从A[0]开始每一项都是一个数字
    数列中A[n+1]都是A[n]的描述
    其中A[0]=1
    规则如下
    A[0]:1
    A[1]:11 含义其中A[0]=1是1个1 即11
    表示A[0]从左到右连续出现了1次1
    A[2]:21 含义其中A[1]=11是2个1 即21
    表示A[1]从左到右连续出现了2次1
    A[3]:1211 含义其中A[2]从左到右是由一个2和一个1组成 即1211
    表示A[2]从左到右连续出现了一次2又连续出现了一次1
    A[4]:111221  含义A[3]=1211 从左到右是由一个1和一个2两个1 即111221
    表示A[3]从左到右连续出现了一次1又连续出现了一次2又连续出现了2次1

        输出第n项的结果
        0<= n <=59
        输入描述：
        数列第n项   0<= n <=59
        4
        输出描述
        数列内容
        111221

        1
        11
        21
        1211
        111221
    */

var n = 5
// handle(n)
// function handle(n) {
//     let ans = ''
//     let start = 0
//     for(let i=0;i<n;i++){
//         if(i===0){
//             ans = '1'
//         }
//     }

// }
var result = fn(n)
function fn(n){
    if(n==0) return '1'
    var c = fn(n-1)
    let tmp = ''
    let res = ''
    let count = 0
    for(let i=0; i < c.length; i++){
        if(i===0){
            tmp = c[0]
            count = 1
            continue
        }
        if(c[i]==c[i-1]){
            count++
        }else{
            res += (count + tmp)
            tmp = c[i]
            count = 1
        }
    }
    res += (count + tmp)
    return res
}
console.log(result,'result')