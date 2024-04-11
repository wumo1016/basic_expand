/* JSON.stringfy的缺点 */
;(function () {
  const obj = {
    a: /\d+/,
    b: undefined,
    c: function () {},
    d: Symbol()
  }
  console.log(JSON.parse(JSON.stringify(obj)))
  // a: {} 正则被转成空对象
  // b: 直接丢失 属性值为 undefined 的 key 会直接丢失
  // c: 直接丢失 属性值为 function 的 key 会直接丢失
  // d: 直接丢失 属性值为 symbol 的 key 会直接丢失

  // 循环引用
  const obj1 = { a: 1 }
  obj1.b = {}
  obj1.b.a = obj1.b

  function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return null
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    // ...
    if (typeof obj !== 'object') return obj
    if (typeof obj === 'function') return obj

    if (hash.has(obj)) return hash.get(obj) // 如果已经拷贝过 直接返回结果
    // 对象
    const copy = new obj.constructor()
    hash.set(obj, copy) // 设置缓存
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key], hash)
      }
    }
    return copy
  }

  console.log(deepClone(obj1))
})()

function jsonStringify(data) {
  let type = typeof data

  if (type !== 'object') {
    let result = data
    //data 可能是基础数据类型的情况在这里处理
    if (Number.isNaN(data) || data === Infinity) {
      //NaN 和 Infinity 序列化返回 "null"
      result = 'null'
    } else if (
      type === 'function' ||
      type === 'undefined' ||
      type === 'symbol'
    ) {
      // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
      return undefined
    } else if (type === 'string') {
      result = '"' + data + '"'
    }
    return String(result)
  } else if (type === 'object') {
    if (data === null) {
      return 'null' // 第01讲有讲过 typeof null 为'object'的特殊情况
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON())
    } else if (data instanceof Array) {
      let result = []
      //如果是数组，那么数组里面的每一项类型又有可能是多样的
      data.forEach((item, index) => {
        if (
          typeof item === 'undefined' ||
          typeof item === 'function' ||
          typeof item === 'symbol'
        ) {
          result[index] = 'null'
        } else {
          result[index] = jsonStringify(item)
        }
      })
      result = '[' + result + ']'
      return result.replace(/'/g, '"')
    } else {
      // 处理普通对象
      let result = []
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== 'symbol') {
          //key 如果是 symbol 对象，忽略
          if (
            data[item] !== undefined &&
            typeof data[item] !== 'function' &&
            typeof data[item] !== 'symbol'
          ) {
            //键值如果是 undefined、function、symbol 为属性值，忽略
            result.push('"' + item + '"' + ':' + jsonStringify(data[item]))
          }
        }
      })
      return ('{' + result + '}').replace(/'/g, '"')
    }
  }
}
