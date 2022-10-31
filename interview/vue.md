## 对 vue 的理解

- 可以快速建立一个视图应用，而且很方便的进行数据与视图之间的交互
- 渐进式框架：路由、状态管理等功能，需要的时候再引入使用
- 声明式框架：比如只关注视图是否正确的渲染，而不需要关注视图是如何渲染上去的 (对应的是命令式)
- MVVM 模式：数据改变更新视图，操作视图修改数据
- 组件化：高内聚、低耦合(一个模块只做一件事、模块之间的联系)、复用性、测试性，可以进行组件级更新
- 采用虚拟 dom：更新的时候可能有一些节点不需要更新 所以使利用虚拟 dom 使用 diff 算法只更新需要更新的 dom 即可

## 对单页面应用 SPA 的理解

- 介绍：一般只有一个 html 页面，然后引入各种打包后的文件，通过监听路由的变化，去渲染不同的页面，通常页面是不需要刷新的，所以体验较好
- 优点：
  - 局部刷新，速度快，用户体验好
- 缺点：
  - 不利用 SEO
    - 解决方案：使用服务端渲染
  - 首屏加载比较慢
    - 解决方案：首屏使用服务端渲染(SSR)，后续使用客户端渲染(SCR)

## 为什么需要虚拟 dom

- 介绍: 使用一个 js 对象去描述 dom
- 由于直接操作 dom 性能低，所以使用虚拟 dom 在视图更新的时候，可以通过 diff 算法实现最小的 dom 改变
- 使用虚拟 dom，可以实现跨平台

## 既然 vue 可以精准探测数据变化，为什么还需要虚拟 dom 进行 diff 检测差异

- 首先 vue 是根据一个 watcher 函数去渲染页面的，现在是针对一个组件创建一个 watcher，进行组件级的更新
- 如果针对每个数据都创建一个 watcher，就可能造成大量无用的 watcher 占用内存
- 所以综合考虑，使用组件级 watcher+diff 算法组合的方式去处理。如果数据变化了，只需要执行组件的 watcher 函数，然后由对比虚拟 dom 去处理具体哪些变了，更新对应的 dom 即可

## 对 mvvm 模式的理解

- Model 模型：可以直接当成一个 js 对象，用于存取数据，比如：vuex
- View 视图：就是用户看到的视图
- ViewModel 视图模型：比如是视图更新模型 模型更新视图(由数据驱动视图)
- 所以 vue 只是借鉴了这种思想 因为 vue 可以直接操作 dom 不通过数据改变视图

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
- vue2 中利用 Object.defineProperty 重写数据的 getter 和 setter get 的时候收集 watcher set 的时候触发对应的 watcher
- vue3 则使用的是 Proxy API

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

## 路由跳转时 如果目标路径与当前路径只是参数不同 组件将不会重新加载 如何刷新数据

- 使用 watch 监听$route
- 使用组件路由守卫 beforeRouterEnter
- 在 router-view 上加 key

## keep-alive 的实现原理

- keep-alive 实际上是一个内置组件
- 可以传入 include 和 exclude 并使用 watch 监听它们的变化
- 在 render 的时候将 keep-alive 的第一个子组件 vnode 缓存到 this.cache 中 并设置 vnode.data.keepAlive = true
- 当再次访问这个组件的时候 如果有缓存 直接将 vnode.componentInstance = cache[key].componentInstance
- 在 createComponent 的时候 如果 vnode.data.keepAlive=true 将直接执行组件的 patch 流程 不会重新初始化
- 匹配规则是组件的 name 或组件的 tag

## 常见的优化策略

- 数据层级不宜过深 因为需要递归做响应式
- 合理设置 key
- v-show 和 v-if 的使用
- 提取公共组件
- 纯渲染组件可以使用函数式组件
- 使用异步组件 按需加载
- 使用 keep-alive 缓存组件

## v-for 和 v-if

- v-for 的优先级更高
- 无论条件是否成立 都会循环指定次数
- 可以将指定数据先筛选出来 再循环
- 它们在编译阶段就已经完成了核心逻辑了

## 模板编译的大致过程

- parse 阶段 将 template 编译成 ast 语法树 (parseHTML)
- optimize 阶段 对静态语法做静态标记 diff 的时候 如果是静态节点直接跳过
- generate 阶段 生成字符串代码

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

## hash 路由和 history 路由模式的原理

- hash
  - 原理：通过监听 hashChange 事件
  - 缺点：不美观
- history
  - 原理：通过 pushState 事件改变 url
  - 缺点：刷新会出现 404
  - nginx 配置 `try_files $uri $uri/ index.html`

## slot 插槽

- 普通插槽
- 具名插槽
- 作用域插槽

## v-model 原理

- input：value+input 事件
- 组件：对应组件 attrs 的属性 并添加默认 input 事件(model 中定义)

## vue 源码使用了那些设计模式

- 发布订阅 $on $emit
- 观察者模式：没个属性都有一个 dep 每个 dep 保存了对应的 watcher
- 策略模式：margeOptions 组件的 data、生命周期等的合并
- 代理模式：提供一个代理对象 并有对象控制对源对象的引用 \_data \_props
- 单例模式：比如 vue 的插件 一个 vue 只会有一个插件实例
- 工厂模式：比如虚拟节点的创建 传入不同的参数即可

## vue 与 raect 的相似与区别

- 相似
  - 都使用了虚拟 dom
  - 都提倡组件化
  - 都是 props 来进行父子间的传值
- 区别
  - 写法上：vue 采用接近 html 模板的写法 而 react 推荐使用 jsx 写法
  - react 改变数据就必须使用 setState、而 vue 可以直接通过 this 改变
  - vue 主要实现了双向绑定、而 react 的数据流是单向的

## 对组件化的理解

- 可以抽离公共组件 大幅提高开发效率、测试效率
- 降低更新范围 因为 vue 是组件级的更新
- 高内聚 低耦合 单向数据流

## mutation 与 action 的区别

- mutation：主要用于修改状态 必须同步执行
- action：执行业务代码 可以异步执行 但修改状态需要通过 mutation

## Vuex 怎么知道 state 是通过 mutation 修改还是外部直接修改的

- 在 Store 实例中有一个变量 committing，使用$watch 监控 state 的变化，判断如果 committing 为 false，则就是外部直接修改的 因为在使用 commit 提交修改的时候 内部使用了一个函数对 mutation 函数进行了包装 执行 mutation 函数之前将 committing 设置为 true mutation 函数执行完毕时候 再将 committing 设置为 false

## v-model 如何处理中文输入的

- 监听 compositionstart 和 compositionend 事件
- input 事件
  - `if(e.target._tag) return`
- compositionstart
  - `e.target._tag = true`
- compositionstart
  - `e.target._tag = false`
  - `e.target.dispatchEvent(new Event('input'))`

## 父子组件的生命周期执行顺序

- 加载渲染过程
  - 父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted
- 子组件更新过程
  - 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
- 销毁过程
  - 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

## 子组件为何不能修改父组件传入的 props 如果改了 vue 是如何监控到的(https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)

- 为了保证单向数据流，便于对数据的追踪
- 在初始化 props 的时候 对 props 进行了监控 props 修改的时候会调用一个回调函数(判断如果是当前是子组件且不是在更新子组件的时候触发的 props 修改 就报警告)
