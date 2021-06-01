## 模块化的区别
  - AMD(define定义 require获取) ---- 浏览器环境
  - CMD(都使用define定义 使用define的回调函数的参数exports定义 参数require获取 ) ---- 浏览器环境
  - COMMONJS(module.exports exports require)  ---- node环境
  - UMD ---- 通用(AMD CMD COMMONJS)
  - ESM ---- ES6规范(import export export default)