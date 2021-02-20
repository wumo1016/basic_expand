/* 
 * define 定义模块
 * require 使用模块
*/

require(['./modules/add.js', './modules/minus.js'], function(add, minus){
  console.log(add(1, 2), minus(2, 1));
})

// 如果模块都在同一个文件夹下 优化写法：
/* require.config({
  baseUrl: './modules'
})
require(['add', 'minus'], function(add, minus){
  console.log(add(1, 2), minus(2, 1));
}) */
