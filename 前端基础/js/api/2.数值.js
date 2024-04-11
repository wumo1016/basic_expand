/* ----------------------------------------- 进制前缀  ----------------------------------------- */
/* 
- 2进制: 0b / 0B
- 8进制: 0o / 0O
- 将带前缀的其他进制的数转换为十进制 使用 Number 即可 
*/
;(function () {})

/* ----------------------------------------- 数值分隔符  ----------------------------------------- */
/* 注意事项
- 1.不能放在数值的最前面或最后面
- 2.不能两个以上的分隔符在一起
- 3.小数点前后不能有分隔符
- 4.科学计数法中的eE前后不能有分隔符
- 5.只是一种书写便利 使用或打印时都是实际的数值
*/
;(function () {
  console.log(1_1 === 11)
  console.log(11_11_11 === 111111)
  console.log(111_111_111 === 111111111)
})()

/* ----------------------------------------- Number静态属性  ----------------------------------------- */
/* 
- MAX_SAFE_INTEGER: 最大安全整数(Math.pow(2, 53) - 1)(9007199254740991)
- MIN_SAFE_INTEGER: 最小安全整数(-9007199254740991)
*/
;(function () {
  console.log(Number.MAX_SAFE_INTEGER === 9007199254740991)
  console.log(Number.MIN_SAFE_INTEGER === -9007199254740991)
})

/* ----------------------------------------- Number静态方法  ----------------------------------------- */
/* 
- parseInt: 与全局方法一致(将指定基数的字符串转换为十进制数) => parseInt(string, radix)
- parseFloat: 与全局方法一致(将字符串转换为浮点数)
- isFinite: (全局方法)判断是是否不是 Infinity
- isInteger: 判断是否是整数
- isSafeInteger: 判断是否是安全整数
- toFixed: (digits) - 小数点后保留几位, 值为 0-100 (省略则为0), 返回值为字符串
*/
;(function () {
  console.log(Number.parseInt === parseInt)
  console.log(Number.parseFloat === parseFloat)

  console.log(isFinite(123)) // true
  console.log(isFinite(Infinity)) // false

  console.log(Number.isInteger(123)) // true
  console.log(Number.isInteger(123.1)) // false

  console.log(Number.isSafeInteger(123)) // true
  console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)) // false
})

/* ----------------------------------------- Math静态方法  ----------------------------------------- */
/* 
- trunc: 去除小数部分
- sign: 用于判断一个数是否大于0(大于0返回1 小于0返回-1 等于0返回0)
*/
;(function () {
  console.log(Math.trunc(1.23)) // 1

  console.log(Math.trunc(100)) // 100
  console.log(Math.trunc(-100)) // -100
  console.log(Math.trunc(0)) // 0
})
