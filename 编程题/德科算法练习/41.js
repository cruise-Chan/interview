

/*
给定参数n 从1到n会有n个整数 1，2，3，...n
这n个数字共有n!种排列 按大小顺序升序列出所有排列情况
并一一标记
当n=3时，所有排列如下
"123","132","213","231","312","321"
给定n和k 返回第n个排列

输入描述
第一行为n
第二行为k
n的范围是 1~9
k的范围是 1~n!

输出描述
输出排列第k位置的数字

示例一：
输入
3
3
输出
213

示例二:
输入
2
2
输出
21
    */


handle()
function handle() {

}
let set = new Set()

let n = 3
let k = 3
const arr = new Array(n);
for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
}
perm(arr, 0, n - 1);
const res = [...set][k-1]
console.log(res, 'res')

function perm(array, start, end) {

    if (start == end) {
        const num = Array.prototype.toString.call(array).replace(/\W+/g, "");
        set.add(num);
    } else {
        for (let i = start; i <= end; i++) {
            swap(array, start, i);
            perm(array, start + 1, end);
            swap(array, start, i);
        }
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}