## HTTP 是什么

- 超文本传输协议
  - 超文本: 文字、图片、音频、视频等数据
  - 传输: 用来两点之间传输数据的约定和规范
  - 协议: 是一个在计算机世界里的协议, 它使用计算机能够理解的的语言确立了一种计算机之间交流通信的规范, 以及各种控制和错误处理方式

## HTTP 常见字段

- Host: 客户端发送请求时, 用来指定服务器的域名
- Content-Length: 表示本次响应的数据长度
- Content-Type: 表示本次响应的数据格式 (请求时可以通过请求头 Accept 设置可接受的数据格式)
- Content-Encoding: 表格本次响应的数据压缩方法(gzip、deflate) (请求时可以通过请求头 Accept-Encoding 设置可接受的数据格式)
- Connection: keep-alive 保持 TCP 持久连接, 以便其他请求复用(HTTP1.1 默认连接都是持久连接, 加这个字段是为了兼容老版本的 HTTP)

## 强制缓存和协商缓存

- 强缓存
  - 主要通过两个响应头实现 (Cache-Control 优先级更高)
    - Cache-Control: 相对时间(单位s)
    - Expires: 绝对时间
