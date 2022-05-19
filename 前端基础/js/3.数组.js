/* 方法
  - push pop shift unshift splice
  - map forEach
  - filter find findIndex
  - reduce reduceRight
  - some every
  - flat
  - includes indexOf lastIndexOf
  - concat
  - join
  - reverse
  - sort
  - isArray
*/

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
})

/* ----------------------------------------- reduce ----------------------------------------- */
/* 
- 前提是数组不能为空
- 如果只有一个值 直接返回 不走循环
- flat: 用于拍平数组 第一个参数 是需要拍平的层数 默认是1 可以传
*/
;(function () {
  Array.prototype.myreduce = function (cb, prev) {
    for (let i = 0; i < this.length; i++) {
      if (!prev) {
        prev = this[i++]
      }
      prev = cb(prev, this[i], i, this)
    }
    return prev
  }
  ;(function () {
    const list = [1, 2, 3, 4]
    const total = list.myreduce((prev, next, index, array) => {
      console.log(prev, next)
      return prev + next
    }, 1)
    console.log(total)
  })

  // 实现一个 compose
  ;(function () {
    function sum(a, b) {
      return a + b
    }

    function len(str) {
      return str.length
    }

    function addPrefix(str) {
      return '$' + str
    }

    // a b => $2
    console.log(addPrefix(len(sum('a', 'b'))))

    function compose(...fns) {
      return function (...args) {
        return fns.reduceRight(
          (prev, current) => current(prev),
          fns.pop()(...args)
        )
      }
    }

    console.log(compose(addPrefix, len, sum)('a', 'b'))
  })
})
