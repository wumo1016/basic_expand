/* ----------------------------------------- 概述 ----------------------------------------- */
/*
- 可作为对象的属性 (目前对象的属性有两种 字符串和 Symbol)
- Symbol不能使用 new 命令 这是因为生成的 Symbol 是一个原始类型的值 不是对象
- 可接受一个字符串作为参数 仅表示 Symbol 实例的表述
- 所有 Symbol 值都不相同
- Symbol 不能与其他类型的值进行运算 否则报错
- Symbol值可转换为字符串和布尔 但不能转换为数字
- 可以通过 description 属性拿到其描述值
- Symbol作为属性名时 不能通过.获取与设置
*/

;(function () {
  const s1 = Symbol('wyb')
  const s2 = Symbol('wyb')
  console.log(s1 === s2) // false

  console.log(s1.description) // wyb
})

/* ----------------------------------------- Symbol.for()，Symbol.keyFor() ----------------------------------------- */
/*
- Symbol.for(key): key可选 如果key已经定义过 则返回原来 Symbol 否则新创建一个返回
  - 具有登记机制 将来用 Symbol.keyFor 可以获取到key
  - 而直接使用 Symbol() 没有登记机制
- Symbol.keyFor(symbol):用于返回一个已经定义过的 Symbol 的 key
*/
;(function () {
  const s1 = Symbol('wyb')
  const s2 = Symbol.for('wyb1')

  console.log(Symbol.for('wyb') === Symbol.for('wyb')) // true
  console.log(Symbol.keyFor(s1)) // undefined
  console.log(Symbol.keyFor(s2)) // wyb1
})

/* ----------------------------------------- 内置 Symbol ----------------------------------------- */
/*
- Symbol.hasInstance
  - instanceof 调用的方法
  - 比如 foo instanceof Foo 调用的实际是 Fool[Symbol.hasInstance](foo)
- Symbol.isConcatSpreadable
  - 一个布尔值 表示一个对象被用于 concat 时 是否可以展开
- Symbol.toStringTag
- Symbol.toPrimitive
*/
;(function () {
  /* Symbol.isConcatSpreadable */
  const arr = ['b', 'c']
  arr[Symbol.isConcatSpreadable] = false
  console.log(['a'].concat(arr)) // [ 'a', [ 'b', 'c'] ]
})()

// // Symbol.toStringTag
// ;(function () {
//   const obj = {
//     [Symbol.toStringTag]: 'jw'
//   }
//   console.log(Object.prototype.toString.call(obj))
// })

// // Symbol.toPrimitive
// ;(function () {
//   const obj = {
//     [Symbol.toPrimitive](type) {
//       console.log(type)
//       return 123
//     }
//   }
//   console.log(obj + '1')
// })()
