/* 
- 函数的核心作用就是用来批量创建对象
*/

/* ----------------------------------------- 运算符优先级 ----------------------------------------- */
/* 
- 运算符优先级 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
*/
// 需要在浏览器执行
;(function () {
  function Foo() {
    getName = function () {
      console.log(1)
    }
    return this
  }
  Foo.getName = function () {
    console.log(2)
  }
  Foo.prototype.getName = function () {
    console.log(3)
  }
  var getName = function () {
    console.log(4)
  }
  function getName() {
    console.log(5)
  }

  Foo.getName() // 2
  getName() // 4
  Foo().getName() // 1
  getName() // 1
  new Foo.getName() // 2 成员访问高级new无参数列表 先是成员访问 Foo.getName 返回一个函数 然后把函数当普通函数new执行
  new Foo().getName() // 3 成员访问和new带参数优先级一样 按从左到右原则
  new new Foo().getName() // 3

  /* new new Foo().getName()
  1. new new Foo().getName()   执行 new Foo()  =>  返回Foo的实例
  2. new f.getName()   执行成员访问 f.getName 返回一个函数 
  3. new fun(){ console.log(3); } ()   最后执行这个函数
  */
})

/* ----------------------------------------- 变量优先级 ----------------------------------------- */
/* 
- arguments > 函数声明 > 变量声明 (所以前面的声明都会被后面的覆盖)
*/
;(function () {
  function test(a) {
    var a = function () {
      console.log(2)
    }
    function a() {
      console.log(1)
    }
    console.log(a)
  }
  test(3) // function(){ console.log(2) }
})

/* ----------------------------------------- 高阶函数 ----------------------------------------- */
/* 
  - 一个函数返回一个函数
  - 参数可以接受一个函数
*/

/* ----------------------------------------- 函数柯里化 ----------------------------------------- */
/* 
  - 个参数的传入 可以转换成n个函数
*/
;(function () {
  // function isType(typing) {
  //   return function (val) {
  //     return Object.prototype.toString.call(val) == `[object ${typing}]`
  //   }
  // }
  // const isString = isType('String')
  // console.log(isString(123));

  // 实现通用的柯里化函数
  // curring(1)(2)(3, 4) => 10

  function curring() {
    let total = 0
    let fn = (...args) => {
      total = args.reduce((a, b) => a + b, total)
      return fn
    }
    fn.toString = () => total
    return fn(...arguments)
  }
  console.log(curring(1)(2)(3, 4) + 0)

  function curring1(fn) {
    let inner = (args = []) => {
      return args.length >= fn.length
        ? fn(...args)
        : (...userArgs) => inner([...args, ...userArgs])
    }
    return inner()
  }

  function isType(typing, val) {
    return Object.prototype.toString.call(val) == `[object ${typing}]`
  }
  const isString = curring1(isType)('String')
  console.log(isString('2'))
  const isNumber = curring1(isType)('Number')
  console.log(isNumber(5))
})

/* ----------------------------------------- 默认参数 ----------------------------------------- */
/* 
- 参数默认值不是传值的 而是每次都重新计算的 也就是说 参数默认值是惰性求值的
*/
;(function () {
  let x = 99
  function foo(p = x + 1) {
    console.log(p)
  }
  foo() // 100
  x = 100
  foo() // 101
})

/* ----------------------------------------- length属性 ----------------------------------------- */
/* 
- 返回没有指定默认值的参数个数
*/
;(function () {
  function test(name, age = 18) {
    console.log(test.length) // 1
  }
  test()
})()

/* ----------------------------------------- 箭头函数 ----------------------------------------- */
/* 
- 由于对象不构成单独的作用域 所以在对象箭头函数的this就指向上层作用域
- 如果在事件回调函数使用到this 也不能使用箭头函数
*/
;(function () {
  // 错误使用1
  const obj = {
    age: 9,
    jumps: () => {
      this.age--
    }
  }
  // 错误使用2
  var button = document.getElementById('press')
  button.addEventListener('click', () => {
    this.classList.toggle('on')
  })
})()
