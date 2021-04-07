// generator 可以把函数的控制权交出去 使用 *函数和yield
(function () {
  function* read() { // 生成器 它执行的结果叫迭代器 直接调用这个函数是不会执行里面的代码的
    console.log(1);
    yield 1;
    console.log(2);
    yield 2;
    console.log(3);
    yield 3;
  }

  let it = read()
  it.next() // 1
  it.next() // 2
  it.next() // 3
});

(function () {

  let regeneratorRuntime = {
    mark(genFn) {
      return genFn
    },
    wrap(interatorFn) {
      const context = {
        next: 0,
        done: false, // 表示迭代器是否完成
        stop() {
          this.done = true
        }
      }
      let it = {}
      it.next = function (v) { // 下一个next传入的值 会作为上一个yield语句返回的值
        context.sent = v
        let value = interatorFn(context)
        return {
          value,
          done: context.done
        }
      }
      return it
    },
  }

  "use strict";

  var _marked = /*#__PURE__*/ regeneratorRuntime.mark(read);

  function read() {
    var a, b, c;
    return regeneratorRuntime.wrap(function read$(_context) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log('a', a);
          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log('b', b);
          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log('c', c);

        case 12:
        case "end":
          return _context.stop();
      }
    }, _marked);
  }

  var it = read();
  // 给next传递参数时 它的参数会给上一次yield的返回值
  it.next(); // 1 第一次next传递的next是没有意义的
  it.next(); // 2 
  it.next(); // 3

  let {
    value,
    done
  } = it.next();
  console.log(value, done);

});

(function () {
  function* read() { // 生成器 它执行的结果叫迭代器 直接调用这个函数是不会执行里面的代码的
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
  }

  let it = read()

  let value, done
  do {
    let {
      value: x,
      done: y
    } = it.next(value)
    value = x
    done = y
  } while (!done)

});


// 先读a.txt 再读b.txt
(function () {

  const util = require('util');
  const fs = require('fs')
  let readFile = util.promisify(fs.readFile)

  function* read() {
    let data = yield readFile('a.txt', 'utf8')
    data = yield readFile(data, 'utf8')
    return data
  }

  // 原生写法
  {
    let it = read()
    let {
      value,
      done
    } = it.next()
    value.then(data => {
      let {
        value,
        done
      } = it.next(data)
      value.then(data => {
        let {
          value,
          done
        } = it.next(data)
        console.log(value, done); // b.txt true
      })
    })
  }
  // TJ co 利用co库
  {
    const co = require('co')
    co(read()).then(data => {
      console.log(data); // b.txt
    }).catch(e => {
      console.log(e);
    })
    // 手写简易co库
    function myco(it) {
      return new Promise((resolve, reject) => {
        function next(data) {
          const {
            value,
            done
          } = it.next(data)
          if (done) {
            resolve(value)
          } else {
            Promise.resolve(value).then(next, reject)
          }
        }
        next()
      })
    }
    myco(read()).then(data => {
      console.log(data); // b.txt
    }).catch(e => {
      console.log(e);
    })
  }
  // async await 写法 == generator + co
  {
    async function read() {
      let data = await readFile('a.txt', 'utf8')
      data = await readFile(data, 'utf8')
      return data
    }
    read().then(data => {
      console.log(data); // b.txt
    })
  }

})();