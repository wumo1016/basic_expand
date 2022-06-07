/* ----------------------------------------- 概览 ----------------------------------------- */
/* 
- 对代理对象做一层拦截
- 支持得拦截操作
  - get(target, key, receiver): 拦截对象得读取
  - set(target, key, value, receiver): 拦截对象的设置 返回一个布尔值
  - has(target, key): 拦截 key in proxy 的操作 返回一个布尔值
  - deleteProperty(target, key): 拦截 delete proxy[key]的操作 返回一个布尔值
  - ownKeys(target): 拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环 返回一个数组
  - getOwnPropertyDescriptor(target, key)
  - defineProperty(target, key, propDesc)
  - preventExtensions(target)
  - getPrototypeOf(target)
  - isExtensible(target)
  - setPrototypeOf(target, proto)
  - apply(target, object, args)
  - construct(target, args)
*/
;(function () {})
