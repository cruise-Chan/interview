// // 定义一个全局作用域变量：
// const myName = "Oluwatobi";

// // 在函数体内调用myName变量
// function getName() {
//     const myName = 'xxx'
//     function getXXX(){
//         return myName;
//     }
//     return getXXX()
// }

// console.log(getName()) // 'Oluwatobi'
console.log(1)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
setTimeout(function(){
    console.log(4);
})
console.log(2)