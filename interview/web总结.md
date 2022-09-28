- [前端面试题及答案汇总](#%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88%E6%B1%87%E6%80%BB)
  - [第 1 题：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？](#%E7%AC%AC-1-%E9%A2%98%E5%86%99-react--vue-%E9%A1%B9%E7%9B%AE%E6%97%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%9C%A8%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%86%99-key%E5%85%B6%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 2 题：`['1', '2', '3'].map(parseInt)` what & why ?](#%E7%AC%AC-2-%E9%A2%981-2-3mapparseint-what--why-)
  - [第 3 题：什么是防抖和节流？有什么区别？如何实现？](#%E7%AC%AC-3-%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
  - [第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](#%E7%AC%AC-4-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-setmapweakset-%E5%92%8C-weakmap-%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？](#%E7%AC%AC-5-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86%E5%92%8C%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0)
  - [第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？](#%E7%AC%AC-6-%E9%A2%98%E8%AF%B7%E5%88%86%E5%88%AB%E7%94%A8%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%80%9D%E6%83%B3%E5%92%8C%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%80%9D%E6%83%B3%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%8B%B7%E8%B4%9D%E5%87%BD%E6%95%B0)
  - [第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？](#%E7%AC%AC-7-%E9%A2%98es5es6-%E7%9A%84%E7%BB%A7%E6%89%BF%E9%99%A4%E4%BA%86%E5%86%99%E6%B3%95%E4%BB%A5%E5%A4%96%E8%BF%98%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [第 8 题：setTimeout、Promise、Async/Await 的区别](#%E7%AC%AC-8-%E9%A2%98settimeoutpromiseasyncawait-%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 9 题：Async/Await 如何通过同步的方式实现异步](#%E7%AC%AC-9-%E9%A2%98asyncawait-%E5%A6%82%E4%BD%95%E9%80%9A%E8%BF%87%E5%90%8C%E6%AD%A5%E7%9A%84%E6%96%B9%E5%BC%8F%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5)
  - [第 10 题：异步笔试题](#%E7%AC%AC-10-%E9%A2%98%E5%BC%82%E6%AD%A5%E7%AC%94%E8%AF%95%E9%A2%98)
  - [第 11 题：算法手写题](#%E7%AC%AC-11-%E9%A2%98%E7%AE%97%E6%B3%95%E6%89%8B%E5%86%99%E9%A2%98)
  - [第 12 题：JS 异步解决方案的发展历程以及优缺点。](#%E7%AC%AC-12-%E9%A2%98js-%E5%BC%82%E6%AD%A5%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E7%9A%84%E5%8F%91%E5%B1%95%E5%8E%86%E7%A8%8B%E4%BB%A5%E5%8F%8A%E4%BC%98%E7%BC%BA%E7%82%B9)
  - [第 13 题：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？](#%E7%AC%AC-13-%E9%A2%98promise-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E6%98%AF%E5%90%8C%E6%AD%A5%E6%89%A7%E8%A1%8C%E8%BF%98%E6%98%AF%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C%E9%82%A3%E4%B9%88-then-%E6%96%B9%E6%B3%95%E5%91%A2)
  - [第 14 题：情人节福利题，如何实现一个 new](#%E7%AC%AC-14-%E9%A2%98%E6%83%85%E4%BA%BA%E8%8A%82%E7%A6%8F%E5%88%A9%E9%A2%98%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-new)
  - [第 15 题：简单讲解一下 http2 的多路复用](#%E7%AC%AC-15-%E9%A2%98%E7%AE%80%E5%8D%95%E8%AE%B2%E8%A7%A3%E4%B8%80%E4%B8%8Bhttp2%E7%9A%84%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8)
  - [第 16 题：谈谈你对 TCP 三次握手和四次挥手的理解](#%E7%AC%AC-16-%E9%A2%98%E8%B0%88%E8%B0%88%E4%BD%A0%E5%AF%B9tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%92%8C%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E7%9A%84%E7%90%86%E8%A7%A3)
  - [第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态](#%E7%AC%AC-17-%E9%A2%98ab-%E6%9C%BA%E5%99%A8%E6%AD%A3%E5%B8%B8%E8%BF%9E%E6%8E%A5%E5%90%8Eb-%E6%9C%BA%E5%99%A8%E7%AA%81%E7%84%B6%E9%87%8D%E5%90%AF%E9%97%AE-a-%E6%AD%A4%E6%97%B6%E5%A4%84%E4%BA%8E-tcp-%E4%BB%80%E4%B9%88%E7%8A%B6%E6%80%81)
  - [第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？](#%E7%AC%AC-18-%E9%A2%98react-%E4%B8%AD-setstate-%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%90%8C%E6%AD%A5%E7%9A%84%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84)
  - [第 19 题：React setState 笔试题，下面的代码输出什么？](#%E7%AC%AC-19-%E9%A2%98react-setstate-%E7%AC%94%E8%AF%95%E9%A2%98%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88)
  - [第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？](#%E7%AC%AC-20-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-npm-%E6%A8%A1%E5%9D%97%E5%AE%89%E8%A3%85%E6%9C%BA%E5%88%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BE%93%E5%85%A5-npm-install-%E5%B0%B1%E5%8F%AF%E4%BB%A5%E8%87%AA%E5%8A%A8%E5%AE%89%E8%A3%85%E5%AF%B9%E5%BA%94%E7%9A%84%E6%A8%A1%E5%9D%97)
  - [第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣](#%E7%AC%AC-21-%E9%A2%98%E6%9C%89%E4%BB%A5%E4%B8%8B-3-%E4%B8%AA%E5%88%A4%E6%96%AD%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E6%B3%95%E8%AF%B7%E5%88%86%E5%88%AB%E4%BB%8B%E7%BB%8D%E5%AE%83%E4%BB%AC%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB%E5%92%8C%E4%BC%98%E5%8A%A3)
  - [第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](#%E7%AC%AC-22-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E9%87%8D%E7%BB%98%E5%92%8C%E5%9B%9E%E6%B5%81repaint--reflow%E4%BB%A5%E5%8F%8A%E5%A6%82%E4%BD%95%E8%BF%9B%E8%A1%8C%E4%BC%98%E5%8C%96)
  - [第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景](#%E7%AC%AC-23-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F%E5%92%8C%E8%AE%A2%E9%98%85-%E5%8F%91%E5%B8%83%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%AB%E5%90%84%E8%87%AA%E9%80%82%E7%94%A8%E4%BA%8E%E4%BB%80%E4%B9%88%E5%9C%BA%E6%99%AF)
  - [第 24 题：聊聊 Redux 和 Vuex 的设计思想](#%E7%AC%AC-24-%E9%A2%98%E8%81%8A%E8%81%8A-redux-%E5%92%8C-vuex-%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3)
  - [第 25 题：说说浏览器和 Node 事件循环的区别](#%E7%AC%AC-25-%E9%A2%98%E8%AF%B4%E8%AF%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E5%92%8C-node-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 26 题：介绍模块化发展历程](#%E7%AC%AC-26-%E9%A2%98%E4%BB%8B%E7%BB%8D%E6%A8%A1%E5%9D%97%E5%8C%96%E5%8F%91%E5%B1%95%E5%8E%86%E7%A8%8B)
  - [第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。](#%E7%AC%AC-27-%E9%A2%98%E5%85%A8%E5%B1%80%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%AD%E7%94%A8-const-%E5%92%8C-let-%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8F%98%E9%87%8F%E4%B8%8D%E5%9C%A8-window-%E4%B8%8A%E9%82%A3%E5%88%B0%E5%BA%95%E5%9C%A8%E5%93%AA%E9%87%8C%E5%A6%82%E4%BD%95%E5%8E%BB%E8%8E%B7%E5%8F%96)
  - [第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？](#%E7%AC%AC-28-%E9%A2%98cookie-%E5%92%8C-token-%E9%83%BD%E5%AD%98%E6%94%BE%E5%9C%A8-header-%E4%B8%AD%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E4%BC%9A%E5%8A%AB%E6%8C%81-token)
  - [第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的](#%E7%AC%AC-29-%E9%A2%98%E8%81%8A%E8%81%8A-vue-%E7%9A%84%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9Amodel-%E5%A6%82%E4%BD%95%E6%94%B9%E5%8F%98-viewview-%E5%8F%88%E6%98%AF%E5%A6%82%E4%BD%95%E6%94%B9%E5%8F%98-model-%E7%9A%84)
  - [第 30 题：两个数组合并成一个数组](#%E7%AC%AC-30-%E9%A2%98%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E5%90%88%E5%B9%B6%E6%88%90%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84)
  - [第 31 题：改造下面的代码，使之输出 0 - 9，写出你能想到的所有解法。](#%E7%AC%AC-31-%E9%A2%98%E6%94%B9%E9%80%A0%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E4%BD%BF%E4%B9%8B%E8%BE%93%E5%87%BA0---9%E5%86%99%E5%87%BA%E4%BD%A0%E8%83%BD%E6%83%B3%E5%88%B0%E7%9A%84%E6%89%80%E6%9C%89%E8%A7%A3%E6%B3%95)
  - [第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。](#%E7%AC%AC-32-%E9%A2%98virtual-dom-%E7%9C%9F%E7%9A%84%E6%AF%94%E6%93%8D%E4%BD%9C%E5%8E%9F%E7%94%9F-dom-%E5%BF%AB%E5%90%97%E8%B0%88%E8%B0%88%E4%BD%A0%E7%9A%84%E6%83%B3%E6%B3%95)
  - [第 33 题：下面的代码打印什么内容，为什么？](#%E7%AC%AC-33-%E9%A2%98%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%93%E5%8D%B0%E4%BB%80%E4%B9%88%E5%86%85%E5%AE%B9%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 34 题：简单改造下面的代码，使之分别打印 10 和 20。](#%E7%AC%AC-34-%E9%A2%98%E7%AE%80%E5%8D%95%E6%94%B9%E9%80%A0%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E4%BD%BF%E4%B9%8B%E5%88%86%E5%88%AB%E6%89%93%E5%8D%B0-10-%E5%92%8C-20)
  - [第 35 题：浏览器缓存读取规则](#%E7%AC%AC-35-%E9%A2%98%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98%E8%AF%BB%E5%8F%96%E8%A7%84%E5%88%99)
  - [第 36 题：使用迭代的方式实现 flatten 函数。](#%E7%AC%AC-36-%E9%A2%98%E4%BD%BF%E7%94%A8%E8%BF%AD%E4%BB%A3%E7%9A%84%E6%96%B9%E5%BC%8F%E5%AE%9E%E7%8E%B0-flatten-%E5%87%BD%E6%95%B0)
  - [第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？](#%E7%AC%AC-37-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88-vuex-%E7%9A%84-mutation-%E5%92%8C-redux-%E7%9A%84-reducer-%E4%B8%AD%E4%B8%8D%E8%83%BD%E5%81%9A%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C)
  - [第 38 题：下面代码中 a 在什么情况下会打印 1？](#%E7%AC%AC-38-%E9%A2%98%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E4%B8%AD-a-%E5%9C%A8%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E6%89%93%E5%8D%B0-1)
  - [第 39 题：介绍下 BFC 及其应用。](#%E7%AC%AC-39-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-bfc-%E5%8F%8A%E5%85%B6%E5%BA%94%E7%94%A8)
  - [第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop](#%E7%AC%AC-40-%E9%A2%98%E5%9C%A8-vue-%E4%B8%AD%E5%AD%90%E7%BB%84%E4%BB%B6%E4%B8%BA%E4%BD%95%E4%B8%8D%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E7%88%B6%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E7%9A%84-prop)
  - [第 41 题：下面代码输出什么](#%E7%AC%AC-41-%E9%A2%98%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88)
  - [第 42 题：实现一个 sleep 函数](#%E7%AC%AC-42-%E9%A2%98%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-sleep-%E5%87%BD%E6%95%B0)
  - [第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果](#%E7%AC%AC-43-%E9%A2%98%E4%BD%BF%E7%94%A8-sort-%E5%AF%B9%E6%95%B0%E7%BB%84-3-15-8-29-102-22-%E8%BF%9B%E8%A1%8C%E6%8E%92%E5%BA%8F%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C)
  - [第 44 题：介绍 HTTPS 握手过程](#%E7%AC%AC-44-%E9%A2%98%E4%BB%8B%E7%BB%8D-https-%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B)
  - [第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性](#%E7%AC%AC-45-%E9%A2%98https-%E6%8F%A1%E6%89%8B%E8%BF%87%E7%A8%8B%E4%B8%AD%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%A6%82%E4%BD%95%E9%AA%8C%E8%AF%81%E8%AF%81%E4%B9%A6%E7%9A%84%E5%90%88%E6%B3%95%E6%80%A7)
  - [第 46 题：输出以下代码执行的结果并解释为什么](#%E7%AC%AC-46-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%9A%84%E7%BB%93%E6%9E%9C%E5%B9%B6%E8%A7%A3%E9%87%8A%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 47 题：双向绑定和 vuex 是否冲突](#%E7%AC%AC-47-%E9%A2%98%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E5%92%8C-vuex-%E6%98%AF%E5%90%A6%E5%86%B2%E7%AA%81)
  - [第 48 题：call 和 apply 的区别是什么，哪个性能更好一些](#%E7%AC%AC-48-%E9%A2%98call-%E5%92%8C-apply-%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88%E5%93%AA%E4%B8%AA%E6%80%A7%E8%83%BD%E6%9B%B4%E5%A5%BD%E4%B8%80%E4%BA%9B)
  - [第 49 题：为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？](#%E7%AC%AC-49-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%9A%E5%B8%B8%E5%9C%A8%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE%E5%9F%8B%E7%82%B9%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%E4%BD%BF%E7%94%A8%E7%9A%84%E6%98%AF-1x1-%E5%83%8F%E7%B4%A0%E7%9A%84%E9%80%8F%E6%98%8E-gif-%E5%9B%BE%E7%89%87)
  - [第 50 题：实现 (5).add(3).minus(2) 功能。](#%E7%AC%AC-50-%E9%A2%98%E5%AE%9E%E7%8E%B0-5add3minus2-%E5%8A%9F%E8%83%BD)
  - [第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？](#%E7%AC%AC-51-%E9%A2%98vue-%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E4%B8%AD-objectdefineproperty-%E6%9C%89%E4%BB%80%E4%B9%88%E7%BC%BA%E9%99%B7)
  - [第 52 题：怎么让一个 div 水平垂直居中](#%E7%AC%AC-52-%E9%A2%98%E6%80%8E%E4%B9%88%E8%AE%A9%E4%B8%80%E4%B8%AA-div-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD)
  - [第 53 题：输出以下代码的执行结果并解释为什么](#%E7%AC%AC-53-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C%E5%B9%B6%E8%A7%A3%E9%87%8A%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？](#%E7%AC%AC-54-%E9%A2%98%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%98%AF%E5%A4%9A%E5%B0%91-%E8%BF%98%E5%8F%AF%E4%BB%A5%E5%A6%82%E4%BD%95%E6%94%B9%E8%BF%9B)
  - [第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面](#%E7%AC%AC-55-%E9%A2%98%E6%9F%90%E5%85%AC%E5%8F%B8-1-%E5%88%B0-12-%E6%9C%88%E4%BB%BD%E7%9A%84%E9%94%80%E5%94%AE%E9%A2%9D%E5%AD%98%E5%9C%A8%E4%B8%80%E4%B8%AA%E5%AF%B9%E8%B1%A1%E9%87%8C%E9%9D%A2)
  - [第 56 题：要求设计 LazyMan 类，实现以下功能。](#%E7%AC%AC-56-%E9%A2%98%E8%A6%81%E6%B1%82%E8%AE%BE%E8%AE%A1-lazyman-%E7%B1%BB%E5%AE%9E%E7%8E%B0%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。](#%E7%AC%AC-57-%E9%A2%98%E5%88%86%E6%9E%90%E6%AF%94%E8%BE%83-opacity-0visibility-hiddendisplay-none-%E4%BC%98%E5%8A%A3%E5%92%8C%E9%80%82%E7%94%A8%E5%9C%BA%E6%99%AF)
  - [第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？](#%E7%AC%AC-58-%E9%A2%98%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0function%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0function%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8-new-%E7%94%9F%E6%88%90%E5%AE%9E%E4%BE%8B%E9%82%A3%E4%B9%88%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E5%8F%AF%E4%BB%A5%E5%90%97%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 59 题：给定两个数组，写一个方法来计算它们的交集。](#%E7%AC%AC-59-%E9%A2%98%E7%BB%99%E5%AE%9A%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E5%86%99%E4%B8%80%E4%B8%AA%E6%96%B9%E6%B3%95%E6%9D%A5%E8%AE%A1%E7%AE%97%E5%AE%83%E4%BB%AC%E7%9A%84%E4%BA%A4%E9%9B%86)
  - [第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。](#%E7%AC%AC-60-%E9%A2%98%E5%B7%B2%E7%9F%A5%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E6%89%8D%E8%83%BD%E8%AE%A9%E5%9B%BE%E7%89%87%E5%AE%BD%E5%BA%A6%E4%B8%BA-300px-%E6%B3%A8%E6%84%8F%E4%B8%8B%E9%9D%A2%E4%BB%A3%E7%A0%81%E4%B8%8D%E5%8F%AF%E4%BF%AE%E6%94%B9)
  - [第 61 题：介绍下如何实现 token 加密](#%E7%AC%AC-61-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0-token-%E5%8A%A0%E5%AF%86)
  - [第 62 题：redux 为什么要把 reducer 设计成纯函数](#%E7%AC%AC-62-%E9%A2%98redux-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%8A%8A-reducer-%E8%AE%BE%E8%AE%A1%E6%88%90%E7%BA%AF%E5%87%BD%E6%95%B0)
  - [第 63 题：如何设计实现无缝轮播](#%E7%AC%AC-63-%E9%A2%98%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E5%AE%9E%E7%8E%B0%E6%97%A0%E7%BC%9D%E8%BD%AE%E6%92%AD)
  - [第 64 题：模拟实现一个 Promise.finally](#%E7%AC%AC-64-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-promisefinally)
  - [第 65 题： `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？](#%E7%AC%AC-65-%E9%A2%98-abcd-%E5%92%8C-abcd%E5%93%AA%E4%B8%AA%E6%80%A7%E8%83%BD%E6%9B%B4%E9%AB%98)
  - [第 66 题：ES6 代码转成 ES5 代码的实现思路是什么](#%E7%AC%AC-66-%E9%A2%98es6-%E4%BB%A3%E7%A0%81%E8%BD%AC%E6%88%90-es5-%E4%BB%A3%E7%A0%81%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 67 题：数组编程题](#%E7%AC%AC-67-%E9%A2%98%E6%95%B0%E7%BB%84%E7%BC%96%E7%A8%8B%E9%A2%98)
  - [第 68 题： 如何解决移动端 Retina 屏 1px 像素问题](#%E7%AC%AC-68-%E9%A2%98-%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E7%A7%BB%E5%8A%A8%E7%AB%AF-retina-%E5%B1%8F-1px-%E5%83%8F%E7%B4%A0%E9%97%AE%E9%A2%98)
  - [第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。](#%E7%AC%AC-69-%E9%A2%98-%E5%A6%82%E4%BD%95%E6%8A%8A%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%8F%96%E5%8F%8D%E5%A4%A7%E5%86%99%E5%8F%98%E5%B0%8F%E5%86%99%E5%B0%8F%E5%86%99%E5%8F%98%E5%A4%A7%E5%86%99%E4%BE%8B%E5%A6%82-abc-%E5%8F%98%E6%88%90-abc-)
  - [第 70 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的](#%E7%AC%AC-70-%E9%A2%98-%E4%BB%8B%E7%BB%8D%E4%B8%8B-webpack-%E7%83%AD%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86%E6%98%AF%E5%A6%82%E4%BD%95%E5%81%9A%E5%88%B0%E5%9C%A8%E4%B8%8D%E5%88%B7%E6%96%B0%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%89%8D%E6%8F%90%E4%B8%8B%E6%9B%B4%E6%96%B0%E9%A1%B5%E9%9D%A2%E7%9A%84)
  - [第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。](#%E7%AC%AC-71-%E9%A2%98-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D%E7%AE%97%E6%B3%95%E4%BB%8E%E9%95%BF%E5%BA%A6%E4%B8%BA-n-%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2-s-%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E5%AD%97%E7%AC%A6%E4%B8%B2-tt-%E7%9A%84%E9%95%BF%E5%BA%A6%E6%98%AF-m%E8%8B%A5%E5%AD%98%E5%9C%A8%E8%BF%94%E5%9B%9E%E6%89%80%E5%9C%A8%E4%BD%8D%E7%BD%AE)
  - [第 72 题： 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。](#%E7%AC%AC-72-%E9%A2%98-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%99%AE%E9%80%9A-for-%E5%BE%AA%E7%8E%AF%E7%9A%84%E6%80%A7%E8%83%BD%E8%BF%9C%E8%BF%9C%E9%AB%98%E4%BA%8E-foreach-%E7%9A%84%E6%80%A7%E8%83%BD%E8%AF%B7%E8%A7%A3%E9%87%8A%E5%85%B6%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9B%A0)
  - [第 73 题： 介绍下 BFC、IFC、GFC 和 FFC](#%E7%AC%AC-73-%E9%A2%98-%E4%BB%8B%E7%BB%8D%E4%B8%8B-bfcifcgfc-%E5%92%8C-ffc)
  - [第 74 题： 使用 JavaScript Proxy 实现简单的数据绑定](#%E7%AC%AC-74-%E9%A2%98-%E4%BD%BF%E7%94%A8-javascript-proxy-%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)
  - [第 75 题：数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少](#%E7%AC%AC-75-%E9%A2%98%E6%95%B0%E7%BB%84%E9%87%8C%E9%9D%A2%E6%9C%8910%E4%B8%87%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8F%96%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E5%92%8C%E7%AC%AC10%E4%B8%87%E4%B8%AA%E5%85%83%E7%B4%A0%E7%9A%84%E6%97%B6%E9%97%B4%E7%9B%B8%E5%B7%AE%E5%A4%9A%E5%B0%91)
  - [第 76 题：输出以下代码运行结果](#%E7%AC%AC-76-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 77 题：算法题「旋转数组」](#%E7%AC%AC-77-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98%E6%97%8B%E8%BD%AC%E6%95%B0%E7%BB%84)
  - [第 78 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么](#%E7%AC%AC-78-%E9%A2%98vue-%E7%9A%84%E7%88%B6%E7%BB%84%E4%BB%B6%E5%92%8C%E5%AD%90%E7%BB%84%E4%BB%B6%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 79 题：input 搜索如何防抖，如何处理中文输入](#%E7%AC%AC-79-%E9%A2%98input-%E6%90%9C%E7%B4%A2%E5%A6%82%E4%BD%95%E9%98%B2%E6%8A%96%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E4%B8%AD%E6%96%87%E8%BE%93%E5%85%A5)
  - [第 80 题：介绍下 Promise.all 使用、原理实现及错误处理](#%E7%AC%AC-80-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-promiseall-%E4%BD%BF%E7%94%A8%E5%8E%9F%E7%90%86%E5%AE%9E%E7%8E%B0%E5%8F%8A%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)
  - [第 81 题：打印出 1 - 10000 之间的所有对称数](#%E7%AC%AC-81-%E9%A2%98%E6%89%93%E5%8D%B0%E5%87%BA-1---10000-%E4%B9%8B%E9%97%B4%E7%9A%84%E6%89%80%E6%9C%89%E5%AF%B9%E7%A7%B0%E6%95%B0)
  - [第 82 题：周一算法题之「移动零」](#%E7%AC%AC-82-%E9%A2%98%E5%91%A8%E4%B8%80%E7%AE%97%E6%B3%95%E9%A2%98%E4%B9%8B%E7%A7%BB%E5%8A%A8%E9%9B%B6)
  - [第 83 题：var、let 和 const 区别的实现原理是什么](#%E7%AC%AC-83-%E9%A2%98varlet-%E5%92%8C-const-%E5%8C%BA%E5%88%AB%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 84 题：请实现一个 add 函数，满足以下功能。](#%E7%AC%AC-84-%E9%A2%98%E8%AF%B7%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-add-%E5%87%BD%E6%95%B0%E6%BB%A1%E8%B6%B3%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别](#%E7%AC%AC-85-%E9%A2%98react-router-%E9%87%8C%E7%9A%84-link-%E6%A0%87%E7%AD%BE%E5%92%8C-a-%E6%A0%87%E7%AD%BE%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
  - [第 86 题：周一算法题之「两数之和」](#%E7%AC%AC-86-%E9%A2%98%E5%91%A8%E4%B8%80%E7%AE%97%E6%B3%95%E9%A2%98%E4%B9%8B%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C)
  - [第 87 题：在输入框中如何判断输入的是一个正确的网址。](#%E7%AC%AC-87-%E9%A2%98%E5%9C%A8%E8%BE%93%E5%85%A5%E6%A1%86%E4%B8%AD%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E8%BE%93%E5%85%A5%E7%9A%84%E6%98%AF%E4%B8%80%E4%B8%AA%E6%AD%A3%E7%A1%AE%E7%9A%84%E7%BD%91%E5%9D%80)
  - [第 88 题：实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度](#%E7%AC%AC-88-%E9%A2%98%E5%AE%9E%E7%8E%B0-convert-%E6%96%B9%E6%B3%95%E6%8A%8A%E5%8E%9F%E5%A7%8B-list-%E8%BD%AC%E6%8D%A2%E6%88%90%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%E8%A6%81%E6%B1%82%E5%B0%BD%E5%8F%AF%E8%83%BD%E9%99%8D%E4%BD%8E%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6)
  - [第 89 题：设计并实现 Promise.race()](#%E7%AC%AC-89-%E9%A2%98%E8%AE%BE%E8%AE%A1%E5%B9%B6%E5%AE%9E%E7%8E%B0-promiserace)
  - [第 90 题：实现模糊搜索结果的关键词高亮显示](#%E7%AC%AC-90-%E9%A2%98%E5%AE%9E%E7%8E%B0%E6%A8%A1%E7%B3%8A%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C%E7%9A%84%E5%85%B3%E9%94%AE%E8%AF%8D%E9%AB%98%E4%BA%AE%E6%98%BE%E7%A4%BA)
  - [第 91 题：介绍下 HTTPS 中间人攻击](#%E7%AC%AC-91-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-https-%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)
  - [第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id](#%E7%AC%AC-92-%E9%A2%98%E5%B7%B2%E7%9F%A5%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0-fn-%E6%89%BE%E5%87%BA%E9%93%BE%E6%9D%A1%E4%B8%AD%E6%89%80%E6%9C%89%E7%9A%84%E7%88%B6%E7%BA%A7-id)
  - [第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。](#%E7%AC%AC-93-%E9%A2%98%E7%BB%99%E5%AE%9A%E4%B8%A4%E4%B8%AA%E5%A4%A7%E5%B0%8F%E4%B8%BA-m-%E5%92%8C-n-%E7%9A%84%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84-nums1-%E5%92%8C-nums2%E8%AF%B7%E6%89%BE%E5%87%BA%E8%BF%99%E4%B8%A4%E4%B8%AA%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E4%B8%AD%E4%BD%8D%E6%95%B0%E8%A6%81%E6%B1%82%E7%AE%97%E6%B3%95%E7%9A%84%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%B8%BA-ologmn)
  - [第 94 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？](#%E7%AC%AC-94-%E9%A2%98vue-%E5%9C%A8-v-for-%E6%97%B6%E7%BB%99%E6%AF%8F%E9%A1%B9%E5%85%83%E7%B4%A0%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6%E9%9C%80%E8%A6%81%E7%94%A8%E4%BA%8B%E4%BB%B6%E4%BB%A3%E7%90%86%E5%90%97%E4%B8%BA%E4%BB%80%E4%B9%88)
  - [第 95 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况](#%E7%AC%AC-95-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E6%B7%B1%E6%8B%B7%E8%B4%9D%E5%B9%B6%E8%80%83%E8%99%91%E5%AF%B9%E8%B1%A1%E7%9B%B8%E4%BA%92%E5%BC%95%E7%94%A8%E4%BB%A5%E5%8F%8A-symbol-%E6%8B%B7%E8%B4%9D%E7%9A%84%E6%83%85%E5%86%B5)
  - [第 96 题：介绍下前端加密的常见场景和方法](#%E7%AC%AC-96-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B%E5%89%8D%E7%AB%AF%E5%8A%A0%E5%AF%86%E7%9A%84%E5%B8%B8%E8%A7%81%E5%9C%BA%E6%99%AF%E5%92%8C%E6%96%B9%E6%B3%95)
  - [第 97 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？](#%E7%AC%AC-97-%E9%A2%98react-%E5%92%8C-vue-%E7%9A%84-diff-%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%E4%BB%8E-on%5E3-%E4%BC%98%E5%8C%96%E5%88%B0-on-%E9%82%A3%E4%B9%88-on%5E3-%E5%92%8C-on-%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E5%87%BA%E6%9D%A5%E7%9A%84)
  - [第 98 题：写出如下代码的打印结果](#%E7%AC%AC-98-%E9%A2%98%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 99 题：编程算法题](#%E7%AC%AC-99-%E9%A2%98%E7%BC%96%E7%A8%8B%E7%AE%97%E6%B3%95%E9%A2%98)
  - [第 100 题：请写出如下代码的打印结果](#%E7%AC%AC-100-%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 101 题：修改以下 print 函数，使之输出 0 到 99，或者 99 到 0](#%E7%AC%AC-101-%E9%A2%98%E4%BF%AE%E6%94%B9%E4%BB%A5%E4%B8%8B-print-%E5%87%BD%E6%95%B0%E4%BD%BF%E4%B9%8B%E8%BE%93%E5%87%BA-0-%E5%88%B0-99%E6%88%96%E8%80%85-99-%E5%88%B0-0)
  - [第 102 题：不用加减乘除运算符，求整数的 7 倍](#%E7%AC%AC-102-%E9%A2%98%E4%B8%8D%E7%94%A8%E5%8A%A0%E5%87%8F%E4%B9%98%E9%99%A4%E8%BF%90%E7%AE%97%E7%AC%A6%E6%B1%82%E6%95%B4%E6%95%B0%E7%9A%847%E5%80%8D)
  - [第 103 题：模拟实现一个 localStorage](#%E7%AC%AC-103-%E9%A2%98%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-localstorage)
  - [第 104 题：模拟 localStorage 时如何实现过期时间功能](#%E7%AC%AC-104-%E9%A2%98%E6%A8%A1%E6%8B%9F-localstorage-%E6%97%B6%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%BF%87%E6%9C%9F%E6%97%B6%E9%97%B4%E5%8A%9F%E8%83%BD)
  - [第 105 题：编程题](#%E7%AC%AC-105-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98)
  - [第 106 题：分别写出如下代码的返回值](#%E7%AC%AC-106-%E9%A2%98%E5%88%86%E5%88%AB%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC)
  - [第 107 题：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素。](#%E7%AC%AC-107-%E9%A2%98%E8%80%83%E8%99%91%E5%88%B0%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98%E5%A6%82%E4%BD%95%E5%BF%AB%E9%80%9F%E4%BB%8E%E4%B8%80%E4%B8%AA%E5%B7%A8%E5%A4%A7%E7%9A%84%E6%95%B0%E7%BB%84%E4%B8%AD%E9%9A%8F%E6%9C%BA%E8%8E%B7%E5%8F%96%E9%83%A8%E5%88%86%E5%85%83%E7%B4%A0)
  - [第 108 题：请写出如下代码的打印结果](#%E7%AC%AC-108-%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 109 题：扩展题，请写出如下代码的打印结果](#%E7%AC%AC-109-%E9%A2%98%E6%89%A9%E5%B1%95%E9%A2%98%E8%AF%B7%E5%86%99%E5%87%BA%E5%A6%82%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%9A%84%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C)
  - [第 110 题：编程题，请写一个函数，完成以下功能](#%E7%AC%AC-110-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E8%AF%B7%E5%86%99%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E5%AE%8C%E6%88%90%E4%BB%A5%E4%B8%8B%E5%8A%9F%E8%83%BD)
  - [第 111 题：编程题，写个程序把 entry 转换成如下对象](#%E7%AC%AC-111-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E5%86%99%E4%B8%AA%E7%A8%8B%E5%BA%8F%E6%8A%8A-entry-%E8%BD%AC%E6%8D%A2%E6%88%90%E5%A6%82%E4%B8%8B%E5%AF%B9%E8%B1%A1)
  - [第 112 题：编程题，写个程序把 entry 转换成如下对象（跟昨日题目相反）](#%E7%AC%AC-112-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E5%86%99%E4%B8%AA%E7%A8%8B%E5%BA%8F%E6%8A%8A-entry-%E8%BD%AC%E6%8D%A2%E6%88%90%E5%A6%82%E4%B8%8B%E5%AF%B9%E8%B1%A1%E8%B7%9F%E6%98%A8%E6%97%A5%E9%A2%98%E7%9B%AE%E7%9B%B8%E5%8F%8D)
  - [第 113 题：编程题，根据以下要求，写一个数组去重函数（蘑菇街）](#%E7%AC%AC-113-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E6%A0%B9%E6%8D%AE%E4%BB%A5%E4%B8%8B%E8%A6%81%E6%B1%82%E5%86%99%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D%E5%87%BD%E6%95%B0%E8%98%91%E8%8F%87%E8%A1%97)
  - [第 114 题：编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）](#%E7%AC%AC-114-%E9%A2%98%E7%BC%96%E7%A8%8B%E9%A2%98%E6%89%BE%E5%87%BA%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E8%BF%9E%E7%BB%AD%E5%87%BA%E7%8E%B0%E6%9C%80%E5%A4%9A%E7%9A%84%E5%AD%97%E7%AC%A6%E5%92%8C%E4%B8%AA%E6%95%B0%E8%98%91%E8%8F%87%E8%A1%97)
  - [第 115 题：写一个单向链数据结构的 js 实现并标注复杂度（水滴筹）](#%E7%AC%AC-115-%E9%A2%98%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%95%E5%90%91%E9%93%BE%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%9A%84-js-%E5%AE%9E%E7%8E%B0%E5%B9%B6%E6%A0%87%E6%B3%A8%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%B0%B4%E6%BB%B4%E7%AD%B9)
  - [第 116 题：输出以下代码运行结果](#%E7%AC%AC-116-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E8%BF%90%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 117 题：介绍下 http1.0、1.1、2.0 协议的区别？](#%E7%AC%AC-117-%E9%A2%98%E4%BB%8B%E7%BB%8D%E4%B8%8B-http101120-%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [第 118 题：vue 渲染大量数据时应该怎么优化？](#%E7%AC%AC-118-%E9%A2%98vue-%E6%B8%B2%E6%9F%93%E5%A4%A7%E9%87%8F%E6%95%B0%E6%8D%AE%E6%97%B6%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E4%BC%98%E5%8C%96)
  - [第 119 题：vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？](#%E7%AC%AC-119-%E9%A2%98vue-%E5%A6%82%E4%BD%95%E4%BC%98%E5%8C%96%E9%A6%96%E9%A1%B5%E7%9A%84%E5%8A%A0%E8%BD%BD%E9%80%9F%E5%BA%A6vue-%E9%A6%96%E9%A1%B5%E7%99%BD%E5%B1%8F%E6%98%AF%E4%BB%80%E4%B9%88%E9%97%AE%E9%A2%98%E5%BC%95%E8%B5%B7%E7%9A%84%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%91%A2)
  - [第 120 题：为什么 for 循环嵌套顺序会影响性能？](#%E7%AC%AC-120-%E9%A2%98%E4%B8%BA%E4%BB%80%E4%B9%88-for-%E5%BE%AA%E7%8E%AF%E5%B5%8C%E5%A5%97%E9%A1%BA%E5%BA%8F%E4%BC%9A%E5%BD%B1%E5%93%8D%E6%80%A7%E8%83%BD)
  - [第 121 题：统计 1 ~ n 整数中出现 1 的次数。](#%E7%AC%AC-121-%E9%A2%98%E7%BB%9F%E8%AE%A1-1--n-%E6%95%B4%E6%95%B0%E4%B8%AD%E5%87%BA%E7%8E%B0-1-%E7%9A%84%E6%AC%A1%E6%95%B0)
  - [第 122 题：webpack 打包 vue 速度太慢怎么办？](#%E7%AC%AC-122-%E9%A2%98webpack-%E6%89%93%E5%8C%85-vue-%E9%80%9F%E5%BA%A6%E5%A4%AA%E6%85%A2%E6%80%8E%E4%B9%88%E5%8A%9E)
  - [第 123 题：vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法](#%E7%AC%AC-123-%E9%A2%98vue-%E6%98%AF%E5%A6%82%E4%BD%95%E5%AF%B9%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95%E8%BF%9B%E8%A1%8C%E5%8F%98%E5%BC%82%E7%9A%84%E4%BE%8B%E5%A6%82-pushpopsplice-%E7%AD%89%E6%96%B9%E6%B3%95)
  - [第 124 题：永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响](#%E7%AC%AC-124-%E9%A2%98%E6%B0%B8%E4%B9%85%E6%80%A7%E9%87%8D%E5%AE%9A%E5%90%91301%E5%92%8C%E4%B8%B4%E6%97%B6%E6%80%A7%E9%87%8D%E5%AE%9A%E5%90%91302%E5%AF%B9-seo-%E6%9C%89%E4%BB%80%E4%B9%88%E5%BD%B1%E5%93%8D)
  - [第 125 题：算法题](#%E7%AC%AC-125-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98)
  - [第 126 题：扑克牌问题](#%E7%AC%AC-126-%E9%A2%98%E6%89%91%E5%85%8B%E7%89%8C%E9%97%AE%E9%A2%98)
  - [第 127 题：如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性](#%E7%AC%AC-127-%E9%A2%98%E5%A6%82%E4%BD%95%E7%94%A8-css-%E6%88%96-js-%E5%AE%9E%E7%8E%B0%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA%E7%9C%81%E7%95%A5%E6%95%88%E6%9E%9C%E8%80%83%E8%99%91%E5%85%BC%E5%AE%B9%E6%80%A7)
  - [第 128 题：Http 状态码 301 和 302 的应用场景分别是什么](#%E7%AC%AC-128-%E9%A2%98http-%E7%8A%B6%E6%80%81%E7%A0%81-301-%E5%92%8C-302-%E7%9A%84%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E5%88%86%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
  - [第 129 题：输出以下代码执行结果](#%E7%AC%AC-129-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C)
  - [第 130 题：输出以下代码执行结果，大致时间就好（不同于上题）](#%E7%AC%AC-130-%E9%A2%98%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C%E5%A4%A7%E8%87%B4%E6%97%B6%E9%97%B4%E5%B0%B1%E5%A5%BD%E4%B8%8D%E5%90%8C%E4%BA%8E%E4%B8%8A%E9%A2%98)
  - [第 131 题：接口如何防刷](#%E7%AC%AC-131-%E9%A2%98%E6%8E%A5%E5%8F%A3%E5%A6%82%E4%BD%95%E9%98%B2%E5%88%B7)
  - [第 132 题：实现一个 Dialog 类，Dialog 可以创建 dialog 对话框，对话框支持可拖拽（腾讯）](#%E7%AC%AC-132-%E9%A2%98%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA-dialog-%E7%B1%BBdialog%E5%8F%AF%E4%BB%A5%E5%88%9B%E5%BB%BA-dialog-%E5%AF%B9%E8%AF%9D%E6%A1%86%E5%AF%B9%E8%AF%9D%E6%A1%86%E6%94%AF%E6%8C%81%E5%8F%AF%E6%8B%96%E6%8B%BD%E8%85%BE%E8%AE%AF)
  - [第 133 题：用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异](#%E7%AC%AC-133-%E9%A2%98%E7%94%A8-settimeout-%E5%AE%9E%E7%8E%B0-setinterval%E9%98%90%E8%BF%B0%E5%AE%9E%E7%8E%B0%E7%9A%84%E6%95%88%E6%9E%9C%E4%B8%8E-setinterval-%E7%9A%84%E5%B7%AE%E5%BC%82)
  - [第 134 题：求两个日期中间的有效日期](#%E7%AC%AC-134-%E9%A2%98%E6%B1%82%E4%B8%A4%E4%B8%AA%E6%97%A5%E6%9C%9F%E4%B8%AD%E9%97%B4%E7%9A%84%E6%9C%89%E6%95%88%E6%97%A5%E6%9C%9F)
  - [第 135 题：算法题（盛大）](#%E7%AC%AC-135-%E9%A2%98%E7%AE%97%E6%B3%95%E9%A2%98%E7%9B%9B%E5%A4%A7)
  - [第 136 题：如何实现骨架屏，说说你的思路](#%E7%AC%AC-136-%E9%A2%98%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%AA%A8%E6%9E%B6%E5%B1%8F%E8%AF%B4%E8%AF%B4%E4%BD%A0%E7%9A%84%E6%80%9D%E8%B7%AF)
  <!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前端面试题及答案汇总

### 第 1 题：写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

公司：滴滴、饿了么
解析：[第 1 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)
<br/>

### 第 2 题：`['1', '2', '3'].map(parseInt)` what & why ?

解析：[第 2 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)
<br/>

### 第 3 题：什么是防抖和节流？有什么区别？如何实现？

公司：挖财
解析：[第 3 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)
<br/>

### 第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

解析：[第 4 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6)
<br/>

### 第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？

解析：[第 5 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/9)
<br/>

### 第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？

解析：[第 6 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10)
<br/>

### 第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？

解析：[第 7 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)
<br/>

### 第 8 题：setTimeout、Promise、Async/Await 的区别

解析：[第 8 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)
<br/>

### 第 9 题：Async/Await 如何通过同步的方式实现异步

公司：头条、微医
解析：[第 9 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/156)
<br/>

### 第 10 题：异步笔试题

> 请写出下面代码的运行结果

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```

解析：[第 10 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)
公司：头条
<br/>

### 第 11 题：算法手写题

> 已知如下数组：
>
> var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
> 公司：携程
> 解析：[第 11 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8) > <br/>

### 第 12 题：JS 异步解决方案的发展历程以及优缺点。

公司：滴滴、挖财、微医、海康
解析：[第 12 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/11)
<br/>

### 第 13 题：Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

公司：微医
解析：[第 13 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/19)
<br/>

### 第 14 题：情人节福利题，如何实现一个 new

公司：兑吧
解析：[第 14 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/12)
<br/>

### 第 15 题：简单讲解一下 http2 的多路复用

公司：网易
解析：[第 15 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14)
<br/>

### 第 16 题：谈谈你对 TCP 三次握手和四次挥手的理解

解析：[第 16 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)
<br/>

### 第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

> 如果 A 与 B 建立了正常连接后，从未相互发过数据，这个时候 B 突然机器重启，问 A 此时处于 TCP 什么状态？如何消除服务器程序中的这个状态？（超纲题，了解即可）
> 解析：[第 17 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/21) > <br/>

### 第 18 题：React 中 setState 什么时候是同步的，什么时候是异步的？

公司：微医
解析：[第 18 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)
<br/>

### 第 19 题：React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      val: 0
    }
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 1 次 log

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 3 次 log

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 4 次 log
    }, 0)
  }

  render() {
    return null
  }
}
```

解析：[第 19 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18)
<br/>

### 第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

解析：[第 20 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22)
<br/>

### 第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
> 解析：[第 21 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/23) > <br/>

### 第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

解析：[第 22 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)
<br/>

### 第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

解析：[第 23 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25)
<br/>

### 第 24 题：聊聊 Redux 和 Vuex 的设计思想

解析：[第 24 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/45)
<br/>

### 第 25 题：说说浏览器和 Node 事件循环的区别

解析：[第 25 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)
<br/>

### 第 26 题：介绍模块化发展历程

可从 IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、`<script type="module">` 这几个角度考虑。
解析：[第 26 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28)
<br/>

### 第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？。

解析：[第 27 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30)
<br/>

### 第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？

解析：[第 28 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/31)
<br/>

### 第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

解析：[第 29 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/34)
<br/>

### 第 30 题：两个数组合并成一个数组

请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
解析： [第 30 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39)
<br/>

### 第 31 题：改造下面的代码，使之输出 0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
```

解析：[第 31 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/43)
<br/>

### 第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

解析：[第 32 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47)
<br/>

### 第 33 题：下面的代码打印什么内容，为什么？

```js
var b = 10
;(function b() {
  b = 20
  console.log(b)
})()
```

解析：[第 33 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)
<br/>

### 第 34 题：简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10
;(function b() {
  b = 20
  console.log(b)
})()
```

解析：[第 34 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/51)
<br/>

### 第 35 题：浏览器缓存读取规则

可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache 中？
解析：[第 35 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/53)
<br/>

### 第 36 题：使用迭代的方式实现 flatten 函数。

解析：[第 36 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54)
<br/>

### 第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

解析：[第 37 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/65)
<br/>

### 第 38 题：下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

解析：[第 38 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/57)
公司：京东
<br/>

### 第 39 题：介绍下 BFC 及其应用。

解析：[第 39 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59)
<br/>

### 第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop

如果修改了，Vue 是如何监控到属性的修改并给出警告的。
解析：[第 40 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60)
