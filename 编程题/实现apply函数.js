Function.prototype.myApply = function(context, [...args]) {
    // 先判断context是否为空，如果为空则指向window对象
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
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

const res = Person.myApply(obj,[1,2,3,4])
console.log(res,'res')