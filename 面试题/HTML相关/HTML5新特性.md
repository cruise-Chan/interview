## 1、postMessage
### postMessage的定义
    postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案.
###  postMessage API介绍
#### 发送数据: 
```javascript
    otherWindow.postMessage(message, targetOrigin, [transfer]);
```
#### otherWindow

    窗口的一个引用,比如iframe的contentWindow属性,执行window.open返回的窗口对象,或者是命名过的或数值索引的window.frames.

#### message
    要发送到其他窗口的数据,它将会被[结构化克隆算法]序列化.这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化.
#### targetOrigin
    通过窗口的origin属性来指定哪些窗口能接收到消息事件,指定后只有对应origin下的窗口才可以接收到消息,设置为通配符"*"表示可以发送到任何窗口,但通常处于安全性考虑不建议这么做.如果想要发送到与当前窗口同源的窗口,可设置为"/"

#### transfer | 可选属性
    是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权.

#### 接收数据: 监听message事件的发生
```javascript
window.addEventListener("message", receiveMessage, false) ;
function receiveMessage(event) {
     var origin= event.origin;
     console.log(event);
}
```
这里重点介绍event对象的四个属性
- data :   指的是从其他窗口发送过来的消息对象;
- type:   指的是发送消息的类型;
- source:   指的是发送消息的窗口对象;
- origin: 指的是发送消息的窗口的源

### postMessage的使用场景
#### 场景一 跨域通信(包括GET请求和POST请求)
     我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.而postMessage都可以.

#### 场景二  WebWorker
    JavaScript语言采用的是单线程模型,通常来说,所有任务都在一个线程上完成,一次只能做一件事,后面的任务要等到前面的任务被执行完成后才可以开始执行,但是这种方法如果遇到复杂费时的计算,就会导致发生阻塞,严重阻碍应用程序的正常运行.Web Worker为web内容在后台线程中运行脚本提供了一种简单的方法,线程可以执行任务而不干扰用户界面.一旦创建,一个worker可以将消息发送到创建它的JavaScript代码,通过消息发布到改代码指定的事件处理程序.

    一个woker是使用一个构造函数创建一个对象,运行一个命名的JavaScript文件-这个文件将包含在工作线程中运行的代码,woker运行在另一个全局上下文中,不同于当前的window,不能使用window来获取全局属性.

一些局限性
- 只能加载同源脚本文件,不能直接操作DOM节点

- Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求

- 无法读取本地文件,只能加载网络文件

- 也不能使用window对象的默认方法和属性,然而你可以使用大量window对象之下的东西,包括webSocket,indexedDB以及FireFoxOS专用的DataStore API等数据存储机制

### 场景三  Service Worker
Service Worker是web应用做离线存储的一个最佳的解决方案,Service Worker和Web Worker的相同点是在常规的js引擎线程以外开辟了新的js线程去处理一些不适合在主线程上处理的业务,不同点主要包括以下几点:

- Web Worker式服务于特定页面的,而Service Worker在被注册安装之后能够在多个页面使用

- Service Worker常驻在浏览器中,不会因为页面的关闭而被销毁.本质上,它是一个后台线程,只有你主动终结,或者浏览器回收,这个线程才会结束.

- 生命周期,可调用的API也不同

我们可以使用Service Worker来进行缓存,用js来拦截浏览器的http请求,并设置缓存的文件,从而创建离线web应用.


## 1.语义化标签
|  标签   | 描述  |
|  ----  | ----  |
| header  | 定义了文档的头部区域 |
| footer  | 定义了文档的尾部区域  |
| nav  | 定义文档的导航  |
| section  |  定义文档中的节  |
| article  |  定义文章  |
| aside  | 定义页面以外的内容  |
| details  | 定义用户可以看到或者隐藏的额外细节  |
| summary  | 标签包含details元素的标题   |
| dialog  | 定义对话框   |
| figure  | 定义自包含内容，如图表  |
| main  | 定义文档主内容  |
| mark  | 定义文档的主内容  |
| time  | 定义日期/时间  |
## 2.增强型表单包括属性以及元素

## 3.新增视频<video>和音频<audio>标签

## 4.Canvas 图形

## 5.地理定位
navigator.geolocation
## 6.拖放API

## 7.SVG绘图
什么是SVG?

- SVG指可伸缩矢量图形

- SVG用于定义用于网络的基于矢量的图形

- SVG使用XML格式定义图形

- SVG图像在放大或改变尺寸的情况下其图形质量不会有损失

- SVG是万维网联盟的标准

SVG的优势

与其他图像格式相比，是哟个SVG的优势在于：

- SVG图像可通过文本编译器来创建和修改

- SVG图像可被搜索、索引、脚本化或压缩

- SVG是可伸缩的

- SVG图像可在任何的分辨率下被高质量的打印

- SVG可在图像质量不下降的情况下被放大

 | Canvas | 	SVG | 
 |  ----  | ----  |
 | 依赖分辨率 | 	不依赖分辨率 | 
 | 不支持事件处理器 | 	支持事件处理器 | 
 | 能够以.png或.jpg格式保存结果图像 | 	复杂度会减慢搞渲染速度 | 
 | 文字呈现功能比较简单 | 	适合大型渲染区域的应用程序 | 
 | 最合适图像密集的游戏 | 	不适合游戏应用 | 
## 8.Web Worker

## 9.Web Storage
    就是sessionStorage 和 localStorage 
## 10.Web Socket