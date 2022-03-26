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
