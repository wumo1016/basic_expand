/* ----------------------------------------- Map ----------------------------------------- */
/* 
- 简介
  - 任何具有Iterator接口 且每个成员都是一个双数组成员数组的数据结构 都可以作为Map的参数 比如: 数组 Set
  - 如果同一个键多次赋值 后面的值将覆盖前面的值
  - 如果读取一个不存在的键 则返回undefined
- 属性
  - size
- 方法 
  - 操作方法
    - get
    - set
    - delete
    - has
    - clear
  - 遍历方法
    - keys 
    - values 与keys方法的行为一致
    - entries => [ 'a', 1 ], [ 'b', 2 ]
    - forEach(value, key, 当前Map集合)
      - 可接收第二个参数 用于绑定里面的this
    - for of
- 其他
  - 对象 => Map: new Map(Object.entries({ name: 'wyb' }))
*/
;(function () {
  const map = new Map([
    // 相同的key会被后面的覆盖
    ['a', 1],
    ['b', 1],
    ['b', 2]
  ])
  for (const key of map.entries()) {
    console.log(key) // a b
  }
})
;(function () {
  // 复制到控制台打开 最后输出map map的key仍然有值 说明引用仍然存在
  class Test {}
  let test = new Test()
  const map = new Map()
  map.set(test, 123)
  test = null
})

/* ----------------------------------------- WeakMap ----------------------------------------- */
/* 
- 简介
  - 键名只能是对象
  - 键名所指向的对象 不计入垃圾回收机制 (键值不受影响)
- 方法 
  - 操作方法
    - get
    - set
    - delete
    - has
*/

// 复制到控制台打开 最后输出map
// 还可以将上述代码复制到 index.html中 查看 Memory 点击第一个圆按钮 进行拍照 然后输入Test进行筛选 可以看见Test是否还有引用
;(function () {
  class Test {}
  let test = new Test()
  const map = new WeakMap()
  map.set(test, 123)
  test = null
})

/* ----------------------------------------- WeakRef ----------------------------------------- */
/* 
- 简介
  - 用于直接创建对象的弱引用
- 方法
  - deref: 用于判断原始对象是否已经被垃圾回收机制回收 如果存在 返回原始对象 否则返回undefined
- 作用
  - 作为缓存: 未被清除时直接取缓存
- 其他
  - 标准规定: 一旦使用WeakRef创建了对象的弱引用 那么原始对象在本轮事件循环种一定不会被清除 只有在后面的事件循环种才会被清除
*/
;(function () {
  let target = {}
  let wr = new WeakRef(target)
  let obj = wr.deref()
  console.log(obj)
})()

/* ----------------------------------------- FinalizationRegistry ----------------------------------------- */
/* 
- 简介
  - 清理器注册表功能 用来指定对象被垃圾回收机制回收以后 所执行的回调函数
- https://es6.ruanyifeng.com/#docs/set-map#FinalizationRegistry
*/
