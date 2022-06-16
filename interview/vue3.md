## vue3 与 vue2 的区别

- 源码结构
- 全局采用 TS 编写
- 数据劫持原理
- composition API
- 新的内置组件
  - teleport: 穿梭组件
    - 将组件挂载到指定的选择器上
  - suspense: 异步组件
    - setup 函数返回一个 Promise1
- 自定义渲染器

## reactive 的实现原理

- 响应式的原理
- 为什么使用 Reflect
- 如何处理重复代理问题
  - 重复代理原对象
  - 代理代理过的 proxy
- 如何实现的懒代理
- 对数组的处理 2 点

## effect 的实现原理

- 做了什么
  - new ReactiveEffect(fn)
- 返回值
  - effect.run

## 响应式原理

- track => trackEffects
- trigger => triggerEffects

## ref 的实现原理

## computed 的实现原理

## watch 的实现原理
