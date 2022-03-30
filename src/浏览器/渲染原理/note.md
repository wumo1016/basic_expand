## 进程与线程
- 进程是操作系统分配资源的最小单位
  - 比如浏览器的多个tab页 一个tab页一个进程 加载互不影响
- 线程
  - 进程由很多线程组成

## 浏览器的五个主要进程
- 浏览器进程: 浏览器自身展示、交互、子进程管理等
- 渲染进程: 每个页卡都有单独的渲染进程
- 网络进程
- GPU进程
- 插件进程

## 从输入url到页面加载完成 发生了什么(细化版)
  - 网络请求
    - url解析
      - 一个完整的URL应该是: 协议+ip+端口+路径[+参数][+锚点]
      - 浏览器会判断输入的内容是一个url还是一个关键字
        - 关键字: 会自动拼接到默认搜索引擎后面的参数部分去 从而组成一个完整的url
      - 然后浏览器会对非安全字符进行转义
        - 安全字符: 数字、英文字母、少数符号
        - 非安全字符: 汉字、特殊字符(= ? & 因为这些特殊字符会和url本身的字符产生歧义)
          - 浏览器对非安全字符转义的编码叫 `百分号编码` (因为它使用%加上两位的16进制数表示)
      - `encodeURI` 和 `encodeURIComponent`
        - encodeURI:  不会编码 `?&=` 这些url内置字符 
        - encodeURIComponent: 会编码所有字符
    - 检查资源缓存
        - 强缓存 直接设置过期时间 未到期直接使用缓存
          - 设置Cache-Control：max-age=xxx(Expires)
          - 从控制台请求可以看到这类请求直接返回200 size是 `memory cache`(资源从内存中取出) 或 `disk cache`(资源从磁盘中取出)
        - 协商缓存
          - 设置响应头 Last-Modified-Since
          - 下一次请求头带上 If-Modified-Since 然后与最后修改时间对比 相同就返回304
          - 缺点：有可能修改时间变了 但是内容没变
        - 文件指纹：根据文件内容生成一段密钥(摘要)
          - 设置响应头 Etag 指纹
          - 下一次请求会自定带上 If-none-match 如果相同就返回304状态码
    - DNS解析
      - 如果没有成功使用本地缓存 就需要发起网络请求了 首先会进行DNS解析
        - 搜索过程: 浏览器DNS缓存 => 操作系统DNS缓存 => 路由器的DNS缓存 => 向服务商的DNS服务器查询 => 向全球13台根域名服务器查询
        - 为了节省时间 可以进行预DNS解析 `<link rel="dns-prefetch" href="http://www.baidu.com" />` 为了保证响应的及时性 它使用的是UDP协议
    - TSL协商密钥(HTTPS的S)
    - 建立TCP连接
    - 发送http请求与接收响应
    - 关闭TCP连接
  - 浏览器渲染
    - 构建DOM树
    - 样式计算
    - 布局定位
    - 图层分层
    - 图层绘制
    - 显示

## 渲染流程
- 解析html和css 同步进行
  - 浏览器无法直接使用HTML 需要将HTML转化成 `DOM Tree` 可以直接通过 `document` 拿到 => dom树
  - 浏览器无法直接使用纯文本的css样式 需要将其解析成 `styleSheets` 可以通过 `document.styleSheets` 拿到 => css树
- 计算出DOM树中每个节点的样式(Attachment) => dom树
- 创建渲染树(Render Tree) 将DOM树中的可见节点 添加到布局树中 计算节点位置 => 布局树
- 根据布局树 进行分层(定位属性、透明属性、transform等等) => 图层树
- 将不同图层进行绘制 然后通过合成线程处理 产生最终的页面 并显示

## 请求头
- User-Agent(用户代理)
  - 判断浏览器类型 以便做兼容处理
  - 判断是否为移动端
    - PC:     `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36`
    - Mobile: `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Mobile Safari/537.36`
  - 表示H5容器 方便调用H5容器特定接口(比如微信的嵌入网页)
  - 不安全 容易伪装