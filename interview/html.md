## 前端需要注意哪些seo
  - 语义化标签(header footer nav article section aside)
  - 合理的title、description(meta)、keywords(meta) 搜索对三者的权重逐渐减小
    - `<title>web 技术教程</title>`
    - `<meta name="description" content="免费的 web 技术教程。" />`
    - `<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript" />`
  - 图片都添加alt
  - 少用iframe

## script上的async和defer是什么区别
  - 都没有: 遇到即加载并执行 再继续解析文档
  - async: 解析和执行与文档的解析与渲染同步进行
  - defer: 遇到先加载 与文档的解析和渲染同步进行 但执行会在文档的解析和渲染完毕后 DOMContentLoaded事件之前

## 重排(回流)和重绘
  - 重排和重绘合称为渲染
    - 以下三种情况会导致重新渲染: 
      - 修改DOM
      - 修改样式表
      - 用户事件(改变窗口大小等)
    - `重绘不一定重排，但重排一定会导致重绘`
  - 重排: 重新生成布局
    - 添加元素、删除元素、修改大小、移动元素、获取元素位置信息
  - 重绘: 重新绘制
    - 改变某个元素的颜色
  - 减少重新渲染的操作
    - 尽量不要把读操作和写操作混在一起 因为如果在一个写操作后执行读操作 会立即触发重排或重绘
    - 不要一条条的改变样式 可以通过class或classText一次性的改变样式
    - 可以使用离线dom 
      - 添加新元素 使用documentFragment 操作完成后直接添加到文档
      - 如果是已有dom 使用cloneNode克隆节点 操作完后 替换原来的dom
    - 如果一个元素操作较大 可以显示设置display:none 操作完后再设置回去 这样只会触发一次重新渲染
    - 静态定位和固定定位的元素 重排的开销较小