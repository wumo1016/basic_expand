// "use strict"
/* this */
/*
this 就是当前执行这个逻辑的主体

*/

function getThis(pre) {
  console.log(pre, this)
}

// 1. 通过.调用 谁调用就是谁
const person = {
  name: '张三',
  getThis
}
person.getThis('.调用') // obj-person

// 2.作为事件绑定 就是绑定事件的那个主体
const domtest = document.querySelector('.test')
domtest.addEventListener('click', function (e) {
  getThis.call(this, '绑定事件')
}) // dom-test

// 3.直接调用 非严格模式是Window对象 严格模式是undefined
getThis('直接调用') // Window

// 4.call apply bind 传入的是谁就是谁
getThis.call(person, 'call') // obj-person
getThis.apply(person, ['apply']) // obj-person
getThis.bind(person)('bind'); // obj-person

// 手动实现一个 call apply bind
(function (prototype) {
  prototype.myCall = function (ctx, ...args) {
    ctx._$ = this
    const result = ctx._$(...args)
    delete ctx._$
    return result
  }
})(Function.prototype);
getThis.myCall(person, 'myCall');

(function (prototype) {
  prototype.myApply = function (ctx, args) {
    ctx._$ = this
    const result = ctx._$(...args)
    delete ctx._$
    return result
  }
})(Function.prototype);
getThis.myApply(person, ['myApply']);

(function (prototype) {
  prototype.myBind = function (ctx, ...args1) {
    ctx._$ = this
    return (...args2) => {
      const result = ctx._$(...args1, ...args2)
      delete ctx._$
      return result
    }
  }
})(Function.prototype);
getThis.myBind(person, 'myBind')()
