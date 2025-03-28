## 编译 scss

- `sass index.scss index.css -w`

## 修改 placeholder 样式

```css
input::-webkit-input-placeholder {
  color: #babbc1;
  font-size: 14px;
}
```

## 修改输入框光标的颜色

```css
input {
  caret-color: blue;
}
```

## 移除数字类型输入框的小箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

## 自定义选中的文本样式

```css
.box::selection {
  color: red;
  background: blue;
}
```

## 设置页面灰色

```css
body {
  filter: grayscale(1);
}
```

## 选择器

- `[attr^=value]`: 选择带有属性 attr 值`开头`为 value 的元素
- `[attr$=value]`: 选择带有属性 attr 值`结尾`为 value 的元素
- `[attr*=value]`: 选择带有属性 attr 值`包含`value 的元素
- `[attr]`: 选择所有带有属性 attr 的元素
- `[attr=value]`: 选择带有属性 attr 值为 value 的元素

## position

- fixed: 当祖先元素的 transform、filter、perspective 等属于不为 none 时 容器由视口改为该祖先

## 在 calc 中使用 scss 变量

- 使用 `#{}` 包裹 例如: `height: calc(100% - #{$height})`

## 盒子模型

- 标准模型: content-box(content)
- IE 盒子模型: border-box(width=content+padding+border)

## 浮动

- 定义
  - 浮动元素脱离了文档流
  - 父容器的高度出现塌陷
  - 对附近的元素造成改变, 使得布局混乱
- 清除浮动
  - 父级元素添加`overflow: hidden`
  - 父级内部最后添加一个 div 设置样式`clear: both`
  - 父级添加伪类`:after ::after` 设置样式`clear: both`

## position: sticky

- 以最近的一个 overflow 不等于 visible 的祖级元素为容器进行粘性定位的
- 粘的位置不会超过父级的高度

## margin 的百分比都是通过父元素的宽度来计算的

## offsetLeft

- 基于非 static 定位的父元素进行计算
- 如果遇到 float 元素, 会让出一部分空间
  - 但如果 margin 足够大, 就不算遇到 float 元素了

## aspect-ratio

- 保持宽高比例

## 设置 50% 的圆角

- `border-radius: calc(infinity * 1px)`

## focus-within

## point-events

## inset

- 对应 `top right bottom left` 的写法
- 其他与简写语法与 maigin 对应

## CSS 样式的计算过程(Computed Style)

- 确定声明值(自己写的)
- 层叠(解决冲突)
  - 重要性
    - 作者样式表 important
    - 代理样式表(默认) important
    - 作者样式表
    - 代理样式表(默认)
  - 特殊性(优先级)(?,?,?,?)(多个就加 1)
    - 内联 style
    - id 选择器数量
    - 类选择器、属性选择器、伪类选择器
    - 元素选择器、伪元素选择器
  - 源次性
    - 源码中书写的顺序
- 继承
  - 对仍然没有值的属性, 若可以继承, 则使用继承
- 默认

## 包含块

## writing-mode

## margin-block-start

## text-combine-upright

## 图片清晰度的问题

- `原始尺寸(el.naturalWidth) = 样式尺寸 * 缩放倍率(devicePixelRatio)`
