/*
      给定参数n,从1到n会有n个整数:1,2,3,...,n,
      这n个数字共有n!种排列.
    按大小顺序升序列出所有排列的情况,并一一标记,
    当n=3时,所有排列如下:
    "123" "132" "213" "231" "312" "321"
    给定n和k,返回第k个排列.

    输入描述:
      输入两行，第一行为n，第二行为k，
      给定n的范围是[1,9],给定k的范围是[1,n!]。
    输出描述：
      输出排在第k位置的数字。

    实例1：
      输入:
        3
        3 
      输出：
        213
      说明
        3的排列有123,132,213...,那么第三位置就是213

    实例2：
      输入
        2
        2
      输出：
        21
      说明
        2的排列有12,21，那么第二位置的为21
        5, 4     12453       // 5 * 4 * 3 * 2 = 120     24
        1     2 3 4 5        // 4 * 3 * 2 = 24         6
        2     3 4 5          // 3 * 2 = 6              2

        


        6, 5     123645


        10, 6    1 2 3 4 5 6 7 10 9 8
        

 */
getPermutation(3,2)
function getPermutation( n,  k) {
    let res="";
    const list = new Array;
    for(let i=0;i<n;i++){
        list.push(i+1);
    }
    var f = new Array(n);
    f[0]=1;
    k--;
    for(let i=1;i<n;i++) f[i]=f[i-1]*i;
    for(let i=n;i>=1;i--){
        let j= Math.floor(k/f[i-1]);
        k %= f[i-1]; 
        res += list[j];
        list.splice(j, 1);
    }
    console.log(res)
    return res;
}


