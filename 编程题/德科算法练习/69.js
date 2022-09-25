/*
      游戏规则：输入一个只包含英文字母的字符串，
      字符串中的俩个字母如果相邻且相同，就可以消除。
      在字符串上反复执行消除的动作，
      直到无法继续消除为止，
      此时游戏结束。
      输出最终得到的字符串长度。

      输出：原始字符串str只能包含大小写英文字母，字母的大小写敏感，长度不超过100，
      输出游戏结束后字符串的长度

      备注：输入中包含非大小写英文字母是均为异常输入，直接返回0。

      事例：mMbccbc输出为3
       */
const str = 'mMbccbccdhhda'
handle(str)
function handle(str) {
    const reg = /![a-zA-Z]/
    if(reg.test(str)){
        console.log(0) 
        return
    }
    let arr = str.split('')
    const stack = []
    while(arr.length) {
        let s = arr.shift()
        if(stack[stack.length-1] === s){
            stack.pop()
        }else{
            stack.push(s)
        }
    }
    console.log(stack.length)
}