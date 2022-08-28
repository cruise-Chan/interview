function convertString(str){
    var res = str.replace(/[a-zA-Z]/g, function(a) {
        return /[a-z]/.test(a) ? a.toUpperCase(): a.toLowerCase();
    })
    return res
}
var string = 'AbcDefGh'
console.log(string,'初始字符串')
var res = convertString(string)
console.log(res,'取反字符串')