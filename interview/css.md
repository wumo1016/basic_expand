## link和@import
  - link
    - `<link href="CSSurl路径" rel="stylesheet" type="text/css" />`
  - @import
    - `@import(url)`
  - 区别
    - 加载时机：link会遇到就加载，而@import是在页面加载后再加载
    - 兼容性：import是css2.1后才提出来的

## BFC
  - 触发
    - 有浮动
    - position是绝对或固定
    - overflow不是visible
  - 特性
    - 可以看作一个独立的容器 里面得元素不会影响外面的元素
    - 容器之间不会有外边距重叠
    - 容器不会被浮动元素覆盖

## 什么是FOUC 如何避免
  - 介绍：FOUC为文档样式闪烁 原因就是文档加载出来的时候 样式还没有加载
  - 解决：将样式放到head中

## 清除浮动的方式
  - 父级元素添加`overflow: hidden`
  - 父级内部最后添加一个div 设置样式`clear: both`
  - 父级添加伪类`:after ::after` 设置样式`clear: both`

## 如何移除 display:inline-block 的空白间隙
  - 父元素设置`font-size:0` 子元素再单独设置`font-size`
  - 给元素设置负margin
  - 移除空格或换行符

## 手写动画的最小间隔
  - 要根据屏幕的刷新率而定
  - 一般的屏幕都是60HZ 所以最小时间间隔就是 1000/60 = 16.67ms

## css选择器 可继承和不可继承
  - 通配符(*)、标签、类(.)、id(#)、子代(ul>li)、后代(ul li)、兄弟(.nav~div)、相邻(下一个兄弟)(.nav+div)
  - 属性选择器(input[name="name"])、伪类、伪元素
  - 可继承：font-size、font-family、color

## css3
  - 圆角(border-radius)、阴影(box-shadow)、转换(transfrom)、渐变(linear-gradient)、媒体查询
  - 新增伪类：
    - :nth-child(n) :nth-of-type(n) :first-of-type :last-of-type :disabled :checked
