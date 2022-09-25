# Loader
## loader 概念
    帮助 webpack 将不同类型的文件转化为 webpack 可识别的模块
## loader 执行顺序
### 1、分类
- pre：前置 loader
- normal：普通 loader
- inline： 内联 loader
- post：后置 loader

### 2、执行顺序
- 4类 loader 的优先级为： pre > normal > inline > post。
- 相同优先级的执行顺序：从右到左，从下到上。

### 3、使用的方式
通过 enforce 来配置类型来改变优先级
```javascript
{
    enforce: 'pre',   // 可配置 pre、normal、post
    loader: 'loader1'
}
```
内联方式：在每个 import 语句中显式指定 loader。（inline loader）

    import Style from style-loader!(css-loader?modules)./style.css ;

含义：
- 使用 css-loader 和 style-loader 处理 style.css 文件。
- 通过 ! 将资源中的 loader 分开。

inline-loader 可以通过添加不同前缀，跳过其他类型 loader。
- ! 跳过 normal loader。
- -! 跳过 pre 和 normal loader。
- !! 跳过其他三种 loader。


# 开发一个 Loader
## myLoader.js 文件
```javascript
/**
 * loader 就是一个函数
 * 当 webpack 解析资源时，会调用相应的 loader 去处理
 * loader 接收到文件内容作为参数，返回内容出去
 *   content: 文件内容
 *   map：source-map
 *   meta：别的 loader 传递的数据
 * 
 */
module.export = function (content, map, meta){
    

    return content
}
```

## loader 分类

### 1、同步 loader

```javascript
module.exports = function (content, map, meta){
    // return content    // 可以直接 return content
    /**
     *  第一个参数为 错误信息 
    */
    this.callback(null,content, map, meta)   // 也可以通过回调
}
```
### 2、异步 loader

```javascript
module.exports = function (content, map, meta){
    const callback = this.async();
    setTimeout(()=>{
        callback(null,content, map, meta)
    })
}
```


### 3、Raw loader
接收到的 content 是一个 Buffer 二进制数据流
 - 用于处理图片、图标等。
```javascript
module.exports = function (content, map, meta){
    const callback = this.async();
    setTimeout(()=>{
        callback(null,content, map, meta)
    })
}
module.exports.raw = true
```

### 4、Pitching loader
pitch 方法从左到右执行然后从右到左执行 loader 方法\
return 会跳到上一个loader
```javascript
module.exports = function (content, map, meta){
    
    return content
}
module.exports.pitch = function() {

}
```
## Loader api
| 方法名  | 含义  | 用法  |
| :--- | :--- | :--- |
| this.async  | 异步回调 loader。返回this.callback | const callback = this.async()  |
| this.callback | 可以同步或者异步调用并返回多个结果的函数 | this.callback(err,content,sourceMap?,meta?) |
| this.getOptions(schema) | 获取 loader 的 options | this.getOptions(schema) |
| this.emitFile | 产生一个文件 | this.emitFile(name, content, sourceMap) |
| this.utils.contextify | 返回一个相对路径 | this.utils.contextify(context, request) |
| this.utils.absolutify | 返回一个绝对路径 | this.utils.absolutify(context, request) |


