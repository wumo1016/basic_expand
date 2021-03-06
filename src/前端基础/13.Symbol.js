/* 七种基本数据类型 */
// string number boolean undefined null symbol bigint

(function () {
  const s1 = Symbol('wyb')
  const s2 = Symbol('wyb')
  console.log(s1 === s2);

  const obj = {
    name: 'wyb',
    [s1]: 'wyb'
  }
  console.log(obj); // { name: 'wyb', [Symbol(wyb)]: 'wyb' }
  console.log(Object.keys(obj)); // Symbol不是可枚举属性
  console.log(Object.getOwnPropertySymbols(obj));
  console.log(Reflect.ownKeys(obj)); // 利用Reflect可以获取所有key
});

// Symbol.toStringTag
(function(){
  const obj = {
    [Symbol.toStringTag]: 'jw'
  }
  console.log(Object.prototype.toString.call(obj));
});

// Symbol.toPrimitive
(function(){
  const obj = {
    [Symbol.toPrimitive](type){
      console.log(type);
      return 123
    }
  }
  console.log(obj + '1');
})();
