/* ---------------- 1.编写parse函数，实现访问对象里属性的值 ------------------- */
function test1() {
  let obj = {
    a: 1,
    b: {
      c: 2
    },
    d: [1, 2, 3],
    e: [
      {
        f: [4, 5, 6]
      }
    ]
  }
  let r1 = parse(obj, 'a') // = 1;
  let r2 = parse(obj, 'b.c') // = 2;
  let r3 = parse(obj, 'd[2]') // = 3;
  let r4 = parse(obj, 'e[0].f[0]') // = 4;
  console.log(r1, r2, r3, r4)

  // function parse(obj, str) {
  //   const fn = new Function('obj', 'return obj.' + str)
  //   console.log(fn);
  //   return fn(obj) // 执行 new Function 的时候，作用域链只有两个，函数作用域和全局作用域
  // }

  function parse(obj, str) {
    str = str.replace(/\[(\d)\]/g, '.$1')
    str.split('.').forEach((item) => {
      obj = obj[item]
    })
    return obj
  }
}

// test1()
/* ----------------------- 2.数组扁平化的多种实现 -------------------------- */
function test2() {
  let arr = [[1], [2, 3], [4, 5, 6, [7, 8, [9, 10, [11]]]], 12]
  // 1
  console.log(arr.flat(Infinity))
  // 2
  console.log(
    arr
      .toString()
      .split(',')
      .map((v) => Number(v))
  )
  // 3
  console.log(
    JSON.stringify(arr)
      .replace(/\[|\]/g, '')
      .split(',')
      .map((v) => Number(v))
  )
  // 4
  let arr1 = arr
  while (arr1.some((v) => Array.isArray(v))) {
    arr1 = [].concat(...arr1)
  }
  console.log(arr1)
}
// test2()

/* ------------------ 3.实现一个不可变对象 --------------------------- */
function test3() {
  // 1.不可扩展(不能添加新的属性)
  let obj1 = {
    name: 'wyb'
  }
  obj1.age = 18
  Object.preventExtensions(obj1) // 阻止扩展
  obj1.height = 180
  console.log(obj1) // {name: "wyb", age: 18}
  // 2.密封(不能添加新的也不能删除老的)
  let obj2 = {
    name: 'wyb',
    age: 18
  }
  delete obj2.name
  Object.seal(obj2)
  delete obj2.age
  console.log(obj2) // {age: 18}
  // 3.冻结(不能新增、删除、修改)
  let obj3 = {
    name: 'wyb'
  }
  obj3.name = 'test'
  Object.freeze(obj3)
  obj3.name = 'wyb'
  console.log(obj3) // {name: "test"}

  // ** 以上都是浅控制
}
// test3()

/* ---------------------- 4.如何让 (a == 1 && a == 2 && a == 3) 的值为true ----------------------- */

function test4() {
  // 1
  /* let value = 1
  Object.defineProperty(window, 'a', {
    get() {
      return value++
    }
  }) */
  // 2
  /* let i = 1
  let a = {
    [Symbol.toPrimitive]: () => i++,
    valueOf: () => i++,
    toString: () => i++
  } */
  // 3
  /* let value = 1
  let a = new Proxy({}, {
    get() {
      return () => value++
    }
  }) */
  // 4
  let a = [1, 2, 3]
  a.valueOf = a.shift
  a.toString = a.shift

  if (a == 1 && a == 2 && a == 3) {
    console.log('成功啦')
  }
}
// test4()

/* -------------------- 5.实现一个柯里化函数 ----------------- */
function test5() {
  // add(1)(2)(3, 4)  => 10
  // function add(...args1){
  //   let total = args1.reduce((a, b) => a + b)
  //   function plus(...args2){
  //     total += args2.reduce((a, b) => a + b)
  //     return plus
  //   }
  //   plus.toString = function(){
  //     return total
  //   }
  //   return plus
  // }
  function add(...args) {
    const _add = add.bind(null, ...args)
    _add.toString = function () {
      return args.reduce((a, b) => a + b)
    }
    return _add
  }
  alert(add(1)(2)(3, 4, 5))
}
// test5()

/* -------------------- 异步 ----------------- */
;(function () {
  function wait() {
    return new Promise((resolve) => setTimeout(resolve, 5 * 1000))
  }

  async function main() {
    console.time()
    const x = wait()
    const y = wait()
    const z = wait()
    await x
    await y
    await z
    console.timeEnd()
  }

  main()
})

/* -------------------- 编程题 ----------------- */
;(function () {
  const entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
  }
  // 输出为
  const output = {
    a: {
      b: {
        c: {
          dd: 'abcdd'
        }
      },
      d: {
        xx: 'adxx'
      },
      e: 'ae'
    }
  }

  function test(obj) {
    const res = {}
    for (const keys in obj) {
      const keyList = keys.split('.')
      const len = keyList.length
      const loop = (target, i) => {
        const key = keyList[i]
        if (i < len - 1) {
          loop(target[key] || (target[key] = {}), i + 1)
        } else {
          target[key] = obj[keys]
        }
      }
      loop(res, 0)
    }
    return res
  }
  console.log(JSON.stringify(test(entry)))
})

/* -------------------- 编程题 ----------------- */
;(function () {
  const entry = {
    a: {
      b: {
        c: {
          dd: 'abcdd'
        }
      },
      d: {
        xx: 'adxx'
      },
      e: 'ae'
    }
  }
  // 输出为
  const output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
  }

  function test(obj) {
    const res = {}
    const loop = (target, prefix) => {
      for (const key in target) {
        const [value, k] = [target[key], `${prefix}.${key}`]
        if (typeof value === 'object') {
          loop(value, k)
        } else {
          res[k.slice(1)] = value
        }
      }
    }
    loop(obj, '')
    return res
  }
  console.log(JSON.stringify(test(entry)))
})

/* -------------------- 变量提升 ----------------- */
;(function () {
  // 1
  // var name = 'Tom'
  // ;(function () {
  //   if (typeof name == 'undefined') {
  //     var name = 'Jack'
  //     console.log('Goodbye ' + name)
  //   } else {
  //     console.log('Hello ' + name)
  //   }
  // })()

  // 2
  var name = 'Tom'
  ;(function () {
    if (typeof name == 'undefined') {
      name = 'Jack'
      console.log('Goodbye ' + name)
    } else {
      console.log('Hello ' + name)
    }
  })()
})

/* -------------------- 不用加减乘除运算符求整数7倍 ----------------- */
;(function () {
  /* eval */
  const test1 = (num) => eval(new Array(7).fill(num).join('+'))
  /* Function */
  const test2 = (num) =>
    new Function(`return ${new Array(7).fill(num).join('+')}`)()
  console.log(test2(7))
})

/* -------------------- 打印0-99 ----------------- */
;(function () {
  /* 
  - 只能修改 `setTimeout` 到 `Math.floor(Math.random() * 1000` 的代码
  - 不能修改 `Math.floor(Math.random() * 1000`
  - 不能使用全局变量
  */
  /* 
  function print(n) {
    setTimeout(() => {
      console.log(n)
    }, Math.floor(Math.random() * 1000))
  }
  for (var i = 0; i < 100; i++) {
    print(i)
  } 
  */

  /* 解法1 */
  // function print(n) {
  //   setTimeout(
  //     () => {
  //       console.log(n)
  //     },
  //     0,
  //     Math.floor(Math.random() * 1000)
  //   )
  // }
  // for (var i = 0; i < 100; i++) {
  //   print(i)
  // }

  /* 解法2 */
  function print(n) {
    setTimeout(
      (() => {
        console.log(n)
        return () => {}
      })(),
      Math.floor(Math.random() * 1000)
    )
  }
  for (var i = 0; i < 100; i++) {
    print(i)
  }
})

/* -------------------- 同步异步 ----------------- */
;(function () {
  async function async1() {
    console.log(1)
    await new Promise(() => {
      console.log(2)
    })
    console.log(3)
    return 4
  }

  console.log(5)
  async1().then((res) => console.log(res))
  console.log(6)
})

/* -------------------- 要求设计 LazyMan 类，实现以下功能 ----------------- */
;(function () {
  class LazyManClass {
    constructor(name) {
      console.log(`Hi I am ${name}`)
      this.queue = []
      setTimeout(() => {
        this.next()
      })
      return this
    }
    sleep(time) {
      this.queue.push(() => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`)
          this.next()
        }, time * 1000)
      })
      return this
    }
    eat(name) {
      this.queue.push(() => {
        console.log(`I am eating ${name}`)
        this.next()
      })
      return this
    }
    sleepFirst(time) {
      this.queue.unshift(() => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`)
          this.next()
        }, time * 1000)
      })
      return this
    }
    next() {
      const fn = this.queue.shift()
      fn && fn()
    }
  }
  const LazyMan = (name) => new LazyManClass(name)

  /* 1 */
  // LazyMan('Tony')
  // Hi I am Tony

  /* 2 */
  // LazyMan('Tony').sleep(2).eat('lunch')
  // Hi I am Tony
  // 等待了10秒...
  // I am eating lunch

  /* 3 */
  // LazyMan('Tony').eat('lunch').sleep(2).eat('dinner')
  // Hi I am Tony
  // I am eating lunch
  // 等待了10秒...
  // I am eating diner

  /* 4 */
  LazyMan('Tony')
    .eat('lunch')
    .eat('dinner')
    .sleepFirst(5)
    .sleep(3)
    .eat('junk food')
  // Hi I am Tony
  // 等待了5秒...
  // I am eating lunch
  // I am eating dinner
  // 等待了10秒...
  // I am eating junk food
})

/* -------------------- 输出以下代码的执行结果并解释为什么 ----------------- */
;(function () {
  var a = { n: 1 }
  var b = a
  a.x = a = { n: 2 }

  console.log(a.x) // undefined
  console.log(b.x) // { n: 2 }
})

/* -------------------- 编程题 ----------------- */
;(function () {
  var obj = {
    2: 3,
    3: 4,
    length: 2,
    splice: Array.prototype.splice,
    push: Array.prototype.push
  }
  obj.push(1)
  obj.push(2)
  console.log(obj) // [,, 1, 2, splice: ƒ, push: ƒ]
})

/* -------------------- 下面代码中 a 在什么情况下会打印 1 ----------------- */
;(function () {
  var a = {
    i: 1,
    toString() {
      return this.i++
    }
  }
  if (a == 1 && a == 2 && a == 3) {
    console.log(1)
  }
})

/* -------------------- 编程题 ----------------- */
;(function () {
  // 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
  const arr = [
    [1, 2, 2],
    [3, 4, 5, [5, 6]],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
    10
  ]

  /* 解法1 */
  function test1(list) {
    return [...new Set(list.flat(Infinity).sort((a, b) => a - b))]
  }
  console.log(test1(arr))
  /* 解法2 */
  function test2(list) {
    return [
      ...new Set(
        arr
          .toString()
          .split(',')
          .sort((a, b) => a - b)
      )
    ].map(Number)
  }
  console.log(test2(arr))
})

/* -------------------- 使用Promise实现一个异步流量控制的函数, 比如一共10个请求, 每个请求的快慢不同, 最多同时3个请求发出, 快的一个请求返回后, 就从剩下的7个请求里再找一个放进请求池里, 如此循环。 ----------------- */
;(function () {
  const list = Array(10)
    .fill('')
    .map((_, index) => {
      return () =>
        new Promise((r) => {
          const time = Math.random() * 5 * 1000
          console.log(index + 1, time, '执行啦')
          setTimeout(() => {
            console.log(`第${index + 1}个完成啦`)
            r(index + 1)
          }, time)
        })
    })
  function controlFn(reqList, num) {
    let curIndex = 0
    let penddingNum = 0
    let finishedNum = 0
    const res = []
    return new Promise((r) => {
      const execute = () => {
        if (curIndex >= reqList.length || penddingNum >= num) return
        const index = curIndex
        penddingNum++
        const fn = reqList[curIndex++]
        fn().then((data) => {
          finishedNum++
          penddingNum--
          res[index] = data
          if (finishedNum === reqList.length) {
            r(res)
          }
          execute()
        })
        execute()
      }
      execute()
    })
  }
  controlFn(list, 3).then((r) => {
    console.log(r)
  })
})

/* -------------------- 实现compose函数, 类似于koa的中间件洋葱模型 ----------------- */
;(function () {
  let middleware = []
  middleware.push((next) => {
    console.log(1)
    next()
    console.log(1.1)
  })
  middleware.push((next) => {
    console.log(2)
    next()
    console.log(2.1)
  })
  middleware.push((next) => {
    console.log(3)
    next()
    console.log(3.1)
  })

  let fn = compose(middleware)
  fn()

  /* 方式1 */
  // function compose(middlewares) {
  //   const len = middlewares.length
  //   if (len < 1) return
  //   let firstFn, nextFn
  //   for (let i = len - 1; i >= 0; i--) {
  //     if (i === len - 1) {
  //       nextFn = () => middlewares[i](() => {})
  //     } else {
  //       const newFn = nextFn
  //       nextFn = () => middlewares[i](newFn)
  //       if (i === 0) firstFn = nextFn
  //     }
  //   }
  //   return firstFn
  // }
  /* 方式2 */
  function compose(middlewares) {
    return () => {
      const dispatch = (index) => {
        if (index === middlewares.length) return () => {}
        const fn = middlewares[index]
        return fn(() => dispatch(index + 1))
      }
      dispatch(0)
    }
  }
})

/* -------------------- 编程题 ----------------- */
// ;(function(){

// })()
