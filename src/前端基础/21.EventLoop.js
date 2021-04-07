// js是单线程(主线程)

// 进程：是计算机分配任务的最小单位，一个进程包含多个线程

// 浏览器是一个多个进程组成(比如浏览器每个tab页都是一个进程)

// 渲染进程包含多个线程
// 1.GPU渲染线程
// 2.js引擎线程
// 3.时间触发线程 事件循环
// 4.事件线程 click setTimeout ajax

// 事件循环：宏任务=>微任务=>GPU渲染=>宏任务...

// 宏任务：界面渲染、script脚本、setTimeout、setInterval、postMessage、MessageChannel、setImmediate(ID) 事件 ajax
// 微任务：promise.then、MutationObserver

// 当前宏任务中创建的微任务，在当前宏任务执行完后，优先清除自己的微任务队列，再执行其他的宏任务
// 微任务中再次创建微任务，直接在当前队列中清除

/* 1 */
// document.body.style.background = 'red'
// console.log(1);
// Promise.resolve().then(() => {
//   console.log(2);
//   document.body.style.background = 'yellow'
// })
// console.log(3);
// 不会闪烁 因为渲染在微任务之后执行所以只会渲染最后一个

/* 2 */
// document.body.style.background = 'red'
// setTimeout(() => {
//   document.body.style.background = 'yellow'
// })

// 不一定会渲染 因为有可能没有达到渲染时机（渲染间隔事件16.66s）
/* 3 */
// const button = document.querySelector('#button')
// button.addEventListener('click', () => {
//   console.log('listener1');
//   Promise.resolve().then(() => {
//     console.log('micro task1');
//   })
// })
// button.addEventListener('click', () => {
//   console.log('listener2');
//   Promise.resolve().then(() => {
//     console.log('micro task2');
//   })
// })
// button.click()

// listener1
// listener2
// micro task1
// micro task2
// 这种click是直接触发的 相当于事件函数是直接执行的
// 如果是用户手动点击按钮 触发的事件函数就是一个宏任务

/* 4 */
// Promise.resolve().then(() => {
//   console.log('Promise1')
//   setTimeout(() => {
//       console.log('setTimeout2')
//   }, 0);
// })
// setTimeout(() => {
//   console.log('setTimeout1');
//   Promise.resolve().then(() => {
//       console.log('Promise2')
//   })
// }, 0);
// Promise1
// setTimeout1
// Promise2
// setTimeout2