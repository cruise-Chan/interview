const { Console } = require("console")

/*
  定义当一个字符串只有元音字母(a,e,i,o,u,A,E,I,O,U)组成,
  称为元音字符串，现给定一个字符串，请找出其中最长的元音字符串，
  并返回其长度，如果找不到请返回0，
  字符串中任意一个连续字符组成的子序列称为该字符串的子串

  输入描述：
    一个字符串其长度 0<length ,字符串仅由字符a-z或A-Z组成
  输出描述：
    一个整数，表示最长的元音字符子串的长度

  示例1：
    输入
      asdbuiodevauufgh
    输出
      3
    说明：
      最长的元音字符子串为uio和auu长度都为3，因此输出3
   */
let str = 'asdbuiodevauufghaeiou'
handle(str)
function handle(str) {
    const set = new Set(['a','e','i','o','u','A','E','I','O','U'])
    console.log(set, 'set')
    let left = 0
    let right = 0
    let max = 1
    while(right < str.length) {
        if(set.has(str[right])){
            max = Math.max((right - left), max)
        }else{
            left = right
        }
        right++
    }
    console.log(max)
}