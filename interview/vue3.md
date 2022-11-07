## vue3 相比 vue2 的优点

- vue3 源码全部采用 TS 编写 对 TS 支持更加友好
- 源码体积优化 采用 monorepo 风格编写 需要什么 引入什么 更加友好的 tree-shaking
- 数据劫持优化 采用 proxy 大大提升了性能
- compositionApi：整合业务逻辑 提取公共业务代码
- diff 优化 采用最长递增组序算法
- 新增 Fragment(可以创建多个根节点)、Teleport(挂载到指定的 dom 上)、Suspense(异步组件)等组件
- 编译优化 实现静态模板分析
- 自定义渲染器 可以创建自定义渲染器 改写 vue 底层逻辑

## reactive 与 ref 的区别

## watch 与 watchEffect 的区别

## pinia 的优点

- 多仓库模式
- 扁平化管理
- 只保留 action
- 源码采用 ts 编写 对 ts 支持更友好
