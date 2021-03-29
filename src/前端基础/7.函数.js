/* 
函数的核心作用就是用来批量创建对象

运算符优先级 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

*/

function test2() {
  function Foo() {
    getName = function () {
      console.log(1);
    }
    return this;
  }
  Foo.getName = function () {
    console.log(2);
  }
  Foo.prototype.getName = function () {
    console.log(3);
  }
  var getName = function () {
    console.log(4);
  }

  function getName() {
    console.log(5);
  }
  Foo.getName(); // 2
  getName(); // 4
  Foo().getName(); // 1
  getName(); // 1
  new Foo.getName(); // 2 成员访问高级new无参数列表 先是成员访问 Foo.getName 返回一个函数 然后把函数当普通函数new执行
  new Foo().getName(); // 3 成员访问和new带参数优先级一样 按从左到右原则
  new new Foo().getName(); // 3

  /* new new Foo().getName()
  1. new new Foo().getName()   执行 new Foo()  =>  返回Foo的实例
  2. new f.getName()   执行成员访问 f.getName 返回一个函数 
  3. new fun(){ console.log(3); } ()   最后执行这个函数
  */
}
// test2()


/* 
 优先级： arguments > 函数声明 > 变量声明
*/
function test(a) {
  function a() {
    console.log(1);
  }
  var a = function () {
    console.log(2);
  }
  console.log(a);
}
// test(3) // 3 function(){ console.log(3) }


/* 高阶函数
  1.一个函数返回一个函数
  2.参数可以接受一个函数
*/


/* 函数柯里化
  多个参数的传入 可以转换成n个函数
*/

function test1() {

  // function isType(typing) {
  //   return function (val) {
  //     return Object.prototype.toString.call(val) == `[object ${typing}]`
  //   }
  // }
  // const isString = isType('String')
  // console.log(isString(123));

  // 实现通用的柯里化函数
  // curring(1)(2)(3, 4) => 10
  function curring() {
    let total = 0
    let fn = (...args) => {
      total = args.reduce((a, b) => a + b, total)
      return fn
    }
    fn.toString = () => total
    return fn(...arguments)
  }
  console.log(curring(1)(2)(3, 4) + 0);

  function curring1(fn) {
    let inner = (args = []) => {
      return args.length >= fn.length ? fn(...args) : (...userArgs) => inner([...args, ...userArgs])
    }
    return inner()
  }

  function isType(typing, val) {
    return Object.prototype.toString.call(val) == `[object ${typing}]`
  }
  const isString = curring1(isType)('String')
  console.log(isString('2'));
  const isNumber = curring1(isType)('Number')
  console.log(isNumber(5));

}
test1()