## JS 书写规范

- 将所有缩写属性都写在对象声明前面---更方便知道哪些属性用了缩写
- 只对无效的属性使用引号(不仅代码高亮 而且也更容易被许多 js 引擎优化)
- 不要直接在对象原型上调用的方法(如：hasOwnProperty)
  ```javascript
  // bad
  console.log(object.hasOwnProperty(key));
  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));
  ```
- 使用 Array.from 而不是 ... 运算去做 map 遍历
  ```javascript
  // bad
  const baz = [...foo].map(func);
  // good
  const baz = Array.from(foo, func);
  ```
- 7.15
