// const a = require('./a')
// console.log(a, 'a');
// module.exports = {
//   name: 'b'
// }

const { a, obj } = require('./a')
console.log(a)
console.log(obj.name)
setTimeout(() => {
  console.log(a)
  console.log(obj.name)
}, 2000)

/* 
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = ', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = ', a.done);
exports.done = true;
console.log('b.js 执行完毕');

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=, b.done=', a.done, b.done);

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
*/
