/* 
  call 的速度比apply更高
*/

function fn1() {
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
fn1.myCall.myCall(fn2)

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
  if (ctx) {
    ctx._$ = this
    return (...args2) => {
      ctx._$(...args1, ...args2)
      delete ctx._$
    }
  } else {
    return (...args2) => {
      this(...args1, ...args2)
    }
  }
}




/* 
1:这个方法是在哪开始执行的 call(fn2)
2:执行后的结果是什么 call(fn2) 前面的this 改成了fn2 前面方法照常执行
3:call(fn2) 前面是什么，改变this 后会怎样 call(fn2) 前面是fn1.call 改变this 后 由于fn1是这次的行为主体(this)，是他执行了call 方法，所以fn1 被call(fn2) 变成了 fn2，所以接下来执行的就是 fn2.call()
4:输出 fn2 this: [object Window]
*/