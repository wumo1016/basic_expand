/* 修饰符
- i: 忽略大小写
- g: 全局匹配 下一次从后面开始匹配(后面只要有符合就可以匹配)
- y: 全局匹配 下一次是紧接着上一次的末尾开始匹配 不符合就返回null
*/

;(function () {
  const s = 'aaa_aa_a'
  const r1 = /a+/g
  const r2 = /a+/y

  console.log(r1.exec(s)) // ["aaa"]
  console.log(r1.exec(s)) // ["aa"]
  console.log(r1.exec(s)) // ["a"]

  console.log(r2.exec(s)) // ["aaa"]
  console.log(r2.exec(s)) // null
})()
