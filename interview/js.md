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