/* ----------------------------------------- 普通捕获组引用 ----------------------------------------- */
/* 
- \n表示第n个捕获组 从1开始
*/
;(function () {
  console.log(/([a-zA-Z])\1/.test('abcc')) // true
  console.log(/([a-zA-Z])\1/.test('abc')) // false
})

/* ----------------------------------------- 具名捕获组引用 ----------------------------------------- */
/* 
- \k + 尖括号 + 捕获组名
- 索引引用依然有效
*/
;(function () {
  console.log(/(?<name>[a-zA-Z])\k<name>/.test('abcc')) // true
})

/* ----------------------------------------- 捕获组引用 ----------------------------------------- */
/* 
- $number 表示第几个捕获组
*/
;(function () {
  console.log('2022-04-18T16:00:00'.replace(/^((\d+\-){2})\d+/, '$101'))
})
