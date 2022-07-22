## script 上的 async 和 defer 是什么区别

- 都没有: 遇到即加载并执行 再继续解析文档
- async: 可能阻塞文档的解析与渲染 因为一旦 js 完毕 如果此时文档还未解析或渲染完毕 就会停止文档的解析或渲染 执行完毕 js 后 再继续解析渲染(执行顺序取决于网络请求 谁先完成谁先执行)
- defer: 不阻塞文档的解析与渲染 但执行会在文档的解析和渲染完毕后 DOMContentLoaded 事件之前(执行顺序取决文档中的位置)

## preload、prefetch 有什么区别

- 浏览器对 link 标签新增的 rel 值 用来加快页面资源(css,js)的加载速度
- preload: 以高优先级加载资源并缓存起来 常用于当前页面立即使用的资源 比如(字体文件隐藏在 css 文件中 在 css 加载后再加载字体 这样会导致页面闪一下)
  - <link rel="preload" href="example.js" as="script">
- prefetch: 以低优先级(在空闲时间)加载资源并缓存起来 将来使用的时候会直接从缓存中获取
  - 示例: https://juejin.cn/post/6893681741240909832
- 最佳实践
  - 大部分场景下无需特意使用 preload
  - 类似字体文件这种隐藏在脚本、样式中的首屏关键资源，建议使用 preload
  - 异步加载的模块（典型的如单页系统中的非首页）建议使用 prefetch
  - 大概率即将被访问到的资源可以使用 prefetch 提升性能和体验

## 重排(回流)和重绘

- 重排和重绘合称为渲染
  - 以下三种情况会导致重新渲染:
    - 修改 DOM
    - 修改样式表
    - 用户事件(改变窗口大小等)
  - `重绘不一定重排，但重排一定会导致重绘`
- 重排: 重新生成布局
  - 添加元素、删除元素、修改大小、移动元素、获取元素位置信息
- 重绘: 重新绘制
  - 改变某个元素的颜色
- 减少重新渲染的操作
  - 尽量不要把读操作和写操作混在一起 因为如果在一个写操作后执行读操作 会立即触发重排或重绘
  - 不要一条条的改变样式 可以通过 class 或 cssText 一次性的改变样式
  - 可以使用离线 dom
    - 添加新元素 使用 documentFragment 操作完成后直接添加到文档
    - 如果是已有 dom 使用 cloneNode 克隆节点 操作完后 替换原来的 dom
  - 如果一个元素操作较大 可以显示设置 display:none 操作完后再设置回去 这样只会触发一次重新渲染
  - 静态定位和固定定位的元素 重排的开销较小

## 前端需要注意哪些 seo

- 语义化标签(header footer nav article section aside)
- 合理的 title、description(meta)、keywords(meta) 搜索对三者的权重逐渐减小
  - `<title>web 技术教程</title>`
  - `<meta name="description" content="免费的 web 技术教程。" />`
  - `<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript" />`
- 图片都添加 alt
- 少用 iframe

## js 延迟加载的几种方式

- 将 js 脚本放在文档底部
- 添加 defer 属性
- 添加 async 属性
- 动态创建 script 的方式
