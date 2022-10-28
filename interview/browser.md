## 从输入 url 到页面加载完成 发生了什么(2+3+5)

- url 解析
- 检查资源缓存
  - 使用缓存
  - 网络请求
    - DNS 解析(将 url 解析成 ip)
    - 建立 TCP 链接 发起 http 请求
    - 服务器收到请求 并返回响应结果
- 浏览器渲染 `Parse HTML => Parse Stylesheet => Recalculate Style => Layout => Update Layer Tree => Paint => Composite Layers`
  - 解析 html => `dom-tree`(document) 解析 css => `css-tree`(document.styleSheets)
  - 构建`render-tree`: 将`css-tree`合并到`dom-tree`上 计算每个 dom 节点的样式
  - 构建`layout-tree`: 将可见的元素添加到布局树中 计算每个 dom 节点的位置
  - 构建`layer-tree`: 根据元素的定位属性、层级属性等构建层级树 绘制各个图层
  - 合并: 合并图层

## performance 关键节点

- TTFB: 首字节响应时间
- L: onLoad 事件触发的时间 就是所有依赖资源加载完毕的时间
- DCL: DOMContentLoaded 事件触发时间 HTML 文档被完全加载并解析之后的时间
- FP: 首次绘制的时间(第一个像素的绘制)(白屏时间)
- FCP: 首次内容绘制的时间(第一个非空白内容的绘制)
- FMP: 首次有意义绘制的时间

## 五大浏览器及其内核

- Chrome：blink(基于 webkit)
- Firefox：gecko
- Safari：webkit
- Opera：blink
- IE：trident

## 内存泄露

- 介绍：不再需要使用的变量存在于内存中
- 哪些操作会导致内存泄漏
  - 意外的全局变量：`a = 123`
  - 闭包使用不当
  - 被遗忘的计时器
  - DOM 的引用: 如果我们获取了 DOM 的引用，而后面这个元素被删除，但这个引用如果一直在，那它也无法被回收

## 浏览器缓存

- 是否存在强缓存

  - 存在
    - cache-control
      - max-age: 时长
        - 未过期，直接去缓存
        - 过期，走协商缓存
      - public: 客户端和服务端都可以缓存
      - private: 只有客户端可以缓存
      - no-cache: 不走强缓存
      - no-store: 不走任何缓存(包括协商缓存)
    - expires
  - 不存在 走协商缓存

- 协商缓存
  - 是否存在 Etag
    - 存在 => 发请求 携带 If-none-Match(Etag 的值) 如果一样返回 304 不一样返回 200
    - 不存在
      - 是否存在 Last-Modifield
        - 存在 携带 In-Modified-since(Last-Modifield 的值) 与服务器的 Last-Modifield 比较 一样返回 304 不一样返回 200
        - 不存在，返回 200
