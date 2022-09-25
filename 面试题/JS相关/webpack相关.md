# 1、处理css兼容性
modules里面配置rules，添加loader加载器postcss-loader
```javascript
modules:{
    rules:[
        {
            test:/\.css$/,
            loader:[          // 注意顺序问题，loader执行顺序是从下往上
                'style-loader',   // 处理样式
                'css-loader',     // 处理css文件引入
                'postcss-loader',  // 解析css3
                'sass-loader'     // 解析sass
            ]
        }
    ]
}
```

# 2、配置文件拆分
- base.config.js: 公共配置
```javascript
    const path = require('path');

    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.export = {
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: [name].js,   // name变量对应多入口的名称
            path: path.resolve(__dirname,'dist') // 输出文件夹名为dist
        },
        plugin: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }

```
- dev.config.js: 开发环境配置
```javascript
    const commonConfig = require('./base.config')
    const {smart:merge} = require('webpack-merge') // smart为合并配置模块

    const devConfig = {
        mode: 'development'
    }
    module.exports = merger(commonConfig,devConfig)  // 合并开发和公共配置
```
- prod.config.js: 生产环境配置
```javascript
    const commonConfig = require('./base.config')
    const {smart:merge} = require('webpack-merge') // smart为合并配置模块

    const prodConfig = {
        mode: 'production'
    }
    module.exports = merger(commonConfig,prodConfig)  // 合并生产和公共配置
```

> 总结：拆分成多个配置文件，其中一个是公共配置文件，其他的为子配置文件，子配置文件通过webpack-merge的smart模块与公共模块合并。


# 3、如何使用webpack-dev-server（开发环境服务器）
## 3.1 devServer配置

- 第一步 
```javascript
    const commonConfig = require('./base.config')
    const {smart:merge} = require('webpack-merge') // smart为合并配置模块

    const devConfig = {
        mode: 'development',
        devServer: {
            port: 8080,    // 服务器启动的端口
            contentBase: './dist',  // 服务器静态资源文件夹，或者配置名为static？
            progress: true,  //  打包时现实进度条
            open: true,     // 启动服务器后，自动打开浏览器
            compress: true   // 开启gzip压缩
        }
    }
    module.exports = merger(commonConfig,devConfig)  // 合并开发和公共配置
```
- 第二步
    在package.json文件里面添加如下配置
    ```json
    "script":{
        "dev": "webpack-dev-server --config ./build/webpack.dev.config.js"
    }
    ```

## 3.2 开发环境配置接口访问远程服务器而不是localhost:8080//开始
> 在devServer配置项里面配置proxy代理即可
```javascript
    const commonConfig = require('./base.config')
    const {smart:merge} = require('webpack-merge') // smart为合并配置模块

    const devConfig = {
        mode: 'development',
        devServer: {
            port: 8080,    // 服务器启动的端口
            contentBase: './dist',  // 服务器静态资源文件夹，或者配置名为static？
            progress: true,  //  打包时显示进度条
            open: true,     // 启动服务器后，自动打开浏览器
            compress: true,   // 开启gzip压缩
            proxy: {
                '/api/startPath': { // 匹配文件开始路径
                    target: 'http: //www.baidu.com', // 目标服务器地址
                    pathRewrite: {       // 将url开头的/api替换为空
                        '^/api': ''
                    },
                    changeOrigin: true   // 跨域问题
                }
            }
        }
    }
    module.exports = merger(commonConfig,devConfig)  // 合并开发和公共配置
```

# 4、webpack处理图片
## 4.1配置开发环境

```javascript
const devConfig = {
    mode: 'development',
    module:{
        rules:[
            {
                test:/\.(png,jpg)$/,
                loader: 'file-loader'
            }
        ]
    }
}
```
## 4.2配置生产环境

```javascript
const prodConfig = {
    mode: 'production',
    module:{
        rules:[
            {
                test:/\.(png,jpg)$/,
                use: {
                    loader: 'url-loader',
                    option: {
                        limit: 5 * 1024,  // 设置小于5kb的图片自动转换诶base64格式，可以减少http请求，大于5kb的图片仍然像file-loader那样打包到 img 文件夹，发送求情，防止页面首次渲染太慢
                        outputPath: '/img/'
                    }
                }
            }
        ]
    }
}
```

# 5、多入口
## 5.1 配置多入口
在base.config.js配置文件下做如下配置
```javascript
module.export = {
    entry: {
        // main: './src/index.js'   // 默认配置但入口

        main: './src/index.js',
        other: './src/other.js'
    },
    plugin: [   // plugin也要配置多个
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']  // html文件使用的js文件
        }),
        new HtmlWebpackPlugin({
            template: './src/other.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ]
}
```

# 6 抽离css
> webpack默认将css代码打包到main.js文件里面并插入道style标签中
## 6.1 mini-css-extract-plugin插件

```javascript
const prodConfig = {
    mode: 'production',
    module:{
        rules:[],
        plugin:[
            new MiniCSSExtractPlugin({
                filename: 'css/main.[contentHash:8].css' // 哈希缓存
            })
        ],
        // 优化
        optimization: {
            minimizer: [
                // 压缩JS
                new TerserPlugin(),
                // 压缩css
                new OptimizeCssAssetsWebpackPlugin()  
            ]
        }
    }
}
```
> 生产用MiniCSSExtractPlugin.loader替换style-loader

```javascript
    modules:{
        rules:[
            {
                test:/\.css$/,
                loader:[   
                    MiniCSSExtractPlugin.loader,   // 处理样式
                    'css-loader',     // 处理css文件引入
                    'postcss-loader',  // 解析css3
                    'sass-loader'     // 解析sass
                ]
            }
        ]
    }
```

# 6、抽离公共文件

## 6.1 公共文件plugin配置
```javascript
module.export = {
    entry: {
        // main: './src/index.js'   // 默认配置但入口

        main: './src/index.js',
        other: './src/other.js'
    },
    plugin: [   // plugin也要配置多个
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index','vender','common']  // html文件使用的js文件
        }),
        new HtmlWebpackPlugin({
            template: './src/other.html',
            filename: 'other.html',
            chunks: ['other','vender','common']
        })
    ]
}
```
## 6.2 生产环境配置文件
- 在优化配置里面配置splits配置项来做代码分割
```javascript
const prodConfig = {
    mode: 'production',
    module:{
        rules:[],
        plugin:[
            new MiniCSSExtractPlugin({
                filename: 'css/main.[contentHash:8].css' // 哈希缓存
            })
        ],
        // 优化
        optimization: {
            minimizer: [
                // 压缩JS
                new TerserPlugin(),
                // 压缩css
                new OptimizeCssAssetsWebpackPlugin()  
            ],
            splitChunks: {
                // all 对同、异步代码都做分割
                // async 只对 异步 代码做代码分割
                // initial 只对 同步 代码做代码分割
                // 同步代码， 例如 import lodash from 'loadsh'
                // 异步代码， 例如 import('loadsh')
                chunks: all,
                cacheGroups: {
                    // 第三方模块
                    vender: {
                        // 每个组的名字
                        name: 'vender',
                        // 优先级 优先级越高，越先检测处理
                        // 第三方模块可能也会被作为公共模块来检测处理，通过高优先级，达到先被当做第三方模块带检测处理
                        priority: 1,
                        // 检测方法，例如：检测模块是否来自node_modules
                        test: /node_modules/,
                        // 实际开发中，可以写5 * 1024， 也就是5kb
                        // 但这里为了看到代码分割的效果，我们把值设置到最小
                        minSize: 0,
                        // 检测模块被引用了几次
                        // 对于第三方模块而言，引用一次就应该单独打包
                        // 对于公共模块而言，引用2次以上就应该单独打包
                        minChunks: 1,
                    },
                    // 公共模块
                    common: {
                        name: 'common',
                        priority: 0,
                        miniSize: 0,
                        minChunks: 2,
                    }
                }
            }
        }
    }
}
```

# 7、webpack构建流程
    webpack启动后，从entry开始，递归解析entry依赖的所有model。找到每一个model的时候，就会根据models.rules里配置的loader进行相应的转换处理，对model进行转换后，再解析出当前model依赖的其他的一些模块，解析的结果是一个一个的chunk，最后webpack会将所有的chunk转换成文件输出的output，在整个构建流程中，webpack会在恰当的时机执行plugin里定义的插件，完成plugin的任务。
    entry：模块入口，使得源文件加入到构建流程中
    output：配置如何输出最终代码
    module：配置各种类型模块的处理规则
    plugin：配置扩展插件的
    devServer：实现本地服务的：包括http服务、模块热替换、source map等服务的

# 8、打包后dist目录过大怎么解决？
    1、dist/生成.map配置文件中：productionSourceMap:false
    2、组件和路由懒加载
    3、常用插件最好使用 script 标签引入而不是 npm 安装
    4、对于图片和文件最好压缩（compression-webpack-plugin）
        a.导入插件
        b.最小化代码：minsize(true)
        c.分割代码：splitChunks
        d.超过限定值的文件进行压缩
            threshold: 文件大小（字节为单位）


# 9、plugin和loader的区别
    loader： 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
    如：css-loader，style-loader，postcss-loader，sass-loader

    plugin： 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事
    如：uglify-webpack-plugin、clean-webpack-plugin、babel-polyfill

## 9.1 两者在运行机制上的区别
    loader 运行在打包文件之前
    plugins 在整个编译周期都起作用



## 10、webpack优化策略
- 1、gzip压缩代码
    - compression-webpack-plugin
## 11.webpack热更新
- 1、安装 webpack-dev-server 插件
```javascript
var devConfig = {
    mode:'devolopment'
    devServer: {
        port: 8080,    // 服务器启动的端口
        contentBase: './dist',  // 服务器静态资源文件夹，或者配置名为static？
        progress: true,  //  打包时显示进度条
        open: true,     // 启动服务器后，自动打开浏览器
        compress: true,   // 开启gzip压缩
        proxy: {
            '/api/startPath': { // 匹配文件开始路径
                target: 'http: //www.baidu.com', // 目标服务器地址
                pathRewrite: {       // 将url开头的/api替换为空
                    '^/api': ''
                },
                changeOrigin: true   // 跨域问题
            }
        }
    }
}
```