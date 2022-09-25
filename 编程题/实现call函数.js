// 实现1
Function.prototype.newCall = function(obj){
    var obj = obj || window
    obj.p = this
    const newArguments = Array.prototype.splice.call(arguments,1)
    const result = obj.p(...newArguments)  // 返回的是p函数执行结果而不是obj对象
    delete obj.p
    return result
}



// 测试代码
function Person(a,b,c,d){
    console.log(this.name,a,b,c,d)
    return {
        name:this.name + 'xxx',
        a:a,b:b,c:c,d:d
    }
}
var obj = {
    name: '雪华'
}

const res = Person.newCall(obj,1,2,3,4)
console.log(res,'res')