/* 观察者模式 基于发布订阅 */

;(function () {
  class Observer {
    // 观察者
    constructor(who) {
      this.who = who
    }
    update(state) {
      console.log(this.who + state)
    }
  }

  class Subject {
    // 被观察者
    constructor() {
      this.state = '开心'
      this.list = []
    }
    attach(ob) {
      this.list.push(ob)
    }
    setState(state) {
      // 更新自己的状态
      this.state = state
      this.list.forEach(ob => ob.update(state))
    }
  }

  const subject = new Subject()
  const observer1 = new Observer('我')
  const observer2 = new Observer('媳妇')

  subject.attach(observer1)
  subject.attach(observer2)

  subject.setState('难受')
})()
