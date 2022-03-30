
/* Set => add delete clear has size forEach keys valules entries */

// forEach => 三个参数 value key(等于value) 当前Set集合
// keys是valules方法的别名，与valules返回的结果一样

(function () {
  const set = new Set([1, 2, 3, 1, 2, 3]) // 自动去重
  for (const key of set.keys()) {
    console.log(key); // 1 2 3 
  }
});


/* Map => set get delete size has clear forEach keys values entries */

// forEach => 三个参数 value key(等于value) 当前Map

(function(){
  const map = new Map([ // 相同的key会被后面的覆盖
    ['a', 1],
    ['b', 1],
    ['b', 2],
  ])
  for (const key of map.keys()) {
    console.log(key); // a b
  }
});


/* WeakMap => set get has delete */
// 不会影响垃圾回收 map引用的对象置为null时 后续会被清空 但Map不会
// key 只能是对象

(function(){
  // 复制到控制台打开 最后输出map map的key仍然有值 说明引用仍然存在
  class Test {}
  let test = new Test()
  const map = new Map()
  map.set(test, 123)
  test = null
});

(function(){
  // 复制到控制台打开 最后输出map 
  class Test {}
  let test = new Test()
  const map = new WeakMap()
  map.set(test, 123)
  test = null
})();

// 还可以将上述代码复制到 index.html中 查看 Memory 点击第一个圆按钮 进行拍照 然后输入Test进行筛选 可以看见Test是否还有引用

/* 求数组的 交集 并集 差集 */
(function(){
  const arr1 = [1, 2, 3, 4]
  const arr2 = [3, 4, 5, 6]
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  // 并集
  console.log(...new Set([...arr1, ...arr2]));
  // 交集
  console.log(arr1.filter(v => set2.has(v)));
  // 差集
  console.log(arr1.filter(v => !set2.has(v)));
  console.log(arr2.filter(v => !set1.has(v)));
});
