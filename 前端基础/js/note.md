### 格式化 money

```js
// const ThousandNum = num => String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// const ThousandNum = num => String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, match => `${match},`)
const ThousandNum = num => String(num).replace(/(?!^)(?=(\d{3})+$)/g, ',')
console.log(ThousandNum(10000000)) // 10,000,000
console.log(ThousandNum(100000000)) // 100,000,000
```

### 生成 0~5 颗星星

```js
const StartScore = rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
console.log(StartScore(0))
```

### 获取网址查询参数

```js
const params = new URLSearchParams(location.search.replace(/\?/gi, ''))
console.log(params.get('sex'))
```

### 小数转化为整数

```js
console.log(~~1.678) // 1
console.log(1.678 >> 0) // 1
console.log(1.678 | 0) // 1
console.log(1.678 ^ 0) // 1
```

### 判断数据类型

```js
// Number String Boolean Undefined Null Array Object Function Date RegExp
const isDataType = (target, type) => {
  return Object.prototype.toString.call(target).slice(8, -1) === type
}
```

### 属性名的类型

```js
// obj.key [[GET]](obj, key, obj) - key一定是string
// obj[key] [[GET]](obj, 是否是Symbol ? key : String(key), obj) - 第二个参数如果不是 Symbol 就使用String转成字符串
```
