/* 
  call 的速度比apply更高
*/

function fn1(x, y) {
  this.x = x
  this.y = y
  console.log(1, this)
}

function fn2() {
  console.log(2, this)
}

Function.prototype.myCall = function (ctx, ...args) {
  console.log(this, 123)
  let result
  if (ctx) {
    ctx._$ = this
    result = ctx._$(...args)
    delete ctx._$
  } else {
    result = this(...args)
  }
  console.log(result, 'result')
  return result
}
fn1.myCall.myCall(fn2)

/* 最终一共执行了两次mycall函数
1.第一次
执行 fn.myCall(fn2)
此时 ctx = fn2 ctx有值 所以走if
谁调用this就是谁 所以此时this是fn 故 ctx._$ = fn (fn是一个mycall函数)
然后下一步执行 ctx._$ 由于fn也是一个mycall函数 所以执行第二遍mycall函数
2.第二次
ctx._$ = function mycall(){}
此时没有参数 所有走else
所以直接调用 this() 而此时的this就是 ctx(fn2) 所以最终执行的是fn2
*/

Function.prototype.myapply = function (ctx, args) {
  let result
  if (ctx) {
    ctx._$ = this
    result = ctx._$(...args)
    delete ctx._$
  } else {
    result = this(...args)
  }
  return result
}

Function.prototype.mybind = function (ctx, ...args1) {
  let func = this
  return function (...args2) {
    if (!ctx) {
      return func(...args2)
    }
    return func.call(ctx, ...args1, ...args2)
  }
}

function fn3() {
  console.log(this, arguments)
}
const obj = {
  name: 'wyb'
}
// fn3.bind()(2, 3)
// fn3.mybind()(2, 3)
