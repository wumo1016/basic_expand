### 选取页面所有 dom

```js
console.log($$('*'))
```

### api

- ownerDocument: 每个 DOM 元素都有的属性，指向该元素所属的文档对象（document）
  - 对于页面中直接创建的元素，ownerDocument 指向当前页面的 document
  - 对于 iframe 内部的元素，ownerDocument 指向 iframe 对应的 document（而非父页面的 document）
- defaultView: 每个 DOM 元素都有的属性，指向该元素所属的文档对象（document）的 window 对象
  - 对于当前页面的 document，defaultView 等价于全局的 window
  - 对于 iframe 的 document，defaultView 指向 iframe 对应的 window 对象
- window.Element: 所有 DOM 元素的构造函数，用于创建新的 DOM 元素
  - Element 接口继承自 Node 接口
