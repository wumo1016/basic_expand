/* --------------- 1.原型链继承 -------------------- */
// 缺点：父类上的所有引用属性将会被所有子类共享
;(function () {
  function Parent() {
    this.names = []
  }
  function Child() {}
  Child.prototype = new Parent()

  const child1 = new Child()
  child1.names.push(123)
  const child2 = new Child()

  console.log(child1.names) // [ 123 ]
  console.log(child2.names) // [ 123 ]
})

/* --------------- 2.冒充继承(借用构造函数继承) -------------------- */
// 缺点: 无法继承原型上的属性
;(function () {
  function Parent(name) {
    this.names = [name]
  }
  Parent.prototype.age = 18
  function Child(name) {
    Parent.call(this, name)
  }

  const child1 = new Child('111')
  child1.names.push(222)
  const child2 = new Child('222')
  console.log(child1.names) // [ 111, 222 ]
  console.log(child2.names) // [ 222 ]
  console.log(child1.age) // undefined
})

/* --------------- 3.组合继承 -------------------- */
;(function () {
  function Parent() {
    this.names = []
  }
  Parent.prototype.age = 18
  Parent.prototype.obj = {}
  function Child() {
    Parent.call(this)
  }
  Child.prototype = new Parent()
  Child.prototype.constructor = Child

  const child1 = new Child()
  const child2 = new Child()
  child1.obj.name = 'wyb'

  console.log(child1.names) // [ 123 ]
  console.log(child2.names) // []
  console.log(child1.age) // 18
  console.log(child1.obj) // { name: 'wyb' }
  console.log(child2.obj) // { name: 'wyb' }
})

/* --------------- 4.原型式继承 -------------------- */
;(function () {
  function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
  }

  const obj = {
    names: [],
    age: 0
  }
  const obj1 = createObj(obj)
  const obj2 = createObj(obj)
  obj1.names.push('wyb')
  obj1.age = 18
  console.log(obj1.names) // [ 'wyb' ]
  console.log(obj2.names) // [ 'wyb' ]
  console.log(obj1.age) // 18
  console.log(obj2.age) // 0
})

/* --------------- 4.寄生式继承 -------------------- */
;(function () {
  function createObj(o) {
    var clone = Object.create(o)
    clone.sayName = function () {
      console.log('hi')
    }
    return clone
  }
  const parent = {}
  const child = createObj(parent)
})

/* --------------- 5.寄生组合式继承 -------------------- */
// 组合继承调用了两次父类构造函数
;(function () {
  function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
  function Parent() {
    console.log(123)
  }
  function Child() {
    Parent.call(this)
  }
  Child.prototype = createObj(Parent.prototype) // 等同于使用 Object.create
  Child.prototype.constructor = Child
})()
