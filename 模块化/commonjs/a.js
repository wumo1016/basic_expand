// const b = require('./b')
// console.log(b, 'b');
// module.exports = {
//   name: 'a'
// }

let a = 1,
  obj = {
    name: 'wyb'
  }
setTimeout(() => {
  a = 2
  obj.name = 'love'
}, 1000)
module.exports = {
  a,
  obj
}
