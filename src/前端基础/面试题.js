/* ---------------- 1.编写parse函数，实现访问对象里属性的值 ------------------- */
function test1() {
  let obj = {
    a: 1,
    b: {
      c: 2
    },
    d: [1, 2, 3],
    e: [{
      f: [4, 5, 6]
    }]
  };
  let r1 = parse(obj, 'a'); // = 1;
  let r2 = parse(obj, 'b.c'); // = 2;
  let r3 = parse(obj, 'd[2]'); // = 3;
  let r4 = parse(obj, 'e[0].f[0]'); // = 4;
  console.log(r1, r2, r3, r4);

  // function parse(obj, str) {
  //   const fn = new Function('obj', 'return obj.' + str)
  //   console.log(fn);
  //   return fn(obj) // 执行 new Function 的时候，作用域链只有两个，函数作用域和全局作用域
  // }

  function parse(obj, str) {
    str = str.replace(/\[(\d)\]/g, '.$1')
    str.split('.').forEach(item => {
      obj = obj[item]
    });
    return obj
  }
}

// test1()
/* ----------------------- 2.数组扁平化的多种实现 -------------------------- */
function test2() {
  let arr = [
    [1],
    [2, 3],
    [4, 5, 6, [7, 8, [9, 10, [11]]]],
    12
  ];
  // 1
  console.log(arr.flat(Infinity));
  // 2
  console.log(arr.toString().split(',').map(v => Number(v)));
  // 3
  console.log(JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(v => Number(v)));
  // 4
  let arr1 = arr
  while(arr1.some(v => Array.isArray(v))){
    arr1 = [].concat(...arr1)
  }
  console.log(arr1);

}
// test2()

/* ------------------ 3.实现一个不可变对象 --------------------------- */
function test3(){
  // 1.不可扩展(不能添加新的属性)
  let obj1 = { name: 'wyb' }
  obj1.age = 18
  Object.preventExtensions(obj1) // 阻止扩展
  obj1.height = 180
  console.log(obj1); // {name: "wyb", age: 18}
  // 2.密封(不能添加新的也不能删除老的)
  let obj2 = { name: 'wyb', age: 18 }
  delete obj2.name
  Object.seal(obj2)
  delete obj2.age
  console.log(obj2); // {age: 18}
  // 3.冻结(不能新增、删除、修改)
  let obj3 = { name: 'wyb' }
  obj3.name = 'test'
  Object.freeze(obj3)
  obj3.name = 'wyb'
  console.log(obj3); // {name: "test"}

  // ** 以上都是浅控制
}
test3()



