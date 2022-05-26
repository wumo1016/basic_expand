/* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
- 属性
  - length
- 方法
  - concat(str1, ...strN): 拼接字符串，并返回新的字符串
  - startsWidth endsWith: 判断当前字符串是否以一个给定的字符串开头或结尾的
  - at(index): 可接受负数 从-1开始
  - charAt(index): 功能与at一致 但它不支持负数
  - charCodeAt(index) fromCharCode(str): index默认0；返回指定字符的Unicode编码， 开头128个Unicode编码与ASCII编码一致；index如果超出范围，则返回NaN
  - codePointAt(index) fromCodePoint(str): 功能与上面的一致
  - includes
  - indexOf lastIndexOf
  - localeCompare: str1.localeCompare(str2) 比较str1是否是在str2后面，是就返回1，否则返回-1
  - match matchAll: 支持正则
  - replace replaceAll: 支持正则
  - search: 匹配到就返回索引，否则返回-1；支持正则
  - split: 支持正则
  - padStart padEnd
  - repeat
  - slice(startIndex, endIndex): 支持负数
  - substring(startIndex, endIndex): 功能与slice一致 但不支持负数
  - toLowerCase toUpperCase
  - trim trimStart trimEnd
- 遍历
  - for of
- 其他
  - 支持索引取值
*/

/* ----------------------------------------- 标签模板 ----------------------------------------- */
/* 
- 第一个参数是没有被替换的部分组成的一个数组(通过变量进行分割的部分)
- 后面的参数依次是各个变量
*/
;(function () {
  function test() {
    console.log(arguments) // { '0': [ 'w ', ' b' ], '1': 'y' }
  }
  test`w ${'y'} b`
})

/* ----------------------------------------- repeat ----------------------------------------- */
/* 
- 第一个参数就是 重复多少次
- 如果是小数 小数位会被直接舍弃
- 0~-1 之间等于0 不包括-1
- 负数或Infinity 会报错
- NaN等于0
*/
;(function () {
  console.log('a'.repeat(3)) // aaa
  console.log('a'.repeat(2.8)) // aaa
  console.log('a'.repeat(-0.2)) // ''
})

/* ----------------------------------------- padStart padEnd ----------------------------------------- */
/* 
- 第一个参数 补全后字符串的最大长度
- 第二个参数 用来补全的字符串 (可省略 默认是空格)
*/
;(function () {
  console.log('wyb'.padStart(10, 'I love ')) // I love wyb
  console.log('wyb'.padEnd(11, ' is good')) // wyb is good
})

/* ----------------------------------------- at ----------------------------------------- */
/* 
- 第一个参数 位置索引
- 支持负索引
*/
;(function () {
  console.log('wyb'.at(0)) // w
  console.log('wyb'.at(-1)) // b
})

/* ----------------------------------------- 四个字符串方法都可以使用正则 match replace search split  ----------------------------------------- */
;(function () {})
