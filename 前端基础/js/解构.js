/* 解构赋值
- 规则是: 只要等号右边不是对象或数组 都会先将其转成对象
- 由于null和undefined无法转成对象 所以会直接报错
*/

/* ----------------------------------------- 深层解构 ----------------------------------------- */

;(function () {
  let obj = {
    p: ['Hello', { y: 'World' }]
  }
  // 同时获取变量 与 变量的结构
  const {
    p: p1,
    p: [data1]
  } = obj
  console.log(p1) // ['Hello', { y: 'World' }]
  console.log(data1) // 'Hello'
})

/* ----------------------------------------- 嵌套赋值 ----------------------------------------- */
;(function () {
  let obj = {}
  let arr = []

  ;({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })

  console.log(obj) // {prop:123}
  console.log(arr) // [true]
})

/* ----------------------------------------- 已声明的变量赋值 ----------------------------------------- */
;(function () {
  let a = ''
  ;({ a } = { a: 'wyb' })
  console.log(a) // wyb
})

/* ----------------------------------------- 数组的对象解构 ----------------------------------------- */
;(function () {
  const list = [1, 2, 3]
  let { 0: a, [list.length - 1]: b } = list
  console.log(a, b) // 1, 3
})()

/* ----------------------------------------- 字符串的解构赋值 ----------------------------------------- */
;(function () {
  const [a, b, c] = 'wyb'
  console.log(a, b, c) // w y b
})()
