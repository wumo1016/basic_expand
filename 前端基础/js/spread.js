
// 深拷贝 浅拷贝
// 展开运算符 ... 都是浅拷贝

/* JSON.stringfy的缺点 */
(function(){
  const obj = {
    a: /\d+/,
    b: undefined,
    c: function(){},
    d: Symbol()
  }
  console.log(JSON.parse(JSON.stringify(obj)));
  // a: {} 正则被转成空对象
  // b: 直接丢失 属性值为 undefined 的 key 会直接丢失
  // c: 直接丢失 属性值为 function 的 key 会直接丢失
  // d: 直接丢失 属性值为 symbol 的 key 会直接丢失

  // 循环引用
  const obj1 = { a: 1 }
  obj1.b = {}
  obj1.b.a = obj1.b

  function deepClone(obj, hash = new WeakMap()){
    if(obj == null) return null
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    // ...
    if(typeof obj !== 'object') return obj
    if(typeof obj === 'function') return obj

    if(hash.has(obj)) return hash.get(obj) // 如果已经拷贝过 直接返回结果
    // 对象
    const copy = new obj.constructor
    hash.set(obj, copy) // 设置缓存
    for (const key in obj) {
      if(obj.hasOwnProperty(key)){
        copy[key] = deepClone(obj[key], hash)
      }
    }
    return copy
  }

  console.log(deepClone(obj1));

})();
