/*
给定一个字符串S

变化规则:
交换字符串中任意两个不同位置的字符

输入描述：
一串小写字母组成的字符串
输出描述：
按照要求变换得到最小字符串

实例1：
输入：、
abcdef
输出
abcdef

实例2：
输入
bcdefa
输出
acdefb

s都是小写字符组成
1<=s.length<=1000
*/
var longStr = ''
var str = 'bcdefaujrnsljsfirsfsdgdfhfhfjzdmbcdefaujrnsljsfirsfsdgdfhfhfjzdmbcdefaujrnsljsfirsfsdgdfhfhfjzdmsfgs'
for(let i=0; i< 100;i++){
    longStr += str
}
handle(longStr)
function handle(str) {
    let arr = str.split('')
    console.log(arr,'arr')
    let minString = arr;
    let len = str.length
    for(let i=0; i< len - 1; i++) {
        for(let j=i+1;j<len;j++){
            var scopedList = [...arr]
            swap(scopedList, i, j)
            if(!compare(scopedList, minString)){
                minString = scopedList
            }
        }
    }
    console.log(minString.toString())
}

function swap(list, a, b){
    [list[a], list[b]] = [list[b], list[a]]
}
function compare(list1,list2){
    let i = 0
    while(i<list1.length){
        if(list1[i] > list2[i]){
            return true
        }else {
            return false
        }
        i++
    }
    return false
}