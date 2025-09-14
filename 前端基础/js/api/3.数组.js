/* 方法
  - push pop shift unshift splice
  - map forEach
  - filter 
  - find findIndex findLast findLastIndex
  - reduce reduceRight
  - some every
  - flat flatMap
  - includes 
  - indexOf lastIndexOf
  - concat
  - join
  - reverse
  - sort
  - isArray
  - at
  - of: 从给定的元素创建一个数组
  - copyWithin(target, start, end)
    - target: 开始替换的起始位置
    - start(可选): 复制的起始位置
    - end(可选): 复制的结束位置
  - fill(value, start, end)
    - value: 要填充的值
    - start(可选): 填充的起始位置
    - end(可选): 填充的结束位置
  - with(index, value)(Node20开始支持)
    - index: 要修改的值的索引
    - value: 要替换的值
*/

/* ----------------------------------------- forEach、map跳出循环 ----------------------------------------- */
;(function () {
  const list = [1, 2, 3, 4, 5]
  /* 方法1 */
  // try {
  //   list.forEach(it => {
  //     if (it === 3) throw new Error('error')
  //     console.log(it)
  //   })
  // } catch (error) {}

  /* 方法2 */
  list.forEach((it, index) => {
    if (it === 3) return list.splice(index)
    console.log(it)
  })
})

/* ----------------------------------------- 数组去重 ----------------------------------------- */

/* ----------------------------------------- Array.from ----------------------------------------- */
;(function () {
  const map = new Map()
  map.set('name', 'wyb')
  map.set('age', 18)
  Array.from(map, ([value, key]) => {
    console.log(key, value)
  })
})

/* ----------------------------------------- at ----------------------------------------- */
/* 
- at: 可以是负数
*/
;(function () {
  const list = [1, 2, 3, 4, 5]
  console.log(list.at(0)) // 1
  console.log(list.at(-1)) // 5
})

/* ----------------------------------------- flat flatMap ----------------------------------------- */
/* 
- 这两个方法不修改原数组 返回一个新数组
- flatMap: 接收一个函数 对每个函数的返回值执行 flat (可等同于filter和map的结合)
- flat: 用于拍平数组 第一个参数 是需要拍平的层数 默认是1 可以传 Infinity 拍平所有
*/
;(function () {
  const list1 = [
    [[1], [2]],
    [[3], [4]],
    [[5], [6]]
  ]
  // console.log(list1.flat()) // [ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ], [ 6 ] ]
  // console.log(list1.flat(2)) // [ 1, 2, 3, 4, 5, 6 ]
  // console.log(list1.flat(Infinity)) // [ 1, 2, 3, 4, 5, 6 ]
  // console.log(list1.flatMap(v => v))

  console.log([1, 2, 3, 4, 5].flatMap(v => (v > 2 ? v * 2 : [])))
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
/* ----------------------------------------- 当对象使用 ----------------------------------------- */
;(function () {
  const list = []
  list['wew'] = {
    name: '张三'
  }
  list['sdf'] = {
    name: '李四'
  }
  console.log(list) // [ wew: { name: '张三' }, sdf: { name: '李四' } ]
  console.log(Object.values(list)) // [ { name: '张三' }, { name: '李四' } ]
})
;(function () {
  const list = [1, 2]
  const q = { m: 1, n: 2 }
  const w = Object.assign(list, q)
  const { m, n } = w
  console.log(w) // [ 1, 2, m: 1, n: 2 ]
  console.log(m, n) //  1 2
})

/* ----------------------------------------- copyWithin ----------------------------------------- */
;(function () {
  const list = [1, 2, 3, 2, 4, 5]
  list.copyWithin(1, 2, 3)
  console.log(list) // [ 1, 3, 3, 2, 4, 5 ]
})

/* ----------------------------------------- fill ----------------------------------------- */
;(function () {
  const list = [1, 2, 3, 2, 4, 5]
  list.fill(6, 1)
  console.log(list) // [ 1, 6, 6, 6, 6, 6 ]
})

/* ----------------------------------------- of ----------------------------------------- */
;(function () {
  console.log(Array.of(1, 2, 3)) // [ 1, 2, 3 ]
})

/* ----------------------------------------- with ----------------------------------------- */
;(function () {
  const list = [1, 2, 3, 2, 4, 5]
  console.log(list.with(3, 4))
})
