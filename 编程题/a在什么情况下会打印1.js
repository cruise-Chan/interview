// var a = [1,2,3];
// a.toString = a.shift
// if(a == 1 && a == 2 && a == 3){
//     console.log(1)
// }

var a = {num: 0};
a.valueOf = function(){
    return ++a.num;
}
if(a == 1 && a == 2 && a == 3){
    console.log(1)
}

// 迭代器的方式
let b = {
    gn:(function * (){
        yield 1;
        yield 2;
        yield 3;
    })(),
    valueOf(){
        return this.gn.next().value;
    }
}

if(b == 1 && b == 2 && b == 3){
    console.log(1,'迭代器')
}
var c = 0
// defineProperty 的 get方法 注意nodejs没有window
// Object.defineProperty(window, 'c' , {
//     get: function(){
//         return this.value += 1
//     }
// })

// if(a == 1 && a == 2 && a == 3){
//     console.log(1,'defineProperty')
// }