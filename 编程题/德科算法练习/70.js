/*
  所谓的水仙花数是指一个n位的正整数其各位数字的n次方的和等于该数本身，
  例如153=1^3+5^3+3^3,153是一个三位数
  输入描述
      第一行输入一个整数N，
      表示N位的正整数N在3-7之间包含3,7
      第二行输入一个正整数M，
      表示需要返回第M个水仙花数
  输出描述
      返回长度是N的第M个水仙花数，
      个数从0开始编号，
      若M大于水仙花数的个数返回最后一个水仙花数和M的乘积，
      若输入不合法返回-1

  示例一：

      输入
       3
       0
      输出
       153
      说明：153是第一个水仙花数
   示例二：
      输入
      9
      1
      输出
      -1
   */
const N = 3
const M = 0
handle(N,M)
function handle(n, m) {
    let count = 0
    let start = Math.pow(10, n - 1)
    let end = Math.pow(10, n)
    for (let i = start; i < end; i++) {
       if(isFlower(i)){
           count ++
           console.log(i,'水仙花')
           if(count === m + 1){
                console.log(i,'第m个水仙花')
                return
           }
       }    
    }
    console.log(-1)
}
function isFlower(num){
    let arr = String(num).split('')
    let n = arr.length
    let sum = 0
    for(let i=0; i< n; i++){
        sum += Math.pow(arr[i], n)
    }
    return sum === num
}