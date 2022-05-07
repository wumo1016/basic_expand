/* ----------------------------------------- Array.from  ----------------------------------------- */
;(function () {
  const map = new Map()
  map.set('name', 'wyb')
  map.set('age', 18)
  Array.from(map, ([value, key]) => {
    console.log(key, value)
  })
})

/* ----------------------------------------- at  ----------------------------------------- */
/* 
- at: 可以是负数
*/
;(function () {
  const list = [1, 2, 3, 4, 5]
  console.log(list.at(0)) // 1
  console.log(list.at(-1)) // 5
})

/* ----------------------------------------- flat、flatMap  ----------------------------------------- */
/* 
- 这两个方法不修改原数组 返回一个新数组
- flatMap: 接收一个函数 对每个函数的返回值执行 flat
- flat: 用于拍平数组 第一个参数 是需要拍平的层数 默认是1 可以传
*/
;(function () {
  const list1 = [
    [[1], [2]],
    [[3], [4]],
    [[5], [6]]
  ]
  console.log(list1.flat()) // [ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ], [ 6 ] ]
  console.log(list1.flat(2)) // [ 1, 2, 3, 4, 5, 6 ]
  console.log(list1.flat(Infinity)) // [ 1, 2, 3, 4, 5, 6 ]
  // console.log(list1.flatMap(v => v))
})()
