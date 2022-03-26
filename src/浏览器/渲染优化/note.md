## performance 关键节点
  关键时间节点              描述                                            含义
  TTFB         time to first byte(首字节时间)             从请求到数据返回第一个字节所消耗时间
  TTI          Time to Interactive(可交互时间)            DOM 树构建完毕，代表可以绑定事件
  DCL          DOMContentLoaded (事件耗时)                当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发
  L            onLoad (事件耗时)                          当依赖的资源全部加载完毕之后才会触发
  FP           First Paint（首次绘制)                     第一个像素点绘制到屏幕的时间
  FCP          First Contentful Paint(首次内容绘制)       首次绘制任何文本，图像，非空白节点的时间
  FMP          First Meaningful paint(首次有意义绘制)     首次有意义绘制是页面可用性的量度标准
  LCP          Largest Contentful Paint(最大内容渲染)     在 viewport 中最大的页面元素加载的时间
  FID          First Input Delay(首次输入延迟)            用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间

## 网络优化策略
- 1.减少HTTP请求
- 2.合理设置服务端缓存
- 3.避免重定向
- 4.域名分片
- 5.使用CDN服务
- 6.gzip压缩
- 7.设置加载资源优先级 (preload prefetch(将数据缓存到HTTP缓存中))

