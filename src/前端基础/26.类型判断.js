/* ------------------------------- typeof ------------------------------- */

/* ------------------------------- Object.prototype.toString.call(args) ------------------------------- */

/* ------------------------------- instanceof ------------------------------- */
// 会沿着右侧的原型链 __proto__ 不断向上寻找 直到找到或__ptoto__为null
;(function () {
  class Parent {}
  class Child extends Parent {}

  const child = new Child()

  console.log(child instanceof Child) // true
  console.log(child instanceof Parent) // true
  console.log(child instanceof Object) // true
})()
