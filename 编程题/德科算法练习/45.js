/*
  给定一个正整数数组
  检查数组中是否存在满足规则的数组组合
  规则：
    A=B+2C
  输入描述
   第一行输出数组的元素个数
   接下来一行输出所有数组元素  用空格隔开
  输出描述
   如果存在满足要求的数
   在同一行里依次输出 规则里 A/B/C的取值 用空格隔开
   如果不存在输出0

   示例1：
     输入
     4
     2 7 3 0
     输出
     7 3 2
     说明：
      7=3+2*2
     示例2：
     输入
      3
      1 1 1
     输出
      0
      说明找不到满足条件的组合

      备注：
      数组长度在3~100之间
      数组成员为0~65535
      数组成员可以重复
      但每个成员只能在结果算式中使用一次
      如 数组成员为 [0,0,1,5]
      0出现两次允许，但结果0=0+2*0不允许  因为算式中使用了3个0

      用例保证每组数字里最多只有一组符合要求的解
   */


handle([2, 7, 3, 0])

function handle(arr) {
    for(let i=0; i<arr.length-2; i++) {
        for(let j=i+1; j < arr.length -1; j++){
            for(let k=j+1; k<arr.length; k++) {
                if(check(arr[i], arr[j], arr[k])){
                    return true
                }
            }
        }
    }
    console.log(0)
}


function check(a,b,c){
    if(a===b + 2 * c){
        console.log(a,b,c)
        return true
    }
    if(a === c + 2 * b){
        console.log(a,c,b)
        return true
    }
    if(b === a + 2 * c){
        console.log(b,a,c)
        return true
    }
    if(b === c + 2 * a){
        console.log(b,c,a)
        return true
    }
    if(c === b + 2 * a){
        console.log(c,b,a)
        return true
    }
    if(c === a + 2 * b){
        console.log(c,a,b)
        return true
    }
    return false
}