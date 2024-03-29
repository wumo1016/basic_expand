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

## get 与 post

- 根据 RFC 规范，它们的用途不同
- get 一般会被缓存且是幂等的
- 都可以使用 url、body 携带参数

## HTTP 历史

- HTTP/0.9：没有请求头和请求体，使用 ASCII 来传输 HTML
- HTTP/1.0：增加请求头和响应头，实现多类型数据传输
- HTTP/1.1
  - 长连接: 默认持久连接，一个 TCP 上可以开启多个 HTTP 请求，一个域名最多维护 6 个 TCP 持久链接
  - 管道传输: 可以同时发起多个请求，浏览器默认并未开启
  - 队头阻塞: 响应队头阻塞
  - 无状态: 每一个连接都需要验证身份，引入客户端 cookie 机制
  - 不安全: 使用明文传输数据，信息窃取，身份伪装
- HTTP/2.0
  - 头部压缩: HPACK 算法(静态表+动态表+霍夫曼编码)
  - 二进制帧: 使用二进制帧传输数据
  - 并发传输: 多路复用机制并发传输，通过 Stream 实现并发，一般一个域名只需要一个 TCP 连接
  - 服务端推送: 请求 html，直接推送 css，无需再次请求
- HTTP/3.0
  - UDP
  - QUIC(3)
  - HTTP(2)
  - 缺点
- HTTPS：
  - 安全性: HTTP 是超文本传输协议，是明文传输的；HTTPS 在 TCP 和 HTTP 之间加入 SSL/TLS 协议，使得报文能够加密传输
  - 连接建立: HTTP 在三次 TCP 连接后即可传输数据，但 HTTPS 还需要 SSL/TLS 的握手过程
  - 端口: HTTP => 80 HTTPS => 443
  - 证书: HTTP 需要向 CA 证书机构申请证书

## 数字证书签发和验证流程

## RAS 算法

- 第一次
  - 生成客户端随机数 C，传给服务端
- 第二次
  - 服务端生成随机数 S，传给客户端
  - 数字证书，传给客户端
- 第三次
  - 验证数字证书合法性
  - 生成 pre-master key 使用服务端公钥加密，传给服务端
  - C + S + pre-master key => 加密生成会话密钥
- 第四次
  - 解密 pre-master key
  - C + S + pre-master key => 加密生成会话密钥

## ECDHE 算法

- 第一次
  - 生成客户端随机数 C，传给服务端
- 第二次
  - 生成服务端随机数 S，传给客户端
  - 选择一个椭圆曲线(包含基点 G)
  - 生成随机数作为[服务端椭圆曲线私钥]，保存在本地
  - 基点 + 私钥 => [服务端椭圆曲线公钥]，加密后传给客户端
- 第三次
  - 验证数字证书合法性
  - 生成随机数作为[客户端椭圆曲线私钥]，保存在本地
  - 基点 + 私钥 => [客户端椭圆曲线公钥]，传给服务端
  - [客户端椭圆曲线私钥] + 解密后的[服务端椭圆曲线公钥] + 基点 => [共享密钥]
  - C + S + [共享密钥] => 会话密钥
- 第四次
  - [服务端椭圆曲线私钥] + [客户端椭圆曲线公钥] + 基点 => [共享密钥]
  - C + S + [共享密钥] => 会话密钥

## TCP 重传机制

- 超时重传
- 快速重传
- SACK
- D-SACK

## 滑动窗口

- 介绍
- 字段
- 分类

## 流量控制

- 介绍
- 糊涂窗口综合征
  - 触发原因
  - 解决办法

## 拥塞处理

- 拥塞窗口
  - 介绍
  - 发送窗口
  - 基本规则
- 拥塞算法
  - 慢启动
  - 拥塞避免
  - 拥塞发生
  - 快速恢复

## 粘包
