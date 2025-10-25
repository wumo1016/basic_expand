class MyTest {
  constructor() {
    console.log('MyTest 构造函数被调用了')
  }
}

function sington(classname) {
  let ins = null
  return new Proxy(classname, {
    construct(target, args) {
      if (!ins) {
        ins = Reflect.construct(target, args)
      }
      return ins
    }
  })
}

const MySingtonTest = sington(MyTest)

const v1 = new MySingtonTest()
const v2 = new MySingtonTest()
console.log(v1 === v2) // true
