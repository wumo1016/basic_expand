// ES6 后续新增的对象方法都放在Reflect上

(function () {
  const s1 = Symbol('wyb')
  const obj = {
    name: 'wyb',
    [s1]: 'wyb'
  }
  console.log(Reflect.ownKeys(obj)); // 可以获取所有key
});

(function () {
  function fn(a, b) {
    console.log('fn', a, b);
  }
  fn.apply = function () {
    console.log('apply');
  }
  fn.apply() // 走自己的apply
  // 如果想调用自己本来apply
  Function.prototype.apply.call(fn, null, [1, 2])
  // 利用Reflect
  Reflect.apply(fn, null, [1, 2]) // 谁调用apply apply中的this apply的参数
})();
