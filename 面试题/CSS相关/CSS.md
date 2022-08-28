#### 四号标题
### 小标题
## 中标题
# 大标题

# 1、布局
## 弹性盒子
### 1、flex: 0 1 auto表示什么意思？
> flex: 0 1 auto 其实就是弹性盒子的默认值，表示 <font color='red'><strong><em>flex-grow</em></strong></font>, <font color='red'><strong><em>flex-shrink</em></strong></font>, <font color='red'><strong><em>flex-basis</em></strong></font> 的缩写，分别表示放大比例、缩小比例、分配多余空间之前占据的主轴空间。
### 2、flex缩写属性的计算值
> <font color='yellow'><strong><em>flex:1</em></strong></font> 等同于<font color='yellow'><strong><em> flex: 1 1 0%</em></strong></font>，<font color='yellow'><strong><em>flex:1 2</em></strong></font>等同于<font color='yellow'><strong><em>flex:1 2 0%</em></strong></font>，即flex-basis使用的不是默认值auto，而是使用的0%；
<font color='yellow'><strong><em>flex:100px</em></strong></font>等同于<font color='yellow'><strong><em>flex:1 1 100px</em></strong></font>，即<font color='yellow'><strong><em>flex-grow</em></strong></font>使用的不是默认值<font color='yellow'><strong><em>0</em></strong></font>，而是使用的<font color='yellow'><strong><em>1</em></strong></font>；
> more :https://www.zhangxinxu.com/wordpress/2020/10/css-flex-0-1-none/

|  单值语法   | 等同于  | 备注 |
|  :-----  | :----  | :---- |
| flex: initial  | flex: 0 1 auto | 初始值，常用 |
| flex: 0  | flex: 0 1 0% | 适用场景少 |
| flex: none  | flex: 0 0 auto | 推荐 |
| flex: 1  | flex: 1 1 0% | 推荐 |
| flex: auto  | flex: 1 1 auto | 适用场景少 |

### 3、

