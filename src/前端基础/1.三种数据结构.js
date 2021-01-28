/* 1.堆结构

*随取随存

*/


/* 2.栈结构 

*先进后出

*/

// 将以下代码复制到控制台打开 查看函数调用栈
function one() {
  function two() {
    function three() {

    }
    three()
  }
  two()
}
debugger
one()


/* 3.队列 FIFO

*先进先出

*/