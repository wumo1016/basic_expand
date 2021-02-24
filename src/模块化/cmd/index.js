define(function (require, exports) {
  const addmodule = require('./modules/add') // 动态加载其他模块
  console.log(addmodule.add(1, 2));
  const minusmodule = require('./modules/minus')
  console.log(minusmodule.minus(2, 1));
})