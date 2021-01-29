/* 执行上下文

1.主要分为全局执行上下文 和 函数执行上下文
2.全局执行上下文只有一个 全局上下文的 VO 又称为 GO

1.每次函数执行的执行的时候，会产生一个执行上下文，这是一个对象
2.执行上下文中会创建一个变量对象，里面存放着当前函数内的变量 (就是debugger控制台中的Local对象)
3.基本数据保存在变量对象中 而引用数据类型要单独保存在堆内存中

*/

function task(m, n) {
  var a = 1;
  var b = {
    name: 'zhufeng'
  }
  debugger
  var c = [1, 2, 3]
}
// task(10, 20)

/*
taskExecutionContext = { // task的执行上下文
  this: window,
  scopeChain: [],
  VO: { // Variable Object 变量对象 里面存的是当前函数执行要使用到的变量
    m: 10,
    n: 20,
    a: 1,
    b: `xo1`,
    c: `xa1`
  }
} 
*/

function one() {
  var a = 1
  var two = () => {
    var b = 2
    var three = () => {
      var c = 3
      debugger
      // console.log(a, b, c)
    }
    three()
  }
  two()
}
one()