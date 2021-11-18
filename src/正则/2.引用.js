/* 
\1表示对第1个括号中的引用
\2表示对第2个括号中的引用
*/
;(function () {
  // 所以它匹配的就是 aa-zz AA-ZZ 的连续字母
  function containsRepeatingLetter(str) {
    return /([a-zA-Z])\1/.test(str)
  }
  console.log(containsRepeatingLetter('asdsddfsef'))
})()