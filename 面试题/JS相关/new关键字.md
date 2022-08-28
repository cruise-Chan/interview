## new的过程中发生了什么？
> - 创建一个新的空对象 {} 
> - 设置这个对象原型指向构造函数， 即上例中的obj.__proto = Person.prototype
> - 将创建的对象的原型指向构造函数的原型。
> - 返回新创建的对象（如果构造函数本身有返回值且是对象类型，就返回本身的返回值，否则返回新对象）。


## 手写new
```javascript
function _new(fn, ...arg) {
    // const obj = Object.create(fn.prototype); // 或者
    const obj = {};
    obj.__proto__ = Constructor.prototype  
    // 或者  Object.setPrototypeOf(obj, fn.prototype)
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```