## 对mvvm模式的理解
  - Model模型：可以直接当成一个js对象，用于存取数据，比如：vuex
  - View视图：就是用户看到的视图
  - ViewModel视图模型：比如是视图更新模型 模型更新视图(由数据驱动视图)
  - 所以vue只是借鉴了这种思想 因为vue可以直接操作dom 不通过数据改变视图

## computed和watch的区别
  - 它们都是基于Watcher实现的 都是Watch的实例
  - 应用场景不同
    - computed是返回一个值，而且具有缓存性，依赖的值不发生变化，对其取值的方法也不会重新执行
    - watch着重于监控值的变化，当值发生变化的时候调用对应的回调函数
  - 如果computed依赖的属性和watch监听的属性相同 则computed会先执行

## 组件间的传值
  - props和emit 父向子通过props传递数据 子向父可以通过emit触发事件传递
  - $parent和$children获取当前组件的父组件和自组件
  - $attrs和$listeners用来获取当前组件传递的属性(props中未定义的)和监听的事件
  - 跨层级使用provide和inject传递数据
  - 还可以通过$refs获取子组件
  - 全局使用vuex

## 生命周期
  - 同一个组件内写多个同一个生命周期，会被覆盖
  - 生命周期函数最终都会被处理成一个数组 以便与Vue.mixin和mixins进行合并 然后依次调用

## 对响应式数据的理解
  - 首先数据变化 视图就对应的更新
  - 当在视图中使用表单等操作改变视图 就更新对应的数据
  - 利用Object.defineProperty重写数据的getter和setter get的时候收集watcher set的时候触发对应的watcher

## 如何检测数组的变化
  - 通过重写数组的七个方法(push pop shift unshift splice sort reverse)
  - 具体就是创建一个继承数组原型对象的新对象 然后重写那七个方法
  - 然后将data中数组的原型对象 __proto__ 指向这个新对象

## 为什么data必须是一个函数
  - 因为组件的构造函数只会创建一次
  - 如果data是一个对象 那么所以在创建组件实例的时候 用的data都将引用的时同一个对象

## 同步多次修改data 视图会多次渲染吗 为什么
  - 不会 因为触发视图更新的时候 执行watcher.update 会先将自己的watcher添加进queueWatcher队列中去
  - 这个函数中watcher的执行是异步的 而且添加的时候会根据组件watcher的id进行去重判断

## 组件的name有哪些好处
  - 有name的会在组件的components中添加自己 以实现递归组件
  - 可以标识组件 方便调试

## 为什么需要虚拟dom
  - 可以实现跨平台
  - 直接操作dom性能低 使用虚拟dom 当数据更新时候 可以进行diff 以实现最小的dom改变

## vue2的dom diff原理
  - 首先是平级比较 不存在跨级比较 内部采用双指针+递归实现
  - 具体步骤：
    - 1.首先比较是否是相同节点(标签名和key) 如果不是直接用新的替换掉旧的
    - 2.相同节点 就复用老节点 更新属性(如果是文本节点 直接替换内容)
    - 3.比较儿子节点patchChildren
    - 4.两个特殊情况 新有旧无 直接添加 新无旧有 直接移除
    - 5.新的旧的都有 进行比对 头头 尾尾 新头旧尾 旧头新尾 乱序比较
    - 6.最后处理头尾新增和头尾减少的情况

## key的作用
  - patch过程中会根据key判断是否是同一个节点
  - 在 patchChildren 的最后机型乱序比对的时候 会key-index映射 用来找到ke复用的节点
  - 所以如果列表会发生变化 则不能使用index作为key

## vue3相比vue2的优点
  - vue3源码全部采用TS编写 对TS支持更加友好
  - 源码体积优化 采用monorepo风格编写 需要什么 引入什么 更加友好的tree-shaking
  - 数据劫持优化 采用proxy 大大提升了性能
  - compositionApi：整合业务逻辑 提取公共业务代码
  - diff优化 采用最长递增组序算法
  - 新增Fragment(可以创建多个根节点)、Teleport(挂载到指定的dom上)、Suspense(异步组件)等组件
  - 编译优化 实现静态模板分析
  - 自定义渲染器 可以创建自定义渲染器 改写vue底层逻辑

## 单页面的优缺点
  - 优点：
    - 良好的用户体验 不同页面之间不会跳动不会重新加载整个页面
    - 减轻服务器压力 服务器只返回数据 不用管页面的逻辑和渲染
  - 缺点：
    - 首屏加载慢
    - 不利于seo

## $nextTick的原理
  - 其主要就是一个延迟回调函数timeFunc 主要实现方式有三种
    - Promise.then
    - MutationObserver
    - setTimeout

## 路由跳转时 如果目标路径与当前路径只是参数不同 组件将不会重新加载 如何刷新数据
  - 使用watch监听$route
  - 使用组件路由守卫beforeRouterEnter
  - 在router-view上加key

## keep-alive的实现原理
  - keep-alive实际上是一个内置组件
  - 可以传入include和exclude 并使用watch监听它们的变化
  - 在render的时候将keep-alive的第一个子组件vnode缓存到this.cache中 并设置vnode.data.keepAlive = true
  - 当再次访问这个组件的时候 如果有缓存 直接将 vnode.componentInstance = cache[key].componentInstance
  - 在createComponent的时候 如果vnode.data.keepAlive=true 将直接执行组件的patch流程 不会重新初始化
  - 匹配规则是组件的name或组件的tag

## 常见的优化策略
  - 数据层级不宜过深 因为需要递归做响应式
  - 合理设置key
  - v-show和v-if的获取
  - 提取公共组件
  - 纯渲染组件可以使用函数式组件
  - 使用异步组件 按需加载
  - 使用keep-alive缓存组件

## v-for和v-if
  - v-for的优先级更高
  - 无论条件是否成立 都会循环指定次数
  - 可以将指定数据先筛选出来 再循环
  - 它们在编译阶段就已经完成了核心逻辑了

## 模板编译的大致过程
  - parse阶段 将template编译成ast语法树 (parseHTML)
  - optimize阶段 对静态语法做静态标记 diff的时候 如果是静态节点直接跳过
  - generate阶段 生成字符串代码

## Vue.mixin作用与原理
  - 用于扩展全局属性和方法
  - 其实就是在Vue.options上扩展属性
  - data
    - mixin中的data必须是一个函数 因为它会被合并到每个组件中去
  - 生命周期
    - 它的生命周期会优先执行 因为它在初始化组件构造函数的时候已经添加进去了

## Vue.set作用与原理
  - 用于给响应式对象或数组添加新属性
  - 如果是数组 直接调用数组的splice方法
  - 如果是新添加的属性 使用defineReactive设置响应式 然后手动派发更新

## Vue.use的作用与原理
  - 用于扩展全局插件
  - 如果传入的是个函数 则直接调用 如果是对象且有install函数 则调用install'函数
  - 还会在Vue._installedPlugins上缓存组件 防止一个插件被注册多次