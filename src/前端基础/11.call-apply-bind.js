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
  let result
  if (ctx) {
    ctx._$ = this
    result = ctx._$(...args)
    delete ctx._$
  } else {
    result = this()
  }
  return result
}
// fn1.myCall.myCall(fn2)

// 先执行 myCall(fn2)
// 再执行 fn1.myCall 对应的函数，此时已经没有参数，而this是fn2，所以最终执行的是fn2

Function.prototype.myapply = function (ctx, args) {
  let result
  if (ctx) {
    ctx._$ = this
    result = ctx._$(...args)
    delete ctx._$
  } else {
    result = this()
  }
}

Function.prototype.mybind = function (ctx, ...args1) {
  let func = this
  return function (...args2) {
    if(!ctx){
      return func(...args2)
    }
    return func.call(ctx, ...args1, ...args2)
  }
}

function fn3(){
  console.log(this, arguments);
}
const obj = {
  name: 'wyb'
}
fn3.bind()(2, 3)
fn3.mybind()(2, 3)
