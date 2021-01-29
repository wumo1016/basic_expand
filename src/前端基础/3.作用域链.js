/*  作用域链

1.作用域链在函数创建的时候就已经确定了 和在哪执行没区别

*/

function one() {
  var a = 1

  function two() {
    debugger
    console.log(a)
  }
  console.dir(two)
  // two['[[Scopes]]'] = [oneExecutionContextVo, globalExecutionContextVo];
  return two
}

var a = 2
// var outer_two = one()
// outer_two()


/* 
执行上下文有两个阶段，编译阶段和执行阶段

1.编译阶段(变量提升 确定作用域链 确定this执行) 
----会全局寻找var声明和函数声明 进行变量提升
----如果是 var 提升到顶部，赋值undefined 如果是函数声明 直接提升并赋值 
----先将所有函数声明提升到顶部，再提升var，扫描两遍
globalExecutionContextVo = {
  one: `()=>{}`,
  a: undefined,
  outer_two: undefined
}
globalExecutionContext = {
  VO: globalExecutionContextVo,
  scopeChain: [globalExecutionContextVo]
}

2.执行阶段(变量赋值 代码执行)
globalExecutionContext.VO.a = 2

函数one的编译阶段
oneExecutionContextVo = {
  // two: `()=>{}`,
  two: {
    twoFunction: `()=>{}`,
    [[Scopes]]: [oneExecutionContextVo, globalExecutionContextVo]
  },
  a: undefined
}
oneExecutionContext = {
  VO: oneExecutionContextVo,
  scopeChain: [oneExecutionContextVo, globalExecutionContextVo]
}

函数one的执行阶段
oneExecutionContext.VO.a = 1

globalExecutionContext.VO.outer_two = `two`

函数two的编译阶段
twoExecutionContextVo = {
}
twoExecutionContext = {
  VO: twoExecutionContextVo, // two的作用域在one创建的时候就已经确定了
  // scopeChain 初始化一个空数组 先放自己的VO 再将自身函数上的 [[Scopes]] 也加进去
  scopeChain: [twoExecutionContextVo, oneExecutionContextVo, globalExecutionContextVo]
}
函数two的执行阶段
打印a 沿作用域链向上查找

*/

/*
function test(){
  debugger
  var m = 1
  function a(){}
  var n = 2
  function b(){}
  b()
  a()
}
test()
 */