/* ----------------------------------------- RegExp 构造函数  ----------------------------------------- */
/* 
- 参数有两种情况
  - 第一个参数是字符串 第二个参数是正则修饰符
  - 第一个参数是正则表达式 第二个参数是正则修饰符
    - 返回原有正则的拷贝
    - 第二个参数会覆盖原有的修饰符
*/

;(function () {
  console.log(new RegExp(/abc/gi, 'i').flags) // i
})

/* ----------------------------------------- 实例 属性  ----------------------------------------- */
/* 
- lastIndex: 从什么位置开始匹配 获取/设置
  - 全局匹配 g 或者粘性匹配 y 时才会生效
  - 匹配成功后 lastIndex会被设置为匹配到的字符串的下一个位置
  - 匹配失败后 lastIndex会被设置为0
- source: 返回表达式的正文
- flags: 返回表达式的修饰符
*/

/* lastIndex */
;(function () {
  // const reg = /a/g
  // const str = 'aaa'
  // console.log(reg.lastIndex) // 0
  // console.log(reg.exec(str))
  // console.log(reg.lastIndex) // 1
})

/* source */
;(function () {
  const reg = /abc/g
  console.log(reg.source) // abc
})

/* flags */
;(function () {
  /* flags */
  const reg = /abc/g
  console.log(reg.flags) // g
})

/* ----------------------------------------- RegExp 静态属性  ----------------------------------------- */
/* 
- 
*/
;(function () {})
