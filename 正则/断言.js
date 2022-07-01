/* ----------------------------------------- 先行断言 ----------------------------------------- */
/* 
- 格式: /x(?=y)/ x只有在y前面才匹配
*/
;(function () {
  console.log(/\d(?=%)/.exec('123%45%678%9')) // 3
})

/* ----------------------------------------- 后行断言 ----------------------------------------- */
/* 
- 格式: /(?<=y)x/ x只有在y前后面才匹配
*/
;(function () {
  console.log(/(?<=%)\d/.exec('123%45%678%9')) // 4
  console.log('2022-04-18T16:00:00'.replace(/(?<=((\d+\-){2}))\d+/, '01'))
})()
