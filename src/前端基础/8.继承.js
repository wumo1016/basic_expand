

function _extends(Child, Father) {
  Child.__proto__ = Father;//继承静态属性的方法
  function Temp() {
      //constructor指向子类的构造函数
      //this.constructor = Child;
  }
  //Temp.constructor = Child;
  //(__.prototype = b.prototype, new __());
  Temp.prototype = Father.prototype;//Father
  Temp.prototype.constructor = Child;
  Child.prototype = new Temp();

  /**
   * 1.会有两个私有属性
   * 2.为了避免在此继承私有属性
   * 3.会把Father 上的私有属性都变成Child实例 的公有属性，而且属性都是错的
   */
  /*   Child.prototype = new Father();
    Child.prototype.constructor = Child; */
}

var Father = (function () {
  function Father(name) {
      this.name = name;
  }
  Father.prototype.getName = function () {
      console.log(this.name);
  }
  Father.staticFatherName = 'FatherName';
  Father.staticGetFatherName = function () {
      console.log(Father.staticFatherName);
  }
  return Father;
})();
var Child = (function (_super) {//_super=Father
  _extends(Child, _super);
  function Child(name, age) {
      //this其实是指向子类的实例 new Object {}子类的实例
      //是在调用父类的构造函数，初始化父类的私有属性
      _super.call(this, name);
  }
  Child.prototype.getAge = function () {
      console.log(this.name);
  }
  Child.staticChildName = 'ChildName';
  Child.staticGetChildName = function () {
      console.log(Child.staticChildName);
  }
  return Child;
})(Father);

let child = new Child('zhufeng', 10);
console.log(child.constructor);
console.log(child.constructor === Father);
console.log(child.constructor === Child);
child.getName();
child.getAge();
Child.staticGetChildName();
Child.staticGetFatherName();

//export { };