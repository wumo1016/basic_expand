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
      it.next = function () {
        let value = interatorFn(context)
        return {
          value,
          done: context.done
        }
      }
      return it
    },
  }

  var _marked = regeneratorRuntime.mark(read);

  function read() {
    return regeneratorRuntime.wrap(function read$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(1);
            _context.next = 3;
            return 1;

          case 3:
            console.log(2);
            _context.next = 6;
            return 2;

          case 6:
            console.log(3);
            _context.next = 9;
            return 3;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  var it = read();
  it.next(); // 1
  it.next(); // 2
  it.next(); // 3

  let {
    value,
    done
  } = it.next();
  console.log(value, done);

})();