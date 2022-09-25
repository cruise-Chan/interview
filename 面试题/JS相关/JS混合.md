
# 1、获取精度更高的时间
<ul>
    <li>浏览器使用 <font color="yellow">performance.now()</font> 可以获取到 <font color="yellow">performance.timing.navigationStart</font> 到当前时间的微妙数</li>
    <li>Node.js 使用 <font color="yellow">process.hrtime</font> 返回一个数组，其中第一个元素的时间以秒为单位，第二个元素为剩余的纳秒</li>
</ul>

# 2、获取首屏时间

 <ul>
    <li>H5如果页面首屏有图片</li>
    首屏h时间 = 首屏图片全部加载完毕的时刻 - performance.timing.navigationStart
    <li>如果页面首屏没有图片</li>
    首屏h时间 = performance.timing.domContentLoadedEnventStart = performance.timing.navigationStart
</ul>

# 静态变量
###  1、作用
- 隐藏与隔离的作用
- 保持变量内容的持久性

## 微任务和宏任务
- 微任务
  > promise.then()  
  > MutationObserver  
  > process.nextTick  
  > async/await   
  > Object.observe

# 事件冒泡和事件捕获
## 阻止事件冒泡
    event.propagation()
## 组织默认行为
    event.preventDefault()

# 阻止a标签的默认行为
```javascript
<a href="javascript:void(0);"></a>

// 或者

<a href="www.baidu.com" onclick="return false;"></a>

// or

<a href="##"></a>
<a href="#!"></a>
```
 或者：e.preventDefault();阻止默认事件(不支持IE)，IE中用window.event.returnValue = false; 阻止默认事件


 # 函数的调用方式
 - 1、一般形式的函数调用
 - 2、作为函数的方法调用
 - 3、使用 call 和 apply 动态调用
 - 4、new 命令间接调用

 # this绑定的优先级
    new > 显示绑定 > 隐式绑定 > 默认绑定

# JS 整数是怎么表示的？ 
## Number类型
JavaScript内部，所有数字都是以64位浮点数形式存储，即使整数也是如此。所以1与1.0是相同的。

## Number类型的表示范围
根据国际标准 IEEE 754，JavaScript 浮点数的64个二进制位。
第一部分（最左）：用来存储符号位（sign），第1位：符号位，0表示正数，1表示负数。
第二部分（中间）：用来存储指数（exponent），第2位到第12位：指数部分。
第三部分（右边）：用来存储指数小数（fraction），第13位到第64位：小数部分（及有效数字）。

## 整数的表示范围
```javascript
   Math.pow(2,53)-1  //最大
   Number.MAX_SAFE_INTEGER // 常数表示
   -(Math.pow(2,53)  - 1) // 最大
   Number.MIN_SAFE_INTEGER // 常数表示
```

# Number() 的存储空间是多大？如果后台发送了一个超过最大自己的数字怎么办
    Number类型的最大值为2的53次方，即9007199254740992，如果超过这个值，比如900719925474099222，那么得到的值会不精确，也就是900719925474099200

