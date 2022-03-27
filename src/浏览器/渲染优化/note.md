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

## 渲染优化
- 脱离文档流
- 尽量使用CSS3动画(不会导致回流 只会重绘)

## 静态文件优化

- 图片优化
  - 图片格式
    - jpg: 适合色彩丰富的照片、banner图；不适合图形文字、图标（纹理边缘有锯齿），不支持透明度
    - png: 适合纯色、透明、图标，支持半透明；不适合色彩丰富图片，因为无损存储会导致存储体积大
    - svg: 相比于jpg和jpg它的体积更小,渲染成本过高,适合小且色彩单一的图标;
    - webp: 适合半透明图片，可以保证图片质量和较小的体积(兼容性问题)
    - gif: 适合动画，可以动的图标；不支持半透明，不适和存储彩色图片
  - 图片优化
    - img标签设置alt属性 图片加载的时候可以显示
    - 使用原生的loading:lazy属性(只有图片到可视区域内 才会显示) `<img loading="lazy" src="..." width="300" height="450" />`
    - 不同的屏幕显示不同尺寸的图片 `<img src="./images/1.jpg" sizes="(max-width:500px) 100px,(max-width:600px) 200px"  srcset="./images/1.jpg 100w, ./images/3.jpg 200w">`
    - 较大的图采用渐进式图片(PS可以设置)
    - 采用base64减少图片请求(大小会增加1/3)
    - 采用雪碧图

- HTML优化
  - 语义化HTML
  - 减少标签嵌套 较少dom数量
  - 删除无用的空格、空行、注释
  - 减少iframe使用(可以采用js动态加载iframe)
  - 避免使用table布局

- CSS优化
  - 使用单独的css文件 可以缓存
  - 减少 @import 使用 因为@import采用的是串行加载 a.css => b.css => c.css

- JS优化
  - 通过async、defer异步加载文件
  - 缓存访问过的元素 减少获取元素
  - IntersectionObserver => `2.intersection.html`
  - requestAnimationFrame requestIdleCallbac

## LightHouse使用
  ```javascript
  npm install lighthouse -g
  lighthouse http://www.taobao.com
  ```