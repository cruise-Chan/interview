# 1、vue的响应式原理


# 2、vue-cli本地环境API代理设置和解决跨域
原文地址：https://segmentfault.com/a/1190000011007043

    我们在使用vue-cli启动项目的时候npm run dev便可以启动我们的项目了，通常我们的请求地址是以localhost:8080来请求接口数据的，localhost是没有办法设置cookie的

    我们可以在vue-cli配置文件里面设置一个代理，跨域的方法有很多，通常需要后台来进行配置。我们可以直接通过node.js代理服务器来实现跨域请求。

## 2.1 vue proxyTable接口跨域请求调试
在vue-cli项目中的config文件夹下的index.js配置文件中做如下配置：
```javascript
dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},   
    cssSourceMap: false
  }
```
服务器提供的接口:https://www.example.com/server_new/login， 我们把域名提取出来如:https://www.example.com；

在config中新建一个文件命名为proxyConfig.js:
```javascript
module.exports = {
  proxy: {
        '/apis': {    //将www.example.com印射为/apis
            target: 'https://www.example.com',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
  }
}
```
> 如果本身的接口地址就有 '/api' 这种通用前缀，也就是说https://www.example.com/api，就可以把 pathRewrite 删掉。

config文件夹下的index.js引入proxyConfig.js：
```javascript
var proxyConfig = require('./proxyConfig')
```
config文件夹下的index.js中的dev改成:
```javascript
dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyConfig.proxy,
    cssSourceMap: false
  }
  ```
最后重启项目，本地API代理就设置好了

## 2.2 修改本地host文件
window文件路径一般是C:\Window\System32\drivers\etc，mac则直接前往文件夹/etc/hosts，打开hosts文件，在这一段下面把localhost设置进去
```javascript
# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost
127.0.0.1                   activate.adobe.com
127.0.0.1                   practivate.adobe.com
127.0.0.1                   lmlicenses.wip4.adobe.com
127.0.0.1                   lm.licenses.adobe.com
127.0.0.1                   na1r.services.adobe.com
127.0.0.1                   hlrcv.stage.adobe.com

localhost                   www.example.com            
```
此时我们已经完全解决了跨域问题，以及本地测试后台无法向我们本地环境设置cookie的情况了。


# 3、vue.use()
- use传入的参数对象需要提供install方法
- install方法可以接受到vue实例
- 如用来全局注册组件
```javascript
    function install(Vue){
      Vue.component(组件名称,组件)
    }
```

# 4、vue执行过程

- 1、第一步：new Vue的时候执行构造函数，传入option对象 

- 2、第二步：执行Observer(this.$data), “观察”data的属性变量

- 3、第三步：执行Compile()函数解析HTML模版
  - 将获取到的dom对象绑定到vm实例上
  - 放入临时区域(碎片文档)fragment = document.createDocumentFragment()
  - 将$el的childNodes 循环加入到fragment
  - 匹配文本节点nodeType===3
  - 替换文本内容 (此时需要进行订阅 new Watcher() )
  - 将替换后的frgment用appendChild添加到$el浏览器执行渲染流程
  - 

- 4、完成模版字符串替换后修改数据还不能及时更新视图，此时需要引入发布-订阅模式

- 5、依赖收集---收集和通知订阅者 (发布)
  - 创建Dependency 类
  - 收集订阅 addSub( sub ) 参数即为一个订阅者
  - 存放订阅内容 subscribers = []
  - 通知订阅者的方法notify() 清空subscribers队列，让每一个订阅者执行更新操作 sub.update()

- 6、订阅者 Watcher 类
  - Watcher 构造函数保存vm以及订阅者的“标识”也就是data上的属性(比如message.name)，以及callbacks存放订阅者订阅的内容（如更新对应的dom）

  - 提供一个update方法 

- 7、依赖收集
  - 解析模版的时候解析到变量，此时需要new Watcher 记录需要执行的操作

  - new Wather的时候通过Dependency类创建一个临时变量temp 来保存 当前创建的 Wather 实例

  - 如何通知Dependency进行依赖搜集？ 通过访问watcher对应的属性来触发getter

  - reduce方法传入vm.$data来访问watcher的key，从而触发getter

  - 在new Obsever的时候创建Dependency实例

  - 触发getter的时候检查有没有watcher，有的话进行依赖搜集，即：执行dependency.addSub(watcher)

  - 何时发布？setter函数被触发的时候调用dependency实例的notify方法进行发布：dependency.notify()

  - notify 通知发布的时候的值是如何传递的呢？
    - new Watcher的时候会保存触发setter的 key 。
    - notify 通知订阅者wather的时候会执行update方法
    - 此时通过绑定在watcher实例上的key结合vm.$data来获取value，注意setter被触发的时候已经将vm.$data的值更新了

此时已经完成数据更新试图的操作

接下来实现通过视图修改数据（比如input输入内容时）

# 试图驱动数据
- 1、compile解析模版的时候匹配v-model相关节点（nodeType===1）
    - nodeName为v-model时的nodeValue就是需要变化的值
    - 此时输入框就会同步nodeValue值
    - 此处也应该创建一个订阅者watcher，watcher的回调函数会接收到新的值

  2、何时发布？（何时通知数据变化？）
    - compile解析模版的时候解析到input节点，用addEventListener监听input事件
    - 通过e.target.value 获取到input输入的值
    - 获取到的值赋值给对应的

## observer方法
### 定义：观察者，通过Object.defineProperty()对每一个属性进行递归监听
```javascript
function Observer(obj){
   // 递归监听obj的value值
   // 触发setter的时候还要递归监听value值
}
```
## vue渲染流程
### 获取页面元素 —> 放入临时的内存区域 —> 应用vue数据 —> 渲染页面

临时区域指的是：createDocumentFragment

## compile解析函数
```javascript
function Compile(element, vm){
  vm.$el = document.querySelector(elment);
}
```


# 解决前端404问题
在配置文件做如下配置
```javascript
module.export = {
  // ...
  devServer: {
    historyApiFallback: true
  }
}
```