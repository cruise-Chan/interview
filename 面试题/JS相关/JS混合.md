
> ## 1、获取精度更高的时间
<ul>
    <li>浏览器使用 <font color="yellow">performance.now()</font> 可以获取到 <font color="yellow">performance.timing.navigationStart</font> 到当前时间的微妙数</li>
    <li>Node.js 使用 <font color="yellow">process.hrtime</font> 返回一个数组，其中第一个元素的时间以秒为单位，第二个元素为剩余的纳秒</li>
</ul>

> ## 2、获取首屏时间

 <ul>
    <li>H5如果页面首屏有图片</li>
    首屏h时间 = 首屏图片全部加载完毕的时刻 - performance.timing.navigationStart
    <li>如果页面首屏没有图片</li>
    首屏h时间 = performance.timing.domContentLoadedEnventStart = performance.timing.navigationStart
</ul>

## 静态变量
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