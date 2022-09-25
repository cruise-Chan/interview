# 1、Doctype作⽤? 严格模式与混杂模式如何区分？它们有何意义?
    <!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，但这并不是一个 HTML 标签。
# 2、如何实现浏览器内多个标签页之间的通信？
## 第一种方式：websocket协议.
1.首先我们得了解websocket是什么？
它是一种网络通信协议
2.为什么会用到websocket?
因为http有缺陷，通信只可以由客户端发起，服务器无法主动向客户端发送消息。
但如果这时，服务器有连续变化的状态，那么就只能使用轮询的方式来访问。
轮询：每隔一段时间，就发出一个询问.
因为websocket拥有全双工(full-duplex)通信自然可以实现多个标签页之间的通信.

## 第二种方式：localstorage
localstorage是浏览器多个标签共用的存储空间，所以可以用来实现多标签之间的通信
这里补充一点其他的：session是会话级的存储空间，每个标签页都是单独的
使用方式：直接在window对象上添加监听，以下为例子：
### 标签页1：
```javascript
<input id="name">  
<input type="button" id="btn" value="提交">  
<script type="text/javascript">  
    $(function(){    
        $("#btn").click(function(){    
            var name=$("#name").val();    
            localStorage.setItem("name", name);   
        });    
    });    
</script>
```
### 标签页2
```javascript
<script type="text/javascript">  
    $(function(){   
        window.addEventListener("storage", function(event){    
            console.log(event.key + "=" + event.newValue);    
        });     
    });  
</script>  
```
storage事件，针对都是非当前页面对localStorage进行修改时才会触发，当前页面修改localStorage不会触发监听函数。
## 第三种方式：html5浏览器的新特性SharedWorker
### 关于SharedWorker
    普通的webworker直接使用new Worker()即可创建，这种webworker是当前页面专有的。然后还有种共享worker(SharedWorker)，这种是可以多个标签页、iframe共同使用的。
    SharedWorker可以被多个window共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

### 使用方式
首先新建一个js文件worker.js，具体代码如下：
```javascript
// sharedWorker所要用到的js文件，不必打包到项目中，直接放到服务器即可
let data = ''
onconnect = function (e) {
  let port = e.ports[0]

  port.onmessage = function (e) {
    if (e.data === 'get') {
      port.postMessage(data)
    } else {
      data = e.data
    }
  }
}
```
webworker端(暂且这样称呼)的代码就如上，只需注册一个onmessage监听信息的事件，客户端(即使用sharedWorker的标签页)发送message时就会触发.
### 注意点
- 1.webworker无法在本地使用，出于浏览器本身的安全机制，所以我这次的示例也是放在服务器上的，worker.js和index.html在同一目录。
- 2.因为客户端和webworker端的通信不像websocket那样是全双工的，所以客户端发送数据和接收数据要分成两步来处理。示例中会有两个按钮，分别对应的向sharedWorker发送数据的请求以及获取数据的请求，但他们本质上都是相同的事件--发送消息。
- 3.webworker端会进行判断，传递的数据为'get'时，就把变量data的值回传给客户端，其他情况，则把客户端传递过来的数据存储到data变量中。下面是客户端的代码：
```javascript
// 这段代码是必须的，打开页面后注册SharedWorker
//显示指定worker.port.start()方法建立与worker间的连接
    if (typeof Worker === "undefined") {
      alert('当前浏览器不支持webworker')
    } else {
      let worker = new SharedWorker('worker.js')
      worker.port.addEventListener('message', (e) => {
        console.log('来自worker的数据：', e.data)
      }, false)
      worker.port.start()
      window.worker = worker
    }
// 获取和发送消息都是调用postMessage方法，我这里约定的是传递'get'表示获取数据。
window.worker.port.postMessage('get')
window.worker.port.postMessage('发送信息给worker')
```
## 第四种方式：HTML5的postMessage()

# 3、⾏内元素有哪些？块级元素有哪些？ 空(void)元素有那些？⾏内元 素和块级元素有什么区别？
- （1）行内元素有：a b span img input select strong（强调的语气）
- （2）块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
- （3）常见的空元素：<br> <hr> <img> <input> <link> <meta>
## 区别
- 1、行内元素与块级元素直观上的区别二、行内元素与块级元素的三个区别
    - 行内元素会在一条直线上排列（默认宽度只与内容有关），都是同一行的，水平方向排列。
    - 块级元素各占据一行（默认宽度是它本身父容器的100%（和父元素的宽度一致），与内容无关），垂直方向排列。块级元素从新行开始，结束接着一个断行。
- 2、块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素，只能包含文本或者其它行内元素。
- 3、行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效
## inline-block
    inline-block 的元素（如input、img)既具有 block 元素可以设置宽高的特性，同时又具有 inline 元素默认不换行的特性。当然不仅仅是这些特性，比如 inline-block 元素也可以设置 vertical-align（因为这个垂直对齐属性只对设置了inline-block的元素有效） 属性。
    HTML 中的换行符、空格符、制表符等合并为空白符，字体大小不为 0 的情况下，空白符自然占据一定的宽度，使用inline-block 会产生元素间的空隙。
# 4、简述⼀下src与href的区别？ 
## src
- src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。
- src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素
> 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部 
## href
- href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加
- 那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式