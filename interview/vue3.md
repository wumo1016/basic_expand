## vue3 相比 vue2 的优点

- vue3 源码全部采用 TS 编写 对 TS 支持更加友好
- 源码体积优化 采用 monorepo 风格编写 需要什么 引入什么 更加友好的 tree-shaking
- 数据劫持优化 采用 proxy 大大提升了性能
- compositionApi：整合业务逻辑 提取公共业务代码
- diff 优化 采用最长递增组序算法
- 新增 Fragment(可以创建多个根节点)、Teleport(挂载到指定的 dom 上)、Suspense(异步组件)等组件
- 编译优化 实现静态模板分析
- 自定义渲染器 可以创建自定义渲染器 改写 vue 底层逻辑

## reactive 的实现原理

- 响应式的原理
- 为什么使用 Reflect
- 如何处理重复代理问题
  - 重复代理原对象
  - 代理代理过的 proxy
- 如何实现的懒代理
- 对数组的处理 2 点

## effect 的实现原理

## ref 的实现原理

## computed 的实现原理

## watch 的实现原理
