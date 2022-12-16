## express 和 koa 的区别

- koa 比 express 更加轻量 他没有内置各种中间件的支持
- 最大的差别是回调和中间件的处理逻辑
  - express 采用的回调
  - koa2 采用的 async+await
- 此外 koa 在插件回调中添加了 ctx 上下文的概念
  - 在原生基础上添加了一些扩展属性 也可以避免直接操作 res
  - 还可以在 ctx 上自定义属性 以便在多层级中共享

## nodejs 异步 I/O 模型

- 是指 nodejs 是一个非阻塞 I/O 模型
- 它可以同时处理多个 I/O 请求, 不会造成阻塞
