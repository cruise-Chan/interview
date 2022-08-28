var longestCommonPrefix = function(strs){
    if(strs === null || strs.length === 0) return "";
    if(strs.length === 1) return strs[0];
    let min = 0, max = 0;
    for (let i = 0; i < strs.length; i++) {
        if(strs[min] > strs[i]) min = i;
        if(strs[max] < strs[i]) max = i;
    }
    
    console.log('flower' > 'flow','比较')
    console.log('flower' > 'flight','比较')
    console.log('flight' > 'flow','比较')
    for (let j = 0; j < strs[min].length; j++) {
        if(strs[min].charAt(j) !== strs[max].charAt(j)){
            return strs[min].substring(0,j)
        }    
    }
    return strs[min]
}
var list = ["flower", "flow", "flight"]
var result = longestCommonPrefix(list);
console.log(result)