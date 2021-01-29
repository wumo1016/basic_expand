/* var 造成的问题 */

/* 1.意外创建全局变量 */
// for (var i = 0; i <= 5; i++) {
//   console.log("hello")
// }
// console.log(i)

/* 2.内部变量以意外覆盖外部变量 */
// var a = 1

// function fn() {
//   console.log(a) // undefined
//   if (false) {
//     var a = 2
//   }
// }
// fn()

/* let const */

/*
let和const 声明的变量实际上提升了 但是在声明之前不允许访问 这叫暂时性死区
*/
function test(){
  debugger
  const a = 1
  console.log(a);
}
test()
