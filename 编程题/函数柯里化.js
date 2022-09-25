// 计算function(1)(2)(3)(4)(5)(6)  输出和 21   该方法一些浏览器不支持
// function add(){
//     let args = Array.prototype.slice.call(arguments)
//     let inner = function () {
//         args.push(...arguments);
//         return inner
//     }
//     inner.toString = function(){
//         return args.reduce( function (prev, cur){
//             return prev + cur
//         })
//     }
//     return inner;

// }
const curry_add = (a) => {
    let num = a || 0
    const item = (b) => {
        num+= b
        item.value = num // 将 num 赋到函数上
        return item
    }
    item.value = num
    return item
}
const result = curry_add(1).value
console.log(result)