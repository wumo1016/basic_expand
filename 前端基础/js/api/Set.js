/* ----------------------------------------- Set  ----------------------------------------- */
/* 
- Set函数: 接收一个数组 (或具有iterable接口的其他数据结构)
- 属性
  - size
- 方法 
  - 操作方法
    - add
    - delete
    - has
    - clear 
  - 遍历方法
    - keys 
    - values 与keys方法的行为一致
    - entries => [ 1, 1 ], [ 2, 2 ], [ 3, 3 ]
    - forEach(value, key, 当前Set集合)
    - for of
*/
;(function () {
  const set = new Set([1, 2, 3, 1, 2, 3]) // 自动去重
  for (const key of set) {
    console.log(key) // 1 2 3
  }
})

/* ----------------------------------------- WeakSet ----------------------------------------- */
/* 
- 它的成员只能是对象
- 它对对象的引用是弱引用 不影响垃圾回收
- 方法
  - add
  - delete
  - has
- 注意
  - 没有size和forEach属性或方法
  - 不能被遍历 因为都是弱引用 随时都会消失
*/

/* ----------------------------------------- 交集 并集 差集 ----------------------------------------- */
;(function () {
  const arr1 = [1, 2, 3, 4]
  const arr2 = [3, 4, 5, 6]
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  // 并集
  console.log(...new Set([...arr1, ...arr2]))
  // 交集
  console.log(arr1.filter(v => set2.has(v)))
  // 差集
  console.log(arr1.filter(v => !set2.has(v)))
  console.log(arr2.filter(v => !set1.has(v)))
})
