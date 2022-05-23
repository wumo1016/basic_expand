'use strict'

/* ----------------------------------------- 自执行函数 ----------------------------------------- */
/* 
- 严格模式下 自执行函数中的this是undefined
- https://www.cnblogs.com/qianlegeqian/p/3950044.html
*/
;(function () {
  const code = 'function'
  console.log(this)
  console.log((1, eval)('this')) // window
})()
