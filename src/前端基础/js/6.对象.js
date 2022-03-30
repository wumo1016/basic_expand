/*
1.对象和基本类型的本质区别？
  基本类型是一个值，而对象是若干个属性的集合

2.function和对象的区别是什么？
  function本质上给来说可以生产别的对象，所有对象都是函数生产出来的，包括函数本身

3.为了加快对象生产的速度，就有了函数，它可以用来批量生产对象；
  对象的属性分为两种：有些属性是特有的，有些是公用的；为了保证灵活，为了节约性能

*/

// new的实现原理
function _new(claszz, ...args){
  const obj = Object.create(claszz.prototype) // 相当于 obj = {} obj.__proto__ = claszz.prototype
  claszz.call(obj, ...args)
  return obj
}
function test(){
  this.name = 123
}
console.log(_new(test))

const test1 = new Function('1')
console.dir(test1);
