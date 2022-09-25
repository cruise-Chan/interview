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


# 属性
- flex-direction：属性决定主轴的方向（即项目的排列方向）。
    - row（默认值）：主轴为水平方向，起点在左端。
    - row-reverse：主轴为水平方向，起点在右端。
    - column：主轴为垂直方向，起点在上沿。
    - column-reverse：主轴为垂直方向，起点在下沿。

- flex-wrap：默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
    - wrap-reverse：换行，第一行在下方。
    - no-warp: 不换行
    - wrap: 换行
- flex-flow：flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

- justify-content：属性定义了项目在主轴上的对齐方式。
    - flex-start（默认值）：左对齐
    - flex-end：右对齐
    - center： 居中
    - space-between：两端对齐，项目之间的间隔都相等。
    - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

- align-items：属性定义项目在交叉轴上如何对齐。
    - flex-start：交叉轴的起点对齐。
    - flex-end：交叉轴的终点对齐。
    - center：交叉轴的中点对齐。
    - baseline: 项目的第一行文字的基线对齐。
    - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

- align-content：属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
    - flex-start：与交叉轴的起点对齐。
    - flex-end：与交叉轴的终点对齐。
    - center：与交叉轴的中点对齐。
    - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    - stretch（默认值）：轴线占满整个交叉轴。

##　项目的属性（大盒子里面的小盒子）
align-self属性：属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。