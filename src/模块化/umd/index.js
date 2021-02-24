// 写的代码可以在 AMD CMD COMMONJS 中运行

((global, factory) => {
  // amd 环境
  if(typeof define === 'function' && define.amd){
    define(['jquery'], factory)
  } else if(typeof exports === 'object'){
    const _ = require('jquery')
    module.exports = factory(_)
  } else {
    global.testModule = factory(global.jquery)
  }
})(this, ($) => {
  console.log($);
  return
})
