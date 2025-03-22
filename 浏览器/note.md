## 进程与线程

- 进程是操作系统分配资源的最小单位
  - 比如浏览器的多个 tab 页 一个 tab 页一个进程 加载互不影响
- 线程
  - 进程由很多线程组成

## 浏览器的五个主要进程

- 浏览器进程: 浏览器自身展示、交互、子进程管理等
- 渲染进程: 每个页卡都有单独的渲染进程
- 网络进程
- GPU 进程
- 插件进程

## 从输入 url 到页面加载完成 发生了什么(细化版)

- 网络请求
  - url 解析
    - 一个完整的 URL 应该是: 协议+ip+端口+路径[+参数][+锚点]
    - 浏览器会判断输入的内容是一个 url 还是一个关键字
      - 关键字: 会自动拼接到默认搜索引擎后面的参数部分去 从而组成一个完整的 url
    - 然后浏览器会对非安全字符进行转义
      - 安全字符: 数字、英文字母、少数符号
      - 非安全字符: 汉字、特殊字符(= ? & 因为这些特殊字符会和 url 本身的字符产生歧义)
        - 浏览器对非安全字符转义的编码叫 `百分号编码` (因为它使用%加上两位的 16 进制数表示)
    - `encodeURI` 和 `encodeURIComponent`
      - encodeURI: 不会编码 `?&=` 这些 url 内置字符
      - encodeURIComponent: 会编码所有字符
  - 检查资源缓存
    - 强缓存 直接设置过期时间 未到期直接使用缓存
      - 设置 Cache-Control：max-age=xxx(Expires)
      - 从控制台请求可以看到这类请求直接返回 200 size 是 `memory cache`(资源从内存中取出) 或 `disk cache`(资源从磁盘中取出)
    - 协商缓存
      - 设置响应头 Last-Modified
      - 下一次请求头带上 If-Modified-Since 然后与最后修改时间对比 相同就返回 304
      - 缺点：有可能修改时间变了 但是内容没变
    - 文件指纹：根据文件内容生成一段密钥(摘要)
      - 设置响应头 Etag 指纹
      - 下一次请求会自定带上 If-none-match 如果相同就返回 304 状态码
  - DNS 解析
    - 如果没有成功使用本地缓存 就需要发起网络请求了 首先会进行 DNS 解析
      - 搜索过程: 浏览器 DNS 缓存 => 操作系统 DNS 缓存 => 路由器的 DNS 缓存 => 向服务商的 DNS 服务器查询 => 向全球 13 台根域名服务器查询
      - 为了节省时间 可以进行预 DNS 解析 `<link rel="dns-prefetch" href="http://www.baidu.com" />` 为了保证响应的及时性 它使用的是 UDP 协议
  - TSL 协商密钥(HTTPS 的 S)
  - 建立 TCP 连接
  - 发送 http 请求与接收响应
  - 关闭 TCP 连接
- 浏览器渲染
  - 构建 DOM 树
  - 样式计算
  - 布局定位
  - 图层分层
  - 图层绘制
  - 显示

## 缓存顺序(https://compare-sw-and-http-caching.glitch.me/)

- Service Worker
- Memory Cache
  - 缓存网页用的资源 图片 js css 等(浏览器自己控制)
  - 当关闭页面时 此资源就会被释放掉 所以重新打开页面的时候不会出现 from memory cache 的情况
- HTTP Cache(Disk cache)(强缓存和协商缓存)
- Push Cache

## 渲染流程

- 解析 html 和 css 同步进行
  - 浏览器无法直接使用 HTML 需要将 HTML 转化成 `DOM Tree` 可以直接通过 `document` 拿到 => dom 树
  - 浏览器无法直接使用纯文本的 css 样式 需要将其解析成 `styleSheets` 可以通过 `document.styleSheets` 拿到 => css 树
- 计算出 DOM 树中每个节点的样式(Attachment) => dom 树
- 创建渲染树(Render Tree) 将 DOM 树中的可见节点 添加到布局树中 计算节点位置 => 布局树
- 根据布局树 进行分层(定位属性、透明属性、transform 等等) => 图层树
- 将不同图层进行绘制 然后通过合成线程处理 产生最终的页面 并显示

## 请求头

- User-Agent(用户代理)
  - 判断浏览器类型 以便做兼容处理
  - 判断是否为移动端
    - PC: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36`
    - Mobile: `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Mobile Safari/537.36`
  - 表示 H5 容器 方便调用 H5 容器特定接口(比如微信的嵌入网页)
  - 不安全 容易伪装

## performance 关键节点

关键时间节点 描述 含义
TTFB time to first byte(首字节时间) 从请求到数据返回第一个字节所消耗时间
TTI Time to Interactive(可交互时间) DOM 树构建完毕，代表可以绑定事件
DCL DOMContentLoaded (事件耗时) 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发
L onLoad (事件耗时) 当依赖的资源全部加载完毕之后才会触发
FP First Paint（首次绘制) 第一个像素点绘制到屏幕的时间
FCP First Contentful Paint(首次内容绘制) 首次绘制任何文本，图像，非空白节点的时间
FMP First Meaningful paint(首次有意义绘制) 首次有意义绘制是页面可用性的量度标准
LCP Largest Contentful Paint(最大内容渲染) 在 viewport 中最大的页面元素加载的时间
FID First Input Delay(首次输入延迟) 用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间

## 成为 FMP 元素的条件

- 页面体积占比比较大
- 屏幕可视区占比大
- 资源加载元素(img、svg、video、canvas)

## 网络优化策略

- 1.减少 HTTP 请求
- 2.合理设置服务端缓存
- 3.避免重定向
- 4.域名分片
- 5.使用 CDN 服务
- 6.gzip 压缩
- 7.prefetch(将数据缓存到 HTTP 缓存中)
  - 由于不同的资源类型优先级不同 所以可以在标签上添加 as 属性 用来指定资源类型 常用类型有 script、style、image、html
- 8.preload(将数据缓存到 HTTP 缓存中)
- 9.DNS 预解析(`<link rel="dns-prefetch" href="//example.com">`)
- 10.prerender(预渲染下一个页面)

## 渲染优化

- 脱离文档流
- 尽量使用 CSS3 动画(不会导致回流 只会重绘)

## 静态文件优化

- 图片优化

  - 图片格式
    - jpg: 适合色彩丰富的照片、banner 图；不适合图形文字、图标（纹理边缘有锯齿），不支持透明度
    - png: 适合纯色、透明、图标，支持半透明；不适合色彩丰富图片，因为无损存储会导致存储体积大
    - svg: 相比于 jpg 和 jpg 它的体积更小,渲染成本过高,适合小且色彩单一的图标;
    - webp: 适合半透明图片，可以保证图片质量和较小的体积(兼容性问题)
    - gif: 适合动画，可以动的图标；不支持半透明，不适和存储彩色图片
  - 图片优化
    - img 标签设置 alt 属性 图片加载的时候可以显示
    - 使用原生的 loading:lazy 属性(只有图片到可视区域内 才会显示) `<img loading="lazy" src="..." width="300" height="450" />`
    - 不同的屏幕显示不同尺寸的图片 `<img src="./images/1.jpg" sizes="(max-width:500px) 100px,(max-width:600px) 200px"  srcset="./images/1.jpg 100w, ./images/3.jpg 200w">`
    - 较大的图采用渐进式图片(PS 可以设置)
    - 采用 base64 减少图片请求(大小会增加 1/3)
    - 采用雪碧图

- HTML 优化

  - 语义化 HTML
  - 减少标签嵌套 较少 dom 数量
  - 删除无用的空格、空行、注释
  - 减少 iframe 使用(可以采用 js 动态加载 iframe)
  - 避免使用 table 布局

- CSS 优化

  - 使用单独的 css 文件 可以缓存
  - 减少 @import 使用 因为@import 采用的是串行加载 a.css => b.css => c.css

- JS 优化
  - 通过 async、defer 异步加载文件
  - 缓存访问过的元素 减少获取元素
  - IntersectionObserver => `2.intersection.html`
  - requestAnimationFrame requestIdleCallbac

## LightHouse 使用

```javascript
npm install lighthouse -g
lighthouse http://www.taobao.com
```

## performance 详解

- timeOrigin: 定义了测量性能数据的初始时间
- now(): 表示当前距离测量时间的间隔
- toJSON(): 将 performance 以 json 格式输出
- getEntries()
  - PerformanceNavigationTiming
  - PerformanceResourceTiming
  - PerformancePaintTiming
  - PerformanceMark
  - PerformanceMeasure
  - PerformanceEventTiming
  - 以上对象都继承于 PerformanceEntry 对象
    - name: 当前 url
    - entryType
    - startTime
    - duration
- timing(https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
- navigation(https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation)
- mark(name): 时间标记，返回代码执行到此位置的时间，以 Time Origin 为基准
- measure(anme, startMark, endMark): 返回两个时间点的间隔时间

## url 地址

- 绝对路径
  - 完整 URL
  - 省略协议、域名、端口
- 相对路径
  - `./`
  - `../`
