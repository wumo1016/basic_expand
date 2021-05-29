## new的实现原理
  - 创建一个新对象 并将目标对象的__proto__设置为构造函数的prototype
  - 执行构造函数 并将this指向这个新对象
  - 返回这个新对象
  ```
    function _new(classzz, ...args){
      const obj = Object.create(classzz.prototype)
      classzz.call(obj, ...args)
      return obj
    }
  ```
## Object.create的实现原理
  - 创建一个新函数
  - 将这个函数的原型对象设置为传入的对象
  - 返回新函数的实例
  ```
  function _create(obj){
    function fn(){}
    fn.prototype = obj
    return new fn()
  }
  ```

## 原型链
  - 函数都有一个prototype属性 指向原型对象
  - 对象都有一个__proto__属性 指向构造函数原型对象
  - 最顶端就是Object.prototype.__proto__ 就是null

## 对象的属性描述符
  - configurable：是否可修改
  - enumerable：是否可枚举
  - value：属性对应的值
  - writable：是否可以通过赋值运算符改变
  - get
  - set

## 深拷贝
  - JSON.parse(JSON.strigfy(obj))
    - 会忽略undefined、symbol、函数
    - 不能解决循环引用问题，会直接报错

## 防抖和节流
  - 防抖：在指定时间内连续触发，只会执行一次，分为立即执行和非立即执行
    - 应用：搜素框输入input触发搜索、窗口变化后重新渲染图表等
  - 节流：在指定时间内连续触发，只在每个指定时间段内执行一次
    - 应用：滚动加载更多、高频点击、表单重复提交

## 自执行函数
  ```
  ;(function b() {
    b = 123
    console.log(b)
  })();
  ```
  - 如果自执行函数有函数名 那么这个函数名就相当于const定义的
  - 在非严格模式下 会直接忽略对它的重新赋值
  - 在严格模式下 会直接报错

## this的理解
  - 谁调用 就指向谁
  - 如果是new出来的 this就指向那个new出来的对象
  - 事件中 this执行触发这个事件的对象

## 事件模型
  - 事件发生的三个阶段 事件捕获阶段 + 事件处理阶段 + 事件冒泡阶段
  - 阻止冒泡：
    - 标准：`e.stopPropagation()`
    - IE：`window.event.cancelBubble = false`
  - 阻止捕获：
    - 标准：e.preventDefault()
    - IE：`window.event.returnValue`

## 内存泄露
  - 介绍：不再需要使用的变量存在于内存中
  - 哪些操作会导致内存泄漏
    - 意外的全局变量：`a = 123`
    - 闭包使用不当

## ["1", "2", "3"].map(parseInt)的答案?
  - map函数传入三个参数：ele、index、arr
  - parseInt接收两个参数：string、radix
    - radix值必须介于2-35之间 默认10 写0也表示10
      - radix如果不满足就返回NaN
      - string如果不满足对应进制的值 也返回NaN

## 箭头函数
  - 内部this是定义时就确定的(外部块的this) 而不是使用时
  - 不能当作构造函数 所以不能new
  - 没有arguments对象 可以使用rest参数代替
  - 不能使用yield命令 也就是不能当作generator函数

## caller与callee的区别
  - caller
    - 如果fn1在全局做作用域中被调用
    ```
    function fn1() {
      console.log(fn1.caller); // null
    }
    fn1()
    ```
    - 如果fn1在fn2中被调用 就返回fn2
    ```
    function fn1() {
      console.log(fn1.caller); // fn2
    }
    function fn2(params) {
      fn1()
    }
    fn2()
    ```
  - callee
    - arguments对象的一个属性 返回当前正在被执行的函数

  ## JSON.parse(JSON.stringfy(obj))的弊端
    - 会忽略undefined、symbol、函数
    ```
    let obj = {
      age: undefined,
      sex: Symbol('male'),
      jobs: function () {},
    }
    console.log(JSON.parse(JSON.stringify(obj))) // {}
    ```
    - 不能解决循环引用问题 会直接报错
    ```
    let obj = {
      b: {
        c: 2
      }
    }
    obj.b.c = obj.b
    console.log(JSON.parse(JSON.stringify(obj)))
    ```
## 遍历对象的方法
  - for in
  - Object.keys
  - Object.getOwnPropertyNames
  - Reflect.ownKeys (返回对象的所有属性)

