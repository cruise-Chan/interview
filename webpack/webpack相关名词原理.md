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

