## link和@import
  - link
    - `<link href="CSSurl路径" rel="stylesheet" type="text/css" />`
  - @import
    - `@import(url)`
  - 区别
    - link属于html标签 @import在css中使用
    - 加载时机：link会遇到就加载，而@import是在页面加载后再加载
    - 兼容性：@import是css2.1后才提出来的

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
  - css3中用单冒号:表示伪类 用双冒号::表示伪元素 但是为了兼容已有写法 有些浏览器也可以使用单冒号表示伪元素

## css3
  - 圆角(border-radius)、阴影(box-shadow)、转换(transfrom)、渐变(linear-gradient)、媒体查询
  - 新增伪类：
    - :nth-child(n) :nth-of-type(n) :first-of-type :last-of-type :disabled :checked

## position:fixed 在android下无效怎么处理
  - 因为移动端浏览器默认的viewport叫做layoutviewport
  - 在移动端显示时，因为layoutviewport的宽度大于移动端屏幕的宽度，所以页面会出现滚动条左右移动
  - 而fixed的元素是相对layoutviewport来固定位置的，而不是移动端屏幕来固定位置的，所以会出现感觉fixed无效的情况。
  - 解决
    - `<metaname="viewport"content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/> `

## transition和animation的区别
  - transition关注的是css属性的变化 属性值和时间是一个三次贝塞尔曲线
  - animation关注的是元素本身 动画更加灵活
    - name：需要绑定的keyframe名称
    - duration：完成动画所需要的时间
    - time-function：规定动画的速度曲线 linear(匀速) ease(低速->加快->慢) ease-in(低速开始) ease-out(低速结束) ease-in-out(低速开始和结束)
    - delay：动画开始之前的延迟
    - iteration-count：动画播放的次数 infinite(无限次)
    - direction：是否反向播放 normal(正常) alternate(反向)

## rgba的a和opacity有什么区别
  - opacity
    - 作用于元素以及元素内的所有内容的透明度
  - rgba
    - 只作用于元素的颜色和背景色

## 解决 img 5px 间距的问题
  - 设置img-box的`font-size: 0`
  - 设置图片样式`display: block`
  - 设置图片样式`vertical-align: bottom`
  - 给父元素设置`line-height: 5px`
