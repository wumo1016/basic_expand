
// const a = require('./a')
// console.log(a, 'a');
// module.exports = {
//   name: 'b'
// }

const a = require('./a')
setTimeout(() => {
  console.log(a);
}, 2000)
