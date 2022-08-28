// 暴力解法
var findSubString = (S, T) => {
    const n = S.length;
    const m = T.length;
    if(n<m){
        return -1
    }
    for (let i = 0; i < n; i++) {
        const s = S[i];
        const firstT = T[0];
        if(S[i] === firstT){
            for (let j = 0; j < m; j++) {
                const t = T[j];
                if(S[i + j] !== T[j] ){
                    break
                }
                if(S[i + m-1]===T[m-1]){
                    return i
                }
            }
        }
    }
    return -1
}
var s = 'dfghjkkkl'
var t = 'hj'
var index = findSubString(s,t)
console.log(index,'index')
const find = (S, T) => S.search(T)
const ret = find(s, t)
console.log(ret,'ret')

// TODO 贪心