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
    - 标准：e.stopPropagation()
    - IE：window.event.cancelBubble = false
  - 阻止捕获：
