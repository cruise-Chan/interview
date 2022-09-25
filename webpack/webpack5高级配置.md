# 1、source-map

- 开发模式配置
    - 优点：打包速度较快，映射行
    - 缺点：不映射列
```javascript
module.export = {
    mode: 'development',
    devtool: 'cheap-module-source-map'
}
```
- 生产模式配置
    - 优点： 映射行/列
    - 缺点：构建速度较慢
```javascript
module.export = {
    mode: 'production',
    devtool: 'source-map'  
}
```

# 2、HotModuleReplacement（热模块替换）
webpack5 默认开启
```javascript
module.export = {
    // 其他省略
    devServer: {
        hot: true  // 开启热模块替换（只能用于开发环境，生产环境不需要）
    }
}

```
- 默认支持style样式的热模块替换功能
- js 的热模块替换需要额外做配置

main.js
```javascript
if(module.hot) { // 判断是否支持热模块替换功能
    module.hot.accept('js文件相对路径')
}
```
> vue-loader 已经做了相应的配置

# 3、OneOf
## 为什么？
    打包时每个文件都会经过 loader 处理，虽然因为 test 正则原因实际上没有处理上，但是都要过一遍。比较慢。
## 是什么
    顾名思义就是只能匹配上一个 loader，剩下的就不匹配了。

## 怎么用

```javascript
module.export = {
    // 其他省略
    module: {
        relus: [
            {
                // 每个文件只能被其中一个loader处理
                oneOf: [
                    // 各种loader
                ]
            }
        ]
    }
}

```
# 4、Include / Exclude
要么包含，要么排除，只能使用其中一个，同时用会报错
## 用法
```javascript
module.export = {
    // 其他省略
    module: {
        relus: [
            {
                test: /\.js$/,
                // exclude: /node_modules/, // 排除node_modules文件夹下的js文件
                include: path.resolve(__dirname,'./src') // 指出路src下的文件
                loader: 'buble-loader'
            }
        ]
    }
}

```

# 4、Cache

## 为什么
    每次打包都需要经过 eslint 检查和 buble 编译，速度比较慢
    我们可以缓存之前的 Eslint 检查和 Buble 编译结果。

## 怎么用
```javascript
module.export = {
    // 其他省略
    module: {
        relus: [
            {
                test: /\.js$/,
                loader: 'buble-loader',
                options: {
                    cacheDirectory: true,  // 开启 bable 缓存
                    cacheCompression: false  // 关闭缓存文件的压缩
                }
            }
        ]
    },
    plugins: [
        new ESlintPlugin({
            // 检测哪些文件
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules', // 默认值
            cache: true,   // 开启缓存
            cacheLocation: path.resolve(    // 指定缓存路径 
                _dirname,
                '../node_modules/.cache/eslintcache'  
            )
        })
    ]
}

```

# 5、Thread
    多进程打包
    主要针对eslint、bable、Terser（压缩js文件） 三个工具

## 是什么
    多进程打包：开启电脑的多个进程同时干一件事，速度更快。
> 需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右的开销

## 怎么用
我们启动进程的数量就是 CPU 的核数
### 1、如何获取 CPU 核数
```javascript
// nodejs 核心模块，直接使用
const os = require('os');
// cpu 核数
const threads = os.cpus().length;
```
### 2、下载包
```javascript
    npm i thread-loader -D
```
### 3、使用
```javascript
    const os = require('os');
    const path = require('path');

    // 配置 loader 的地方
    {
        use: [
            {
                loader: 'thread-loader', // 开启多进程
                options: {
                    works: threads, // 进程数量
                }
            }
        ]
    } 

    // 在 mode 配置项统计配置 optimization
    {
        optimization: {
            // 压缩的操作
            minimizer: [
                // 压缩 css
                new CssMinimizerPlugin(),
                // 压缩js
                new TerserWebpackPlugin({
                    parallel: threads, // 开启多进程和设置进程数量
                })
            ]
        }
    }
    
```
# 减少代码体积
## 1、Tree Sharking  
### 为什么
    开发时定义的工具函数库或者引入的第三方工具函数如果没有特殊处理就会引入整个库，而实际上我们可能只用上了极少部分功能

### 是什么
    Tree Sharking 是一个术语，通常用于描述移除 Javascript 中没有使用上的代码。
    注意：它依赖 ES Module。

### 怎么用
    webpack 默认开启了这个功能，无需其他配置

## 2、Bable
### 为什么
    bable 为编译的每个文件都插入了辅助代码，使代码体积过大！
    Bable 为一些公共方法使用了非常小的辅助代码， 比如 _extend。
    可以将这些辅助代码作为一个独立模块，来避免重复引入。
### 是什么
<font color="yellow">@bable/plugin-transform-runtime</font>: 禁用了 Bable 自动对每个文件的 runtime 注入，而是引入。\
并且使所有代码从这里引入

### 怎么用
#### 1、下载包
```javascript
    npm i @bable/plugin-transform-runtime -D
```
#### 2、配置
在 bable-loader 的 options 里面添加plugins
```javascript
    {
        plugins: ["bable/plugin-transform-runtime"]
    }
```

## image minimizer
本地静态图片才需要压缩
    
    image-minimizer-webpack-plugin

### 怎么用
#### 1、下载包
```javascript
    npm install image-minimizer-webpack-plugin imagemin -D
```
还有剩下包需要下载，有两种模式
- 无损压缩
```javascript
    npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```
- 有损压缩
```javascript
    npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

# 优化代码运行性能
## 1、Code split
### 为什么
    打包时会将 js 代码打包进一个文件中，体积太大。所以可以按需加载
### 是什么
代码分割主要做了两件事
- 1、分割文件：将打包生成的文件进行分割，生成多个 js 文件。
- 2、按需加载：需要哪个文件就加载哪个文件。

### 怎么用
#### 1、多入口
多入口多输出
```javascript
module.export = {
    entry: {
        app: './src/app.js',
        main: './src/mian.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',  // webpack 命名方式。[name] 以文件名自己命名
    }
}

```
import 动态导入，按需加载
```javascript
// /* webpackChunkName: "math" */ webpack 魔法命名
import(/* webpackChunkName: "math" */ "[路径]").then(res=>{
    // ...
})

// 要使魔法命名生效还需要做如下配置
module.export = {
    output: {
        // 给打包输出的其他文件命名
        chunkFilename: './[name].chunk.js',
        // 图片、字体等通过 type: asset 处理资源命名方式
        assetModuleFilename: 'static/media/[hash:10][ext][query]'
    }
}
```

### 修改 js 模块只更新对应的 hash 文件
```javascript
module.export = {
    optimization: {
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        }
    }
}
```

## 2、Preload / Prefetch
### 为什么
    import 动态导入的文件如果过大，则效果不好。
### 是什么
- Preload: 告诉浏览器立即加载资源。
- Prefetch: 告诉浏览器在空闲时才加载资源。

#### 它们的共同点：

- 都只会加载资源，并不执行。
- 都有缓存

#### 它们的区别：

- Preload 加载优先级高。
- preload 只能加载当前页面需要的资源，prefetch 还可以加载下一个页面需要使用的资源

#### 总结：
- 当前页面优先级高的资源用 preload 加载。
- 下一个页面需要使用的资源用 prefetch 加载。
#### 它们的问题：兼容性太差
- preload 相对兼容性好点

> caniuse.com 可以测试兼容性（浏览器的支持情况）

### 怎么用
    @vue/preload-webpack-plugin 插件（vue 官方维护的）

```javascript
new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script'   // style 优先级最高，prefetch 没有as
})
new PreloadWebpackPlugin({
    rel: 'prefetch',
    include: {
        type: 'asyncChunks',
        entries: ['app']
    }
})
```

## 2、Core-js
### 为什么
    @bable/preset-env 只能预设只能处理部分 es6 语法，比如箭头函数，扩展运算符，但不能处理 async、promise 对象、数组的高级方法如 includes 等。

### 是什么
- core-js 是专门用来做 es6 以及以上 API 的 polyfill。
- polyfill 翻译过来就是垫片/补丁。

### 怎么用
- 1、修改mian.js

```javascript
 import 'core-js'  //直接引入就行
 // 按需加载
 import 'core-js/es/promise'
// 还可以智能引入，自动检测有没有 es+ 的语法

module.export = {
    // 智能预设：能够编译 ES6 语法
    // presets: ["@bable/preset-env"],
    presets: [
        ["@bable/preset-env",{
            useBuiltIns: 'usage',   // 实现按需加载，自动引入
            corejs: 3,   // 指定 core-js 的版本
        }]
    ]
}

```
## 2、PWA
### 为什么
    开发 web 项目，项目一旦处于离线情况，就没法访问了。
    我们希望给项目提供离线访问

### 是什么
    渐进式网络应用程序：是一种可以提供类似于 native-app（原生应用程序）体验的 web app 技术。
    内部通过 Service workers 技术实现。

### 怎么用
#### 1、下载包
    npm i workbox-webpack-plugin -D

#### 2、查看 webpack 官网相关插件的使用



# 总结
我们从4个角度对 webpack 和代码进行优化

## 1、提升开发体验
- 使用 Source Map 源代码映射
## 2、提升 webpack 打包构建速度
- 1、使用 HotModuleReplacement 热更新
- 2、使用 OneOf 让资源文件只被一个 loader 处理
- 3、使用 Include/Exclude 排除或只检测某些文件。
- 4、使用 Cache 对 eslint 和 bable 处理的结果进行缓存。
- 5、使用 Thread 多进程处理 eslint 和 bable 任务。

## 3、减少代码体积
- 1、使用 Tree Shaking 剔除没有使用的多余代码。
- 2、使用 @bable/plugin-transform-runtime 插件对 bable 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码
- 3、使用 Image Minimizer 对项目中的图片进行压缩（如果是在线图片就不需要）

## 4、优化代码运行性能
- 1、使用 code-split 对代码进行分割成多个 js 文件，通过 import 动态导入语法进行按需记载。
- 2、使用 Preload/prefetch 对代码进行提前加载。
- 3、使用 network Cache 能对输出资源文件进行更好的命名，将来做好缓存，从而用户体验更好。
- 4、使用 core-js 对 js 进行兼容性处理。
- 5、使用 PWA 能让代码离线也能访问，从而提升用户体验。