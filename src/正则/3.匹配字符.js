/* ----------------------------------------- 匹配任意字符 ----------------------------------------- */
/* 
- .
- [^]
*/
;(function () {
  console.log(/abc.+def/.test('abc123def')) // true
  console.log(/abc[^]+def/.test('abc123def')) // true
})
