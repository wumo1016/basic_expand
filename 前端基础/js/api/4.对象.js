/* ----------------------------------------- 基本 ----------------------------------------- */
/*
- function和对象的区别是什么
  - function本质上给来说可以生产别的对象，所有对象都是函数生产出来的，包括函数本身
- 为了加快对象生产的速度，就有了函数，它可以用来批量生产对象；
  - 对象的属性分为两种：有些属性是特有的，有些是公用的；为了保证灵活，为了节约性能
*/

/* ----------------------------------------- 属性的简洁表示法 ----------------------------------------- */
/* 
- 对象的属性简写
- 对象的方法简写(简写的方法不能作为构造函数)
*/

/* ----------------------------------------- 对象的遍历方法 ----------------------------------------- */
/* 
- for in (包括自身和继承的所有可枚举属性)(不含 Symbol 属性)
- Object.keys (包括自身的所有可枚举属性)(不含 Symbol 属性)
- Object.getOwnPropertyNames(包括自身的所有属性)(不含 Symbol 属性)
- Object.getOwnPropertySymbols(包括自身的所有 Symbol 属性)
- Reflect.ownKeys (包括自身的所有属性)(包含 Symbol 属性)
- 以上5中方法都遵守同样的次序遍历
  - 首先遍历所有数值键，按照数值升序排列
  - 其次遍历所有字符串键，按照加入时间升序排列
  - 最后遍历所有 Symbol 键，按照加入时间升序排列
*/

;(function () {
  const obj = {
    [Symbol(1)]: 'symbol1',
    [Symbol(2)]: 'symbol2',
    name: 'wyb',
    age: 18,
    2: '2',
    1: '1'
  }
  console.log(Reflect.ownKeys(obj)) // [ '1', '2', 'name', 'age', Symbol(1), Symbol(2) ]
})

/* ----------------------------------------- super ----------------------------------------- */
/* 
- super 
  - 指向当前对象的原型对象
  - 只能用于简写的对象的方法中
*/
;(function () {
  const proto = {
    foo: 'hello'
  }

  const obj = {
    foo: 'world',
    find() {
      return super.foo
    }
  }
  Object.setPrototypeOf(obj, proto)
  console.log(obj.find())
})

/* ----------------------------------------- 完整克隆一个对象 ----------------------------------------- */
;(function () {
  const obj = {
    name: 'wyb',
    age: 18
  }
  // 写法一
  const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj
  }

  // 写法二
  const clone2 = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)

  // 写法三
  const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )
})

/* ----------------------------------------- Object.is ----------------------------------------- */
/* 
- 比较两个值是否相等 解决原来的一些问题
*/
;(function () {
  console.log(+0 === -0) //true
  console.log(NaN === NaN) // false

  console.log(Object.is(+0, -0)) // false
  console.log(Object.is(NaN, NaN)) // true
})

/* ----------------------------------------- Object.assign ----------------------------------------- */
/* 
- 会拷贝所有目标对象的可枚举属性(包括Symbol属性)
- 如果被拷贝的值不是对象 会先将其转换成对象 如果无法转成 则直接跳过(第一个如若无法转成对象 则直接报错)
*/
;(function () {
  // 非对象处理
  const obj = { a: 1 }
  Object.assign(obj, undefined) === obj // true
  Object.assign(obj, null) === obj // true

  // 数组处理
  console.log(Object.assign([1, 2, 3], [4, 5])) // [4, 5, 3]
})

/* ----------------------------------------- Object.getPrototypeOf Object.setPrototypeOf ----------------------------------------- */
/* 
- Object.getPrototypeOf 获取原型
- Object.setPrototypeOf 设置原型
*/

/* ----------------------------------------- 数字类的属性 ----------------------------------------- */
/* 
- 所有数字类的属性会被提前，并且按照升序排序
*/
;(function () {
  const obj = {}
  obj['b'] = 1
  obj['2'] = 2
  obj['1'] = 2
  obj['a'] = 1
  obj['5'] = 2
  obj['4'] = 2

  console.log(obj) // { '1': 2, '2': 2, '4': 2, '5': 2, b: 1, a: 1 }
})()
