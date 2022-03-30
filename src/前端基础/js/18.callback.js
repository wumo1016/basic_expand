/* 高阶函数(aop 偏函数 函数柯里化) */
// 参数有函数
// 返回一个函数

/* aop 面向切片编程 */
// 就是不改变原有功能 添加新功能zhungshiqi
// 应用：装饰器 前端埋点
(function () {
  Function.prototype.before = function (fn) {
    const that = this
    return function (...args) {
      fn()
      that(...args)
    }
  }

  function fn(a) {
    console.log(a);
  }
  const newFn = fn.before(function () {
    console.log('函数执行前执行');
  })
  newFn(2)
});

/* 在多少次后执行某个方法 */
(function () {

  function after(num, fn) {
    return function () {
      if (--num === 0) {
        fn()
      }
    }
  }

  const newFn = after(1, function () {
    console.log('执行啦');
  })

  newFn()
  newFn()
  newFn()

});

/* 并发调用两个接口 获取两个接口的结果 */

(function () {

  function after(num, fn) {
    const person = {}
    return function (key, value) {
      person[key] = value
      if (--num === 0) {
        fn(person)
      }
    }
  } 

  const newFn = after(2, function (data) {
    console.log(data);
  })

  fetch('https://api.apiopen.top/getJoke?page=1&count=1&type=text').then(res => {
    res.json().then(res => {
      newFn('name', res.result[0].text)
    })
  })

  fetch('https://api.apiopen.top/singlePoetry').then(res => {
    res.json().then(res => {
      newFn('age', res.result)
    })
  })

})();
