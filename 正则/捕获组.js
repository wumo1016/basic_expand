/* ----------------------------------------- 具名组匹配 ----------------------------------------- */
/* 
- 格式: ? + 尖括号 + 组名
*/
;(function () {
  const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
  const matchObj = RE_DATE.exec('1999-12-31')
  const year = matchObj.groups.year // "1999"
  const month = matchObj.groups.month // "12"
  const day = matchObj.groups.day // "31"
  console.log(year, month, day)
})()
