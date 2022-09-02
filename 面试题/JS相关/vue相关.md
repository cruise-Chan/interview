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
服务器提供的接口:https://www.exaple.com/server_new/login， 我们把域名提取出来如:https://www.exaple.com；

在config中新建一个文件命名为proxyConfig.js:
```javascript
module.exports = {
  proxy: {
        '/apis': {    //将www.exaple.com印射为/apis
            target: 'https://www.exaple.com',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
  }
}
```
> 如果本身的接口地址就有 '/api' 这种通用前缀，也就是说https://www.exaple.com/api，就可以把 pathRewrite 删掉。

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

localhost                   www.exaple.com            
```
此时我们已经完全解决了跨域问题，以及本地测试后台无法向我们本地环境设置cookie的情况了。