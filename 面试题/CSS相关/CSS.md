# 请你讲一讲 CSS 的权重和优先级
<b>权重记忆口诀</b>：从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0。
!important 无限大
- !important应用于简写样式

    如果!important被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被作用上!important。

> !important > 行内样式 > 内联样式 and 外联样式

内联样式的优先级并不一定比外联样式高，因为css样式是单线程，依次从上向下加载的，这也就证明了内联样式和外联样式的优先级和加载顺序有关。

## 总结
- 常用选择器权重优先级：!important > id > class > tag

- !important可以提升样式优先级，但不建议使用。如果!important被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被应用上!important。 例如：background: blue !important;

- 如果两条样式都使用!important，则权重值高的优先级更高

- 在css样式表中，同一个CSS样式你写了两次，后面的会覆盖前面的

- 样式指向同一元素，权重规则生效，权重大的被应用

- 样式指向同一元素，权重规则生效，权重相同时，就近原则生效，后面定义的被应用

- 样式不指向同一元素时，权重规则失效，就近原则生效，离目标元素最近的样式被应用

# CSS 怎么画一个大小为父元素宽度一半的正方形？
```javascript
    width: 50%;
    padding-bottom: 50%;
```
# CSS实现自适应正方形、等宽高比矩形
1.利用vw、vh、vmin、vmax，vw表示的是viewport的宽度，也就是视口的宽度，vh表示的是视口的高度，vmin=min{vw,vh}取的是两者中较小的值，vmax ={vw,vh}，1vm = 1% viewport width其他同理，所以利用上诉的单位来定义矩形的宽高即可实现等比变换。
```javascript
 div{
2  width :1vm;
3  height:1vm;
4 }
```
2、利用垂直方向上的padding值
```javascript
div{
2   height:0px;
3   width:100%;
4   padding-bottom/top:100%;
5 }
```
# 实现两栏布局的方式
## 方式1
左边固定宽度，比如200px,并且设置浮动，右边设置margin-left：200px
> 设置浮动高度会塌陷，需要清除浮动，在左边添加<font color="yellow"> clear: both;</font>。 或者父元素添加<font color="yellow"> overflow: hidden;</font>

## 方式2
flex布局：右边设置固定宽度，右边设置<font color="yellow"> flex: 1;</font>

# 创建一个 BFC
- float 的值不为 none。
- overflow 的值不为 visible。
- position 的值不为 relative 和 static。
- display 的值为 table-cell, table-caption, inline-block 中的任何一个。


# 实现三列布局的方式
# 方式1
左右设置宽度，中间通过设置margin来实现
# 方式2
flex布局
# CSS 动画有哪些？
- css实现动画主要有3种方式
    - 第一种是：transition实现渐变动画，
    - 第二种是：transform转变动画，
    - 第三种是：animation实现自定义动画。

# 圣杯布局


