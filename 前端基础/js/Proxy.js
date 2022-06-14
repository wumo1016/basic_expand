/* ----------------------------------------- 概览 ----------------------------------------- */
/* 
- 对代理对象做一层拦截 new Proxy(target, handler)
- 支持得拦截操作
  - get(target, key, receiver): 拦截对象得读取
  - set(target, key, value, receiver): 拦截对象的设置 返回一个布尔值
  - has(target, key): 
    - 拦截HasProperty而不是HasOwnPropert (比如 key in proxy)
    - for in不会被拦截)
    - 返回一个布尔值
  - deleteProperty(target, key): 拦截 delete proxy[key]的操作 返回一个布尔值
  - ownKeys(target): 拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环 返回一个数组
  - getOwnPropertyDescriptor(target, key)
  - defineProperty(target, key, propDesc)
  - preventExtensions(target)
  - getPrototypeOf(target)
  - isExtensible(target)
  - setPrototypeOf(target, proto)
  - apply(target, object, args) 直接调用函数 或使用 call、apply、Reflect.apply 调用都会被拦截
  - construct(target, args)
*/

/* ----------------------------------------- apply函数 ----------------------------------------- */
;(function () {
  const twice = {
    apply(target, ctx, args) {
      return Reflect.apply(...arguments) * 2
    }
  }
  function sum(left, right) {
    return left + right
  }
  const proxy = new Proxy(sum, twice)
  console.log(proxy(1, 2)) // 6
  console.log(proxy.call(null, 5, 6)) // 22
  console.log(proxy.apply(null, [7, 8])) // 30
})
