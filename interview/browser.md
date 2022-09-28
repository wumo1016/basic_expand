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

## 状态码

- 1xx
  - 101：websocket
- 2xx：表示成功
  - 200：成功
  - 204：成功了但是没有返回具体的内容
  - 206：分片传输
- 3xx：重定向
  - 301：永久重定向
  - 302：临时重定向
  - 304：使用缓存
- 4xx：客户端错误
  - 400：参数错误 服务端不知道发送的是什么
  - 401：未登录 没有权限
  - 403：已登录 没有权限(token 过期等)
  - 404：请求的 url 不存在
  - 405：请求的方法服务端不支持
- 5xx：服务端错误

  - 500：服务器内部错误
  - 502：代理请求 无法响应
  - 504：请求超时 无法响应

## 图片使用 base64 编码的优缺点(一般只用于小图片的引入)

- 优点
  - 较少 http 请求
- 缺点
  - 编码的文件会比原来大 1/3
  - 无法直接缓存 只能通过 html css 缓存
  - ie8 以前不支持

## 三次握手与四次挥手

- 三次握手
  - 客户端 => SYN => 服务器
  - 服务器 => ACK + SYN => 客户端
  - 客户端 => ACK => 服务端
- 四次挥手
  - 客服端 => FIN => 服务器
  - 服务端 => ACK => 客户端(此时数据可能没有传输完毕 所以不能合并)
  - 服务端 => FIN => 客户端
  - 客户端 => ACK => 服务端

## 五大浏览器及其内核

- Chrome：blink(基于 webkit)
- Firefox：gecko
- Safari：webkit
- Opera：blink
- IE：trident

## TCP 和 UDP

- TCP
  - 建立链接和断开链接都需要握手 在数据传输的过程中 会通过各种算法保证数据的可靠性
  - ARQ 协议：超时重传机制
- UDP
  - 首先 UDP 是面向无连接的 不需要握手 可以直接发送数据
  - 只是数据的搬运工 并不做处理
    - 在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会给数据增加一个 UDP 头标识下是 UDP 协议，然后就传递给网络层了
    - 在接收端，网络层将数据传递给传输层，UDP 只去除 IP 报文头就传递给应用层，不会任何拼接操作
  - 缺点：不知道对方有没有收到
  - 传输方式：支持一对一、一对多、多对多
  - 使用场景：直播 游戏

## HTTP

- HTTP/0.9：没有请求头和请求体，使用 ASCII 来传输 HTML
- HTTP/1.0：增加请求头和响应头，实现多类型数据传输
- HTTP/1.1：默认开启持久链接，一个 TCP 上可以开启多个 HTTP 请求，一个域名最多维护 6 个 TCP 持久链接，解决队头阻塞问题(但是服务端要按顺序依次处理请求)，引入客户端 cookie 机制
- HTTP/2.0
  - 解决网络带宽使用低(多个 TCP 竞争带宽)，采用多路复用机制(一个域名使用一个 TCP 持久链接)，服务端推送
  - http2 采用文本 HTTP2 采用二进制编码
- HTTP/3.0：解决 TCP 队头阻塞问题，采用 QUIC 协议，QUIC 协议基于 UDP 协议
- HTTPS：还是通过 HTTP 来传输信息，但是信息通过 TLS/SSL 协议进行了加密(对称加密和非对称加密)
- HTTP 与 HTTPS 的主要区别
  - 后者需要到 CA 申请证书
  - 前者是明文传输 后者使用 TSL/SSL 的加密协议进行传输
  - 用的端口不同 前者使用的 80 端口 后者使用的是 443 端口

## 手写 ajax

- 1.创建 Ajax 对象

  ```js
  const xhr = new XMLHttpRequest()
  ```

- 2.配置请求地址方法等

  ```js
  xhr.open('get', 'index.xml', true)
  ```

- 3.发送请求

  ```js
  xhr.send(null)
  ```

- 4.监听请求，接受响应
  - readyState
    - 0：请求未初始化
    - 1：服务器链接已建立
    - 2：请求已接收
    - 3：请求处理中
    - 4：请求已完成 且响应已经就绪
  ```js
  xhr.onreadysatechange = function () {
    if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304)
      console.log(xhr.responseXML)
  }
  ```

## 内存泄露

- 介绍：不再需要使用的变量存在于内存中
- 哪些操作会导致内存泄漏
  - 意外的全局变量：`a = 123`
  - 闭包使用不当
  - 被遗忘的计时器
  - DOM 的引用: 如果我们获取了 DOM 的引用，而后面这个元素被删除，但这个引用如果一直在，那它也无法被回收

## OSI 七层网络模型

- 应用层(HTTP)
  - 应用层: 网路服务与用户的接口 如：浏览器
  - 表示层: 数据的表示与转换，确保一个系统应用层所发的消息能被另一个系统应用层读取
  - 会话层: 管理会话的
- 传输层(TCP): 定义传输数据的协议端口号等
- 网络层(IP): 提供逻辑地址，寻址用的
- 物理层
  - 数据链路层: 两个设备之间如何传递数据
  - 物理层: 如何传递数据

## 常见请求头

- Accept: 用来告诉服务器客户端可以处理的数据类型
  - `text/plain、text/html` 等
  - https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
- Accept-Language: 声明客户端它可以理解的语言
  - `zh-CN、en-US`
  - `*` 表示任意语言
  - q 表示优先级
- Content-Type: 客户端告诉服务器发送的数据类型
  - `text/html、multipart/form-data`
- Content-Language: 用于指定页面的目标受众

## HTTP/1.1 的特点

- 长连接: 默认持久连接
- 管道传输: 可以同时发起多个请求
- 队头阻塞: 响应队头阻塞
- 无状态: 每一个连接都需要验证身份
- 不安全: 信息窃取，身份伪装

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

## HTTP 与 HTTPS 的区别

- 安全性: HTTP 是超文本传输协议，是明文传输的；HTTPS 在 TCP 和 HTTP 之间加入 SSL/TLS 协议，使得报文能够加密传输
- 传输数据: HTTP 在三次 TCP 连接后即可传输数据，但 HTTPS 还需要 SSL/TLS 的握手过程
- 端口: HTTP => 80 HTTPS => 443
- 证书: HTTP 需要向 CA 证书机构申请证书

## get 与 post 的区别

- 本质不同
- 发送的数据大小不同
- get 一般会被缓存
- 都可以使用 url、body 携带参数

## HTTPS 握手过程(https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/70)

## HTTPS 握手过程中，客户端如何验证证书的合法性(https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74)
