## css 隔离方案

- BEM
  - 一种命名规范
  - 块（Block）、元素（Element）、修饰符（Modifier）
  - 命名时加上模块前缀 实现隔离
- css-modules

  - 依赖 css-loader
  - 它会将选择器都编译成一段哈希字符串来实现样式的隔离

  ```html
  <style module>
    .guang {
      color: red;
    }
  </style>
  <template>
    <p :class="$style.guang">hi</p>
  </template>
  <!-- 会被编译成 -->
  <style module>
    ._1yZGjg0pYkMbaHPr4wT6P__1 {
      color: red;
    }
  </style>
  <template>
    <p class="_1yZGjg0pYkMbaHPr4wT6P__1">hi</p>
  </template>
  ```

- css-in-js

  - 使用 js 语法书写 css
  - 比如 `Styled-components` 库 使用标签模板字符串语法 最终会生成一个带有 hash classname 的标签 直接使用这个标签包裹内容即可 (它的样式是放在 style 标签中 插入到 head 中)

  ```javascript
  import styled from 'styled-components';
  const Wrapper = styled.div`
      font-size: 50px;
      color: red;
  `;
  function Guang {
      return (
          <div>
              <Wrapper>内部文件写法</Wrapper>
          </div>
      );
  }
  ```

- Shadow Dom
  - 严格意义上的隔离 天然支持
  - 内部可以支持 style link 等标签
- scoped
  - vue-loader 的解决方案
  - 通过编译的方式在标签添加 data-xxx 的属性 然后给 css 选择器上[data-xxx]的属性选择器实现 css 的隔离
  ```html
  <style scoped>
    .guang {
      color: red;
    }
  </style>
  <template>
    <div class="guang">hi</div>
  </template>
  <!-- 会被编译成 -->
  <style>
    .guang[data-v-f3f3eg9] {
      color: red;
    }
  </style>
  <template>
    <div class="guang" data-v-f3f3eg9>hi</div>
  </template>
  ```

## link 和@import

- link
  - `<link href="CSSurl路径" rel="stylesheet" type="text/css" />`
- @import
  - `@import(url)`
- 区别
  - link 属于 html 标签 @import 在 css 中使用
  - 加载时机：link 会遇到就加载，而@import 是在页面加载后再加载
  - 兼容性：@import 是 css2.1 后才提出来的

## BFC

- 触发
  - 有浮动
  - position 是绝对或固定
  - overflow 不是 visible
- 特性
  - 可以看作一个独立的容器 里面得元素不会影响外面的元素
  - 容器之间不会有外边距重叠
  - 容器不会被浮动元素覆盖

## 什么是 FOUC 如何避免

- 介绍：FOUC 为文档样式闪烁 原因就是文档加载出来的时候 样式还没有加载
- 解决：将样式放到 head 中

## 清除浮动的方式

- 父级元素添加`overflow: hidden`
- 父级内部最后添加一个 div 设置样式`clear: both`
- 父级添加伪类`:after ::after` 设置样式`clear: both`

## 如何移除 display:inline-block 的空白间隙

- 父元素设置`font-size:0` 子元素再单独设置`font-size`
- 给元素设置负 margin
- 移除空格或换行符

## 手写动画的最小间隔

- 要根据屏幕的刷新率而定
- 一般的屏幕都是 60HZ 所以最小时间间隔就是 1000/60 = 16.67ms

## css 选择器 可继承和不可继承

- 通配符(\*)、标签、类(.)、id(#)、子代(ul>li)、后代(ul li)、兄弟(.nav~div)、相邻(下一个兄弟)(.nav+div)
- 属性选择器(input[name="name"])、伪类、伪元素
- 可继承：font-size、font-family、color
- css3 中用单冒号:表示伪类 用双冒号::表示伪元素 但是为了兼容已有写法 有些浏览器也可以使用单冒号表示伪元素

## css3

- 圆角(border-radius)、阴影(box-shadow)、转换(transfrom)、渐变(linear-gradient)、媒体查询
- 新增伪类：
  - :nth-child(n) :nth-of-type(n) :first-of-type :last-of-type :disabled :checked

## position:fixed 在 android 下无效怎么处理

- 因为移动端浏览器默认的 viewport 叫做 layoutviewport
- 在移动端显示时，因为 layoutviewport 的宽度大于移动端屏幕的宽度，所以页面会出现滚动条左右移动
- 而 fixed 的元素是相对 layoutviewport 来固定位置的，而不是移动端屏幕来固定位置的，所以会出现感觉 fixed 无效的情况。
- 解决
  - `<metaname="viewport"content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/> `

## transition 和 animation 的区别

- transition 关注的是 css 属性的变化 属性值和时间是一个三次贝塞尔曲线
- animation 关注的是元素本身 动画更加灵活
  - name：需要绑定的 keyframe 名称
  - duration：完成动画所需要的时间
  - time-function：规定动画的速度曲线 linear(匀速) ease(低速->加快->慢) ease-in(低速开始) ease-out(低速结束) ease-in-out(低速开始和结束)
  - delay：动画开始之前的延迟
  - iteration-count：动画播放的次数 infinite(无限次)
  - direction：是否反向播放 normal(正常) alternate(反向)

## rgba 的 a 和 opacity 有什么区别

- opacity
  - 作用于元素以及元素内的所有内容的透明度
- rgba
  - 只作用于元素的颜色和背景色

## 解决 img 5px 间距的问题

- 设置 img-box 的`font-size: 0`
- 设置图片样式`display: block`
- 设置图片样式`vertical-align: bottom`
- 给父元素设置`line-height: 5px`

## 伪类和伪元素的区别

- 伪类: 表示被选中元素的某种状态(:hover :focus)
- 伪元素: 表示被选择元素的某个部分(:before :after)
- 区别: 核心区别在于，是否创造了“新的元素”

## 外边距重叠

- 分类
  - 父子重叠
  - 相邻重叠
  - 空元素重叠
- 其他
  - 只有垂直边距才会重叠
  - 设置 overflow、绝对定位 的父元素与子元素不会重叠

## 隐藏元素的方式以及区别

- display：none; => 元素不在于与文档中
- visibility: hidden; => 元素存在，不可见，不可响应事件
- opacity: 0; => 元素存在，不可见，可响应事件

## position:fixed 降级问题

- 如何使用 fixed 定位元素的父级有啥用 transform 的 fixed 的效果会被将为 absolute

## 已知如下代码，如何修改才能让图片宽度为 300px 注意下面代码不可修改`<img src="1.jpg" style="width:480px!important;”>`。

- `<img src="1.jpg" style="width:480px!important; max-width = 300px">`
- `<img src="1.jpg" style="width:480px!important; transform: scale(300/480)">`
