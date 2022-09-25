## 1. 不一样的变量声明：const和let
## 2. 模板字符串    
## 3. 箭头函数（Arrow Functions）
## 4. 函数的参数默认值
## 5. Spread / Rest 操作符
    Spread：展开 \
    Rest: 剩余
## 6. 二进制和八进制字面量
    ES6 支持二进制和八进制的字面量，通过在数字前面添加 0o 或者0O 即可将其转换为八进制值：
```javascript
let oValue = 0o10;
console.log(oValue); // 8
 
let bValue = 0b10; // 二进制使用 `0b` 或者 `0B`
console.log(bValue); // 2
```
## 7. 对象和数组解构
## 8. 对象超类
    允许在对象中使用 super 方法：
```javascript
var parent = {
  foo() {
    console.log("Hello from the Parent");
  }
}
 
var child = {
  foo() {
    super.foo();
    console.log("Hello from the Child");
  }
}
 
Object.setPrototypeOf(child, parent);
child.foo(); // Hello from the Parent
             // Hello from the Child
```
## 9. for...of 
## 10. ES6中的类
    ES6 中支持 class 语法，不过，ES6的class不是新的对象继承模型，它只是原型链的语法糖表现形式。
## 11. Object.assign()：
    合并多个对象，第一个参数就是最终的返回值，如果对象的属性名相同，后面的覆盖前面的
## 12. Object.is()：
    判断两个值是否相等，返回布尔值
用途：es5中，对于0的判断不区分正负值，-0 == +0返回true，NaN == NaN返回 返回false；
Object.is()规避了这些问题
```javascript
    Object.is(+0, -0)//false
    Object.is(NaN, NaN) //true
```
## 13. Reflect： 封装操作对象的统一API
## 14. 生成器 generator
## 15. 数组新增方法：includes
## 16. 指数运算符
```javascript
console.log(2 ** 10) //1024
```
## 17. Object.values()，以数组的形式，返回对象所有的值
```javascript
let obj = {
    title: 'wwwww',
    age: 199
}
console.log(Object.values(obj)) //["wwwww", 199]
```
## 18. Object.entries()，以数组的形式，返回对象的所有键值对
```javascript
let obj = {
        title: 'wwwww',
        age: 199
      }
console.log(Object.entries(obj)) //[["title", "wwwww"],["age", 199]]
```
## 19. Object.getOwnPropertyDescriptor()
获取一个对象的完整描述信息，可用于将一个对象的get，set属性赋值给另一个对象
```javascript
      let obj = {
        firstName: 'abc',
        lastName: '123',
        get fullName () {
          return this.firstName + this.lastName
        }
      }
      console.log(obj.fullName) //abc123
      const p2 = Object.assign({}, obj)
      // 此时赋值给p2的仅仅是fullName属性的值，并没有fullName属性的getter
      p2.firstName = '456'
      console.log(p2.fullName)  //abc123

      const description = Object.getOwnPropertyDescriptors(obj)
      console.log(description)
      const p3 = Object.defineProperties({}, description);
      p3.firstName = '789'
      console.log(p3.fullName)  //789123
```
## 20. 字符串的padEnd()、padStart()方法
## 21. async/await

