## 介绍

- 每个文件都是一个模块
- 每个模块的代码实际上都是运行在一个函数中(可以打印 arguments), 并接受 5 个参数
  - `exports`
  - `require`
  - `module`
  - `__filename`
  - `__dirname`

## 伪代码

```js
function require(modulePath) {
  // 1.根据模块路径获取模块的完整路径
  var moduleId = getModuleId(modulePath)
  // 2.判断缓存
  if (cache[moduleId]) {
    return cache[moduleId]
  }
  // 3.真正运行代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 模块代码运行在这里
  }
  // 4.准备并运行辅助代码
  var module = {
    exports: {}
  }
  var exports = module.exports
  // 获取模块的绝对路径
  var __filename = moduleId
  // 获取模块所在目录的绝对路径
  var __dirname = getDirname(__filename)
  // 运行函数
  _require.call(exports, exports, require, module, __filename, __dirname)

  // 5.缓存模块
  cache[moduleId] = module.exports
  // 6.返回
  return module.exports
}
```
