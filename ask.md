# 浏览器

## 从输入 url 到页面加载完成 发生了什么(3+6)

- DNS 解析 url 将 url 解析成 ip 地址
- 和 ip 建立 tcp 连接 发送 http 请求
- 服务器接收到请求 返回拼接好的 http 响应
- 浏览器收到首屏 html 开始渲染
- 解析 html 为 dom
- 解析 css 为 css-tree
- dom+css 生成 render-tree
- 加载 js 文件
- 执行 js

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
  - 服务器 => SYN + ACK => 客户端
  - 客户端 => ACK => 服务端
- 四次挥手
  - 客服端 => FIN => 服务器
  - 服务端 => ACK => 客户端(此时数据可能没有传输完毕 所以不能合并)
  - 服务端 => FIN => 客户端
  - 客户端 => ACK => 服务端

## 强缓存与协商缓存

- 强缓存 直接设置过期时间 未到期直接使用缓存
  - 设置 Cache-Control：max-age=xxx(Expires)
- 协商缓存
  - 设置响应头 Last-Modified-Since
  - 下一次请求头带上 If-Modified-Since 然后与最后修改时间对比 相同就返回 304
  - 缺点：有可能修改时间变了 但是内容没变
- 文件指纹：根据文件内容生成一段密钥(摘要)
  - 设置响应头 Etag 指纹
  - 下一次请求会自定带上 If-none-match 如果相同就返回 304 状态码

## 图片使用 base64 编码的优缺点

- 优点
  - 较少 http 请求
- 缺点
  - 编码的文件会比原来大 1/3
  - 无法直接缓存 只能通过 html css 缓存
  - ie8 以前不支持
  - 一般只用于小图片的引入

## 前端需要注意哪些 seo

- 语义化标签(header footer nav article section aside)
- 合理的 title、description(meta)、keywords(meta) 搜索对三者的权重逐渐减小
  - `<title>web 技术教程</title>`
  - `<meta name="description" content="免费的 web 技术教程。" />`
  - `<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript" />`
- 图片都添加 alt
- 少用 iframe

## script 上的 async 和 defer 是什么区别

- 都没有：遇到即加载并执行 再继续解析文档
- async：解析和执行与文档的解析与渲染同步进行
- defer：遇到先加载 与文档的解析和渲染同步进行 但执行会在文档的解析个渲染完毕后 DOMContentLoaded 事件之前

## 网页的生成过程

- 1.HTML 代码转换成 DOM
- 2.CSS 代码转换成 CSSOM
- 3.DOM 和 CSSOM 结合生成 render tree 渲染树
- 4.生成布局
- 5.进行绘制

## 重排(回流)和重绘

- 重排和重绘合称为渲染
  - 以下三种情况会导致重新渲染：
    - 修改 DOM
    - 修改样式表
    - 用户事件(改变窗口大小等)
  - `重绘不一定重排，但重排一定会导致重绘`
- 重排：重新生成布局
  - 改变某个元素的位置
- 重绘：重新绘制
  - 改变某个元素的颜色
- 减少重新渲染的操作
  - 尽量不要把读操作和写操作混在一起 因为如果在一个写操作后执行读操作 会立即触发重排或重绘
  - 不要一条条的改变样式 可以通过 class 或 classText 一次性的改变样式
  - 可以使用离线 dom
    - 添加新元素 使用 documentFragment 操作完成后直接添加到文档
    - 如果是已有 dom 使用 cloneNode 克隆节点 操作完后 替换原来的 dom
  - 如果一个元素操作较大 可以显示设置 display:none 操作完后再设置回去 这样只会触发一次重新渲染
  - 静态定位和固定定位的元素 重排的开销较小

# CSS

## link 和@import

- link
  - `<link href="CSSurl路径" rel="stylesheet" type="text/css" />`
- @import
  - `@import(url)`
- 区别
  - link 属于 html 标签 @import 在 css 中使用
  - 加载时机：link 会遇到就加载，而@import 是在页面加载后再加载
  - 兼容性：@import 是 css2.1 后才提出来的

## 如何移除 display:inline-block 的空白间隙

- 父元素设置`font-size:0` 子元素再单独设置`font-size`
- 给元素设置负 margin
- 移除空格或换行符

## 手写动画的最小间隔

- 要根据屏幕的刷新率而定
- 一般的屏幕都是 60HZ 所以最小时间间隔就是 1000/60 = 16.67ms

## transition 和 animation 的区别

- transition 关注的是 css 属性的变化 属性值和时间是一个三次贝塞尔曲线
- animation 关注的是元素本身 动画更加灵活
  - name：需要绑定的 keyframe 名称
  - duration：完成动画所需要的时间
  - time-function：规定动画的速度曲线 linear(匀速) ease(低速->加快->慢) ease-in(低速开始) ease-out(低速结束) ease-in-out(低速开始和结束)
  - delay：动画开始之前的延迟
  - iteration-count：动画播放的次数 infinite(无限次)
  - direction：是否反向播放 normal(正常) alternate(反向)

# JS

## new 的实现原理

- 创建一个新对象 并将目标对象的**proto**设置为构造函数的 prototype
- 执行构造函数 并将 this 指向这个新对象
- 返回这个新对象

```javascript
function _new(classzz, ...args) {
  const obj = Object.create(classzz.prototype)
  classzz.call(obj, ...args)
  return obj
}
```

## 原型链

- 函数都有一个 prototype 属性 指向原型对象
- 对象都有一个**proto**属性 指向构造函数原型对象
- 最顶端就是 Object.prototype.**proto** 就是 null

## 对象的属性描述符

- configurable：是否可修改
- enumerable：是否可枚举
- value：属性对应的值
- writable：是否可以通过赋值运算符改变
- get
- set

## 防抖和节流

- 防抖：在指定时间内连续触发，只会执行一次，分为立即执行和非立即执行
  - 应用：搜素框输入 input 触发搜索、窗口变化后重新渲染图表等
- 节流：在指定时间内连续触发，只在每个指定时间段内执行一次
  - 应用：滚动加载更多、高频点击、表单重复提交

## this 的理解

- 谁调用 就指向谁
- 如果是 new 出来的 this 就指向那个 new 出来的对象
- 事件中 this 执行触发这个事件的对象

## 事件模型

- 事件发生的三个阶段 事件捕获阶段 + 事件处理阶段 + 事件冒泡阶段
- 阻止冒泡：
  - 标准：`e.stopPropagation()`
  - IE：`window.event.cancelBubble = false`
- 阻止捕获：
  - 标准：e.preventDefault()
  - IE：`window.event.returnValue`

## 箭头函数

- 不能被绑定 this 使用 this 时 会自动捕获上下文中的 this 作为自己的 this
- 没有 arguments 参数 使用 rest 参数代替
- 不能作为构造函数 不能被 new
- 不能使用 yield 命令 就是不能当作 generator 函数

## JSON.parse(JSON.stringfy(obj))的弊端

    - 会忽略undefined、symbol、函数
    ```javascript
    let obj = {
      age: undefined,
      sex: Symbol('male'),
      jobs: function () {},
    }
    console.log(JSON.parse(JSON.stringify(obj))) // {}
    ```
    - 不能解决循环引用问题 会直接报错
    ```javascript
    let obj = {
      b: {
        c: 2
      }
    }
    obj.b.c = obj.b
    console.log(JSON.parse(JSON.stringify(obj)))
    ```

# vue

## computed 和 watch 的区别

- 它们都是基于 Watcher 实现的 都是 Watch 的实例
- 应用场景不同
  - computed 是返回一个值，而且具有缓存性，依赖的值不发生变化，对其取值的方法也不会重新执行
  - watch 着重于监控值的变化，当值发生变化的时候调用对应的回调函数
- 如果 computed 依赖的属性和 watch 监听的属性相同 则 computed 会先执行

## 组件间的传值

- props 和 emit 父向子通过 props 传递数据 子向父可以通过 emit 触发事件传递
- $parent和$children 获取当前组件的父组件和自组件
- $attrs和$listeners 用来获取当前组件传递的属性(props 中未定义的)和监听的事件
- 跨层级使用 provide 和 inject 传递数据
- 还可以通过$refs 获取子组件
- 全局使用 vuex

## 生命周期

- 同一个组件内写多个同一个生命周期，会被覆盖
- 生命周期函数最终都会被处理成一个数组 以便与 Vue.mixin 和 mixins 进行合并 然后依次调用

## 对响应式数据的理解

- 首先数据变化 视图就对应的更新
- 当在视图中使用表单等操作改变视图 就更新对应的数据
- 利用 Object.defineProperty 重写数据的 getter 和 setter get 的时候收集 watcher set 的时候触发对应的 watcher

## 如何检测数组的变化

- 通过重写数组的七个方法(push pop shift unshift splice sort reverse)
- 具体就是创建一个继承数组原型对象的新对象 然后重写那七个方法
- 然后将 data 中数组的原型对象 **proto** 指向这个新对象
- 通过索引改变数据和长度的变化 是无法监控到的

## 为什么 data 必须是一个函数

- 因为组件的构造函数只会创建一次
- 如果 data 是一个对象 那么所以在创建组件实例的时候 用的 data 都将引用的时同一个对象

## 同步多次修改 data 视图会多次渲染吗 为什么

- 不会 因为触发视图更新的时候 执行 watcher.update 会先将自己的 watcher 添加进 queueWatcher 队列中去
- 这个函数中 watcher 的执行是异步的 而且添加的时候会根据组件 watcher 的 id 进行去重判断

## 组件的 name 有哪些好处

- 有 name 的会在组件的 components 中添加自己 以实现递归组件
- 可以标识组件 方便调试

## 为什么需要虚拟 dom

- 可以实现跨平台
- 直接操作 dom 性能低 使用虚拟 dom 当数据更新时候 可以进行 diff 以实现最小的 dom 改变

## vue2 的 dom diff 原理

- 首先是平级比较 不存在跨级比较 内部采用双指针+递归实现
- 具体步骤：
  - 1.首先比较是否是相同节点(标签名和 key) 如果不是直接用新的替换掉旧的
  - 2.相同节点 就复用老节点 更新属性(如果是文本节点 直接替换内容)
  - 3.比较儿子节点 patchChildren
  - 4.两个特殊情况 新有旧无 直接添加 新无旧有 直接移除
  - 5.新的旧的都有 进行比对 头头 尾尾 新头旧尾 旧头新尾 乱序比较
  - 6.最后处理头尾新增和头尾减少的情况

## key 的作用

- patch 过程中会根据 key 判断是否是同一个节点
- 在 patchChildren 的最后机型乱序比对的时候 会 key-index 映射 用来找到 ke 复用的节点
- 所以如果列表会发生变化 则不能使用 index 作为 key

## 单页面的优缺点

- 优点：
  - 良好的用户体验 不同页面之间不会跳动不会重新加载整个页面
  - 减轻服务器压力 服务器只返回数据 不用管页面的逻辑和渲染
- 缺点：
  - 首屏加载慢
  - 不利于 seo

## $nextTick 的原理

- 其主要就是一个延迟回调函数 timeFunc 主要实现方式有三种
  - Promise.then
  - MutationObserver
  - setTimeout

## keep-alive 的实现原理

- keep-alive 实际上是一个内置组件
- 可以传入 include 和 exclude 并使用 watch 监听它们的变化
- 在 render 的时候将 keep-alive 的第一个子组件 vnode 缓存到 this.cache 中 并设置 vnode.data.keepAlive = true
- 当再次访问这个组件的时候 如果有缓存 直接将 vnode.componentInstance = cache[key].componentInstance
- 在 createComponent 的时候 如果 vnode.data.keepAlive=true 将直接执行组件的 patch 流程 不会重新初始化
- 匹配规则是组件的 name 或组件的 tag

## Vue.mixin 作用与原理

- 用于扩展全局属性和方法
- 其实就是在 Vue.options 上扩展属性
- data
  - mixin 中的 data 必须是一个函数 因为它会被合并到每个组件中去
- 生命周期
  - 它的生命周期会优先执行 因为它在初始化组件构造函数的时候已经添加进去了

## Vue.set 作用与原理

- 用于给响应式对象或数组添加新属性
- 如果是数组 直接调用数组的 splice 方法
- 如果是新添加的属性 使用 defineReactive 设置响应式 然后手动派发更新

## Vue.use 的作用与原理

- 用于扩展全局插件
- 如果传入的是个函数 则直接调用 如果是对象且有 install 函数 则调用 install'函数
- 还会在 Vue.\_installedPlugins 上缓存组件 防止一个插件被注册多次

## vue 源码使用了那些设计模式

- 发布订阅 $on $emit
- 观察者模式：没个属性都有一个 dep 每个 dep 保存了对应的 watcher
- 策略模式：margeOptions 组件的 data、生命周期等的合并
- 代理模式：提供一个代理对象 并有对象控制对源对象的引用 \_data \_props
- 单例模式：比如 vue 的插件 一个 vue 只会有一个插件实例
- 工厂模式：比如虚拟节点的创建 传入不同的参数即可

## vue-router hash 路由和 history 路由模式的原理

- hash
  - 原理：通过监听 hashChange 事件
  - 缺点：不美观
- history
  - 原理：通过 pushState 事件改变 url
  - 缺点：刷新会出现 404
  - nginx 配置 `try_files $uri $uri/ index.html`

## vuex mutation 与 action 的区别

- mutation：主要用于修改状态 必须同步执行
- action：执行业务代码 可以异步执行 但修改状态需要通过 mutation
