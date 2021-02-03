
/* 
函数的核心作用就是用来批量创建对象

运算符优先级 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

*/

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

/* 
优先级： arguments > 函数声明 > 变量声明
*/
function test(a){
  function a(){
    console.log(1);
  }
  var a = function(){
    console.log(2);
  }
  a()
}
test(function() {console.log(3);})
