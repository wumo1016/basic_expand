/* Map => set get delete size has clear forEach keys values entries */

// forEach => 三个参数 value key(等于value) 当前Map

;(function () {
  const map = new Map([
    // 相同的key会被后面的覆盖
    ['a', 1],
    ['b', 1],
    ['b', 2]
  ])
  for (const key of map.keys()) {
    console.log(key) // a b
  }
})

/* WeakMap => set get has delete */
// 不会影响垃圾回收 map引用的对象置为null时 后续会被清空 但Map不会
// key 只能是对象
;(function () {
  // 复制到控制台打开 最后输出map map的key仍然有值 说明引用仍然存在
  class Test {}
  let test = new Test()
  const map = new Map()
  map.set(test, 123)
  test = null
})
;(function () {
  // 复制到控制台打开 最后输出map
  class Test {}
  let test = new Test()
  const map = new WeakMap()
  map.set(test, 123)
  test = null
})()

// 还可以将上述代码复制到 index.html中 查看 Memory 点击第一个圆按钮 进行拍照 然后输入Test进行筛选 可以看见Test是否还有引用
