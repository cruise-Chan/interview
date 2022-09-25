Function.prototype.myBind = function(obj) {
    var that = this
    arr = Array.prototype.splice.call(arguments,1)
    const newF =  function(){
        const args = [...arguments]
        if(this instanceof newF){  // 当使用new关键字时
            return that.apply(this,arr.concat(args))
        }else{
            return that.apply(obj,arr.concat(args))
        }
    }
    return newF
}


// 测试代码
function Person(a,b,c,d,e){
    console.log(this.name,a,b,c,d,e)
    return {
        name:this.name,
        a:a,b:b,c:c,d:d,e:e
    }
}
var obj = {
    name: '雪华'
}
const res = Person.bind(obj,1,2,3,4)
console.log(res,'res')
const ret = new res(5)
console.log(ret,'ret')