/*
  小组中每位都有一张卡片
  卡片是6位以内的正整数
  将卡片连起来可以组成多种数字
  计算组成的最大数字

  输入描述：
    ","分割的多个正整数字符串
    不需要考虑非数字异常情况
    小组种最多25个人

   输出描述：
     最大数字字符串

   示例一
     输入
      22,221
     输出
      22221

    示例二
      输入
        4589,101,41425,9999
      输出
        9999458941425101
   */


handle([22,221])
function handle(arr) {
    const res = arr.sort((a,b)=>{
        const num1 = Number(''+ a + b)
        const num2 = Number('' + b + a)
        console.log(num1, num2)
        if(num1 > num2){
            return -1
        }else{
            return 1
        }
    })
    console.log(res.join(''))
}