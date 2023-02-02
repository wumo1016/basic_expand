## 闭包以及用途

- 介绍
  - 就是函数可以访问它定义时所在的作用域中变量
- 用途
  - 高级函数
    - 函数参数
    - 函数返回函数

## Object.create 的实现原理

- 创建一个新函数
- 将这个函数的原型对象设置为传入的对象
- 返回新函数的实例

```javascript
function _create(obj) {
  function fn() {}
  fn.prototype = obj
  return new fn()
}
```

## new 的实现原理

- 创建一个新对象 并将目标对象的 `__proto__` 设置为构造函数的 prototype
- 执行构造函数 并将 this 指向这个新对象
- 返回这个新对象

```javascript
function _new(claszz, ...args) {
  const obj = Object.create(claszz.prototype) // 相当于 obj = {} obj.__proto__ = claszz.prototype
  claszz.call(obj, ...args)
  return obj
}
```

## JSON.parse(JSON.stringfy(obj))的弊端

- 会忽略值为 undefined、symbol、函数的属性
  ```javascript
  let obj = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function () {}
  }
  console.log(JSON.parse(JSON.stringify(obj))) // {}
  ```
- 不能解决循环引用问题 会直接报错
  ```javascript
  let obj = {
    b: {
      c: 2
    }
  }
  obj.b.c = obj.b
  console.log(JSON.parse(JSON.stringify(obj)))
  ```
- 正则、Map、Set 的值会被直接转成空对象

## 遍历对象的方法

- for in (包括自身和继承的所有可枚举属性)(不含 Symbol 属性)
- Object.keys (包括自身的所有可枚举属性)(不含 Symbol 属性)
- Object.getOwnPropertyNames(包括自身的所有属性)(不含 Symbol 属性)
- Object.getOwnPropertySymbols(包括自身的所有 Symbol 属性)
- Reflect.ownKeys (包括自身的所有属性)(包含 Symbol 属性)

## 对象的属性描述符

- 数据属性
  - configurable: 是否可修改属性描述符的配置、是否可删除
  - enumerable: 是否可枚举
  - writable: 是否可修改内存地址
  - value
- 访问器属性
  - configurable
  - enumberable
  - get
  - set

## 箭头函数

- 没有自己的 this 对象
  - 普通函数内部 this 执行运行时所在的对象
  - 箭头函数内部的 this 直接指向定义时上层作用域的 this
  - 箭头函数的 this 在定义时就已经确定 后期即使通过 call 等也无法更改
  - 其实在编译的时候 箭头函数的 this 都被被变成一个变量(\_this) \_this = 上层作用域的 this
- 没有 arguments 参数 使用 rest 参数代替
- 不能作为构造函数 不能被 new
- 不能使用 yield 命令 就是不能当作 generator 函数

## 事件模型

- 事件发生的三个阶段 事件捕获阶段 + 事件处理阶段 + 事件冒泡阶段
- 阻止冒泡与捕获
  - `e.stopPropagation()`
  - `e.cancelBubble = true`
- 阻止默认事件
  - `e.preventDefault()`
  - `return false`

## 防抖和节流

- 防抖：在指定时间内连续触发，只会执行一次，分为立即执行和非立即执行
  - 应用：搜素框输入 input 触发搜索、窗口变化后重新渲染图表等
- 节流：在指定时间内连续触发，只在每个指定时间段内执行一次
  - 应用：滚动加载更多、高频点击

## 原型链

- 函数都有一个 prototype 属性 指向原型对象
- 对象都有一个`__proto__`属性 指向构造函数原型对象
- 最顶端就是 Object.prototype.`__proto__` 就是 null

## 自执行函数

```javascript
;(function b() {
  b = 123
  console.log(b)
})()
```

- 如果自执行函数有函数名 那么这个函数名就相当于 const 定义的
- 在非严格模式下 会直接忽略对它的重新赋值
- 在严格模式下 会直接报错

## this 的理解

- 谁调用 就指向谁
- 如果是 new 出来的 this 就指向那个 new 出来的对象
- 事件中 this 执行触发这个事件的对象

## ["1", "2", "3"].map(parseInt)的答案? [1, NaN, NaN]

- map 函数传入三个参数：ele、index、arr
- parseInt 接收两个参数：string、radix
  - radix 值必须介于 2-35 之间 默认 10 写 0 也表示 10
    - radix 如果不满足就返回 NaN
    - string 如果不满足对应进制的值 也返回 NaN

## caller 与 callee 的区别

- caller
  - 如果 fn1 在全局做作用域中被调用
  ```javascript
  function fn1() {
    console.log(fn1.caller) // null
  }
  fn1()
  ```
  - 如果 fn1 在 fn2 中被调用 就返回 fn2
  ```javascript
  function fn1() {
    console.log(fn1.caller) // fn2
  }
  function fn2(params) {
    fn1()
  }
  fn2()
  ```
- callee
  - arguments 对象的一个属性 返回当前正在被执行的函数

## 继承的几种方式(详情见前端基础-继承)

- 原型链继承
  - 原理: 将子类的 prototype 设置为父类的实例
  - 优点: 可以继承父类所有属性 包括原型上的属性
  - 缺点: 父类上的所有引用属性将会被所有子类共享
- 冒充继承
  - 原理: 通过在子类构造函数中调用父类构造函数
  - 优点
    - 父类上的引用属性不会被共享
    - 可以在子类构造函数中给父类构造函数传参
  - 缺点
    - 无法继承原型上的属性
    - 每次实例化子类 都要调一次父类构造函数
- 组合继承
  - 原理: 先使用冒充继承 然后使用原型链继承
  - 优点: 融合了原型链继承和冒充继承的优点
  - 缺点: 调用两次父类构造函数
- 原型式继承
  - 原理: 基于 Object.create 的实现 通过传入一个对象 然后将这个对象作为新对象的原型对象
  - 缺点: 被传入对象的所有引用属性将会被所有新对象共享
- 寄生式继承
  - 原理: 使用 Object.create 继承 然后在内部以某种形式增强对象
- 寄生式组合继承
  - 原理: 使用冒充继承和原型式继承
  - 优点: 只调用一次父类构造函数

## mouseover 和 mouseenter 的区别

- mouseenter 和 mouseleave 不存在事件冒泡
- mouseover 和 mouseout 存在事件冒泡

## instanceof 的原理

- 判断对象的类型 其内部机制就是通过判断对象的原型链中能否找到类型的 prototype
- 实现 instanceof
  - 首先获取类型的原型
  - 然后获取对象的原型
  - 然后循环判读 对象的原型是否等于类型的原型 直到对象原型为 null
  ```js
  function myinstanceof(left, right) {
    const proto = right.prototype
    const l = left.__proto__
    while (l) {
      if (l === proto) return true
      l = l.__proto__
    }
    return false
  }
  ```

## {}和[]的 valueOf 和 toString 的结果

- {} 的 valueOf 结果为 {} toString 的结果为 '[object Object]'
- [] 的 valueOf 结果为 [] toString 的结果为 ''
- 数值运算中优先调用 valueOf 字符串优先调用的是 toString

## 判断数据类型

- Object.prototype.toString.call(target)
  - [object Object/Array/Function]
- typeof
  - 判断基本数据类型
  - 引用类型都返回 object (包括 null)
- instanceof
  - 用于引用类型的检测
- constructor
  - ("xx")/([])/(function(){}).constructor === String/Array/Function
  - null、undefined 等无法检测
  - 而且 constructor 可能会被篡改

## 简单请求与非简单请求(跨域请求)

- 简单请求
  - 需同时满足请求方法和请求头两个条件
    - 请求方法: HEAD、GET、POST
    - 请求头
      - 只能是: Accept/Accept-Language/Conent-Language/Content-Type
      - Content-Type 只能是: text/plain、multipart/form-data、 application/x-www-form-urlencoded
- 非简单请求
  - 会先发送一个预检请求 OPTIONS

## fetch

- 优点
  - 原生支持
  - 基于 Promise 使用方便
- 缺点

  - 只对网络请求出错报错，其他的 400、500 等都当作成功的请求，需要自己封装请求
  - 默认不会携带 cookie 需要配置
  - 无法直接取消，需要借助 AbortController 实现

  ```javascript
  var controller = new AbortController()
  var signal = controller.signal
  // 将signal传入fetch的第二个参数
  fetch(url, { signal })
    .then(function (response) {
      // ...
    })
    .catch(function (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch was aborted')
      } else {
        console.error('Oops!', err)
      }
    })

  setTimeout(() => {
    controller.abort() // 取消fetch请求
  }, 1000)
  ```

  - 不支持监控请求进度

## switch

- switch 的 case 比较值用的是 == 而不是 ===

## ES6 代码转成 ES5 代码的实现思路是什么

- 先将 ES6 转化成 AST 抽象语法树
- 修改语法树为 ES5 版本的
- 根据语法树生成 ES5 代码字符串

## 手写 ajax

- 1.创建 Ajax 对象

  ```js
  const xhr = new XMLHttpRequest()
  ```

- 2.配置请求地址方法等

  ```js
  xhr.open('get', 'index.xml', true)
  ```

- 3.发送请求

  ```js
  xhr.send(null)
  ```

- 4.监听请求，接受响应
  - readyState
    - 0：请求未初始化
    - 1：服务器链接已建立
    - 2：请求已接收
    - 3：请求处理中
    - 4：请求已完成 且响应已经就绪
  ```js
  xhr.onreadysatechange = function () {
    if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304)
      console.log(xhr.responseXML)
  }
  ```

## async await 的原理

- generator + co 的结合
