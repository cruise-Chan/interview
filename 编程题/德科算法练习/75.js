/**
 * 输入一串字符串
字符串长度不超过100
查找字符串中相同字符连续出现的最大次数

输入描述
  输入只有一行，包含一个长度不超过100的字符串

输出描述
  输出只有一行，输出相同字符串连续出现的最大次数

 说明：
   输出

 示例1：
   输入
     hello
   输出
     2

  示例2：
    输入
     word
    输出
     1

   示例3：
    输入
      aaabbc
     输出
      3

  字符串区分大小写
 */
let word = 'aaabbcddddddddrrr'
maxSame(word)
function maxSame(word){
    let left = 0,right = 1
    let maxlen = 1
    
    while(right < word.length) {
        let cur = word[left]
        if(word[right] === cur){
            right ++
        }else{
            maxlen = Math.max(maxlen, right - left)
            left = right
            right += 1
        }
    }
    console.log(maxlen)
}