## 进程与线程
- 进程是操作系统分配资源的最小单位 进程包含线程
  - 比如浏览器的多个tab页 一个tab页一个进程 加载互不影响
- 线程

## 浏览器的五个主要进程
- 浏览器进程: 浏览器自身展示、交互、子进程管理等
- 渲染进程: 每个页卡都有单独的渲染进程
- 网络进程
- GPU进程
- 插件进程

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