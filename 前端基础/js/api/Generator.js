/* 
- 介绍
  - 是一个特殊的js函数, 普通函数必要执行完毕, 这个函数可以暂停, 后续可以从暂停的位置继续执行
  - 生成器用于生成迭代器, 有一个 next 方法, 每次调用后, 就生成一个对象 { value, done }
    - 生成器:
      ```
      function* () {
        yield 1
      }
      ```
*/

/* ----------------------------------------- 手动添加生成器 ----------------------------------------- */
;(function () {
  const arr = [
    ...{
      0: 1,
      1: 2,
      2: 3,
      [Symbol.iterator]: function* () {
        yield 1 // -> { value: 1, done: false }
        yield 2 // -> { value: 2, done: false }
        yield 3 // -> { value: 3, done: true }
      }
    }
  ]
  console.log(arr) // [1, 2, 3]
})

/* ----------------------------------------- 手动实现生成器----------------------------------------- */
;(function () {
  const arr = [
    ...{
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      [Symbol.iterator]: function () {
        let idx = 0
        return {
          next: () => {
            return {
              value: this[idx],
              done: idx++ === this.length
            }
          }
        }
      }
    }
  ]
  console.log(arr) // [1, 2, 3]
})

/* ----------------------------------------- yield 返回值 ----------------------------------------- */
;(function () {
  function* getData() {
    const a = yield '1'
    console.log(a)
    const b = yield '2'
    console.log(b)
  }

  let data = getData()
  console.log(data.next()) // 第一次传参没有任何意义
  console.log(data.next('第一次处理后的结果'))
  console.log(data.next('第二次处理后的结果'))
})

/* ----------------------------------------- yield 返回值(编译后的结果) ----------------------------------------- */
;(function () {
  function _regeneratorRuntime() {
    return {
      wrap(iteratorFn) {
        // iteratorFn 此函数要多次执行

        const _context = {
          next: 0,
          done: false,
          sent: undefined,
          abrupt(type, value) {
            if (type === 'return') {
              this.stop()
              return value
            }
          },
          stop() {
            this.done = true
          }
        }

        function resume() {
          const value = iteratorFn(_context)
          return { value, done: _context.done }
        }

        return {
          next(value) {
            _context.sent = value // 每次调用next的时候传递的参数
            return resume()
          }
        }
      }
    }
  }

  function getData() {
    var a, b
    return _regeneratorRuntime().wrap(function getLesson$(_context) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2
          return '1'
        case 2:
          a = _context.sent
          console.log(a)
          _context.next = 6
          return '2'
        case 6:
          b = _context.sent
          console.log(b)
          return _context.abrupt('return')
        case 9:
        case 'end':
          return _context.stop()
      }
    })
  }
  let data = getData()
  console.log(data.next()) // 第一次传参没有任何意义
  console.log(data.next('第一次处理后的结果'))
  console.log(data.next('第二次处理后的结果'))
})()
