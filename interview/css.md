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
    - 可以看作一个独立得容器 里面得元素不会影响外面的元素
    - 容器之间不会有外边距重叠
    - 容器不会被浮动元素覆盖

