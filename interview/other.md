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
    - 403：已登录 没有权限(token过期等)
    - 404：请求的url不存在
    - 405：请求的方法服务端不支持
  - 5xx：服务端错误
    - 500：服务器内部错误
    - 502：代理请求 无法响应
    - 504：请求超时 无法响应

## 三次握手与四次挥手
  - 三次握手
    - 客户端 => SYN => 服务器
    - 服务器 => SYN + ACK => 客户端
    - 客户端 => ACK => 服务端
  - 四次挥手
    - 客服端 => FIN => 服务器
    - 服务端 => ACK => 客户端(此时数据可能没有传输完毕 所以不能合并)
    - 服务端 => FIN => 客户端
    - 客户端 => ACK => 服务端

## 强缓存与协商缓存
  - 强缓存 直接设置过期时间 未到期直接使用缓存
    - 设置Cache-Control=max-age=xxx(Expires)
  - 协商缓存
    - 设置响应头 Last-Modified-Since
    - 下一次请求头带上 If-Modified-Since 然后与最后修改时间对比 相同就返回304
    - 缺点：有可能修改时间变了 但是内容没变
  - 文件指纹：根据文件内容生成一段密钥(摘要)
    - 设置响应头 Etag 指纹
    - 下一次请求会自定带上 If-none-match 如果相同就返回304状态码

## 模块化的区别
  - AMD(define定义 require获取) ---- 浏览器环境
  - CMD(都使用define定义 使用define的回调函数的参数exports定义 参数require获取 ) ---- 浏览器环境
  - COMMONJS(module.exports exports require)  ---- node环境
  - UMD ---- 通用(AMD CMD COMMONJS)
  - ESM ---- ES6规范(import export export default)