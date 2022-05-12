/* Set => add delete clear has size forEach keys valules entries */

// forEach => 三个参数 value key(等于value) 当前Set集合
// keys是valules方法的别名，与valules返回的结果一样

;(function () {
  const set = new Set([1, 2, 3, 1, 2, 3]) // 自动去重
  for (const key of set.keys()) {
    console.log(key) // 1 2 3
  }
})

/* 求数组的 交集 并集 差集 */
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
