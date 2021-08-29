/**
 * 1.编程范式
 * 2.高阶函数
 * 3.纯函数
 * 4.函数柯里化
 * 5.组合函数
 * 6.PointFree
 * 7.容器 有指向容器
 */

/**
 * 函数编程是一种编程范式
 * 1.面向过程 如C语言
 * 2.面向对象 必须有个类 调用实例方法 如java
 * 3.函数编程式 核心是一种映射关系 参数是输入 返回值是输出 相同的输入会产生相同的输出
 */

!function () {
  // 面向过程
  let a = 1,
    b = 2
  let add = a + b
  console.log(add)
  // 面向对象
  class Calculator {
    add(add) {
      return a + b
    }
  }
  const c = new Calculator()
  const r = c.add(1, 2)
  // 函数式编程
  function add1() {
    return a + b
  }
  let r1 = add1(1, 2)
  console.log(r1)
}

/**
 * 函数是一等公民
 * 1.可以赋值给变量
 * 2.可以作为参数
 * 3.可以作为返回值
 *
 * 作为参数和返回值的函数被称为高阶函数
 */

!function () {
  // 闭包
  function init() {
    let name = 'wyb'
    function getName() {
      console.log(name)
    }
    return getName
  }
  let getName = init()
  getName()
}

/**
 * 纯函数
 * 1.相同的输入一定会产生相同的输出
 * 2.没有副作用 (不会修改除自己作用域外的外部变量)
 *
 * 优点
 * 1.可以缓存 lodash的memoize缓存 只要参数一致 结果就会被缓存
 * 2.可测试 (单元测试)
 */

!function () {
  function add(a, b) {
    return a + b
  }

  // lodash缓存
  let _ = require('lodash')
  function add1(a, b) {
    console.log('add1执行')
    return a + b
  }
  const resolver = (...args) => JSON.stringify(args)
  // const add2 = _.memoize(add1, resolver)
  const add2 = memoize(add1, resolver)
  console.log(add2(1, 2))
  console.log(add2(1, 2))
  console.log(add2(1, 2))

  // 自己实现 memoize
  function memoize(func, resolver) {
    let cache = {}
    let memoized = (...args) => {
      const key = resolver(...args)
      if (cache[key]) return cache[key]
      return (cache[key] = func(...args))
    }
    return memoized
  }
}

/**
 * 函数柯里化
 */
!function () {
  const _ = require('lodash')

  function add(a, b, c) {
    return a + b + c
  }

  // let curry1 = _.curry(add)
  let curry1 = curry(add)
  console.log(curry1(1, 2, 3))
  console.log(curry1(1)(2, 3))
  console.log(curry1(1)(2)(3))

  // 自己实现 curry
  function curry(func) {
    let argLen = func.length // 形参的个数
    let curried = (...args) => {
      if (args.length >= argLen) return func(...args)
      return (...rest) => curried(...args, ...rest)
    }
    return curried
  }
}

/**
 * 组合
 *
 */

!function () {
  const _ = require('lodash')

  let str = 'hello'
  function add1(str) {
    return str + 1
  }
  function add2(str) {
    return str + 2
  }
  function add3(str) {
    return str + 3
  }
  // 手工组合
  console.log(add3(add2(add1(str)))) // hello123
  // 使用lodash的flow
  let flowed = _.flow(add1, add2, add3)
  console.log(flowed(str))
  // 自己实现flow
  function flow(...fns) {
    return fns.reduce(
      (a, b) =>
        (...args) =>
          b(a(...args))
    )
  }
  let myflow = flow(add1, add2, add3)
  console.log(myflow(str))
}

/**
 * Pointfree: 把数据处理的过程先定义成一种与参数无关的合成运算
 * 先定义处理过程 再传入参数
 */
!function () {
  const _ = require('lodash/fp')

  function buyHouse(money) {
    return money - 100
  }
  function buyCar(money) {
    return money - 100
  }
  const fn = _.compose(buyCar, buyHouse)
  console.log(fn(500))
}

/**
 * Container: 如果一个对象内部能够持有一个值 我们就称为它为一个容器
 * Point Container: 如果一个容器内部有of方法 我们就称它为有指向的容器
 */
!(function () {
  // 容器
  class Container {
    constructor(value) {
      this.value = value
    }
  }
  const container = new Container('wyb')
  console.log(container.value)
  // 有指向容器 添加一个of方法 用来返回生产我想要的实例
  class PointContainer {
    constructor(value) {
      this.value = value
    }
    static of(value) {
      return new PointContainer(value)
    }
  }
  const pointContainer = PointContainer.of('wyb')
  console.log(pointContainer.value)
  // 函子 如果有指向容器再有一个map方法 可以接收一个函数 返回值是一个同类型的对象
  class FunctorContainer {
    constructor(value) {
      this.value = value
    }
    static of(value) {
      return new FunctorContainer(value)
    }
    map(fn) {
      return new FunctorContainer(fn(this.value))
    }
  }
  const functorContainer = FunctorContainer.of('wyb')
    .map(value => value + 1)
    .map(value => value + 2)
    .map(value => value + 3)
  console.log(functorContainer.value)

  // Either 函子: 内部有两个值 left值和right值
  // 左值只会在右值不存在的情况下生效
  class Either {
    constructor(left, right) {
      this.left = left
      this.right = right
    }
    static of(left, right) {
      return new Either(left, right)
    }
    map(fn) {
      return this.right
        ? Either.of(this.left, fn(this.right))
        : Either.of(fn(this.left), this.right)
    }
    get value() {
      return this.right || this.left
    }
  }
  // Either 函子示例1：处理默认值
  // let response = { name: 'wyb', gender: null }
  let response = { name: 'wyb', gender: '女' }
  let either = Either.of('男', response.gender).map(value => `性别: ${value}`)
  console.log(either.value)
})()
