/* ----------------- var -------------- */
/* 
- 1.意外创建全局变量
- 2.内部变量以意外覆盖外部变量
*/
;(function () {
  for (var i = 0; i < 5; i++) {
    console.log('hello')
  }
  console.log(i) // 5

  var a = 1
  function fn() {
    console.log(a) // undefined
    if (false) {
      var a = 2
    }
  }
  fn()
})

/* ----------------- let const -------------- */
/* 
- 暂时性死区
  - 声明的变量实际上提升了 但是在声明之前不允许访问
  - 本质是：只要已进入当前作用域 所使用的变量就已经存在了 但是不可获取
- 只要块级作用域内存在let声明的变量 这个变量就绑定这个区域 不受外界影响
*/
;(function () {
  // for循环有个特别之处 设置循环变量的那部分是一个父作用域 循环体内部是一个单独的子作用域(因此可以重复声明变量)
  for (let i = 0; i < 5; i++) {
    let i = 10
    console.log(i) // 10
  }

  function test() {
    debugger
    const a = 1
    console.log(a)
  }
  test()
})()
