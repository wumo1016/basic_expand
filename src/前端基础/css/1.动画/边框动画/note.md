## border

- border-width
  - 1.明确指定宽度值 如：px|em|rem 等
  - 2.使用全局关键字
    - thin: 细边线
    - medium: 中等边线
    - thick: 宽边线
- border-style
  - none/hidden: 不显示 边框为 0
  - solid: 实线
  - dashed: 线段虚线
  - dotted: 圆点虚线
  - double: 双实线
  - inset: 陷入效果
  - outset: 突出效果

## background

- background-size
  - 关键字
    - cover: 覆盖背景区 多余得会被裁剪
    - contain: 缩放背景图以完全显示 部分背景可能留白
  - 一个值: 指定图片得宽度 高度隐式为 auto
  - 两个值: 指定图片得宽高
  - 多个值: 可以使用逗号隔开多个值 以设置多重背景
- background-position
  - 关键字
    - center: 居中
    - top,left,bottom,right: 把项目放置哪一个边缘 另一个维度则默认是 50%
  - 两个值: 用于设置 x、y 坐标
  - 多个值: 可以使用逗号隔开多个值 以设置多重背景
- 注意事项
  - 被指定多个背景层时 可以使用逗号分隔每个背景层
  - background-size 和只能紧接着 background-position 出现 以`/`分隔 如 `center center / 50% 50%`

## css 变量

- 声明 css 变量 必须以`--`开头
- 声明的变量只能在作用域 dom 作用域内使用

## outline

- 与 border 类似
- 区别
  - outline 不占据空间
  - outline 通常是矩形 也可以是非矩形
- outline-offset: 设置轮廓偏移

## clip-path

- 裁剪元素的显示区域 区域内可显示 区域外隐藏
- 使用形状裁剪
  - inset
    - 长方形 距离边缘的距离 一个值 两个值 四个值
    - 示例: `clip-path: inset(50px);`
  - circle
    - 圆形 第一个参数定义半径 `at x y`表示中心点位置 可选 默认中心
    - 示例: `clip-path: circle(50px at 100px 0);`

## css3

- :root: 代表根元素
- 1turn: 代表一圈
