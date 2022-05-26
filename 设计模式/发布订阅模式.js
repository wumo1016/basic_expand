/* 发布 订阅 */

;(function () {
  function EventEmitter() {
    this.list = []
  }
  EventEmitter.prototype.on = function (cb) {
    this.list.push(cb)
  }
  EventEmitter.prototype.emit = function (...args) {
    this.list.forEach(cb => cb(...args))
  }
  const e = new EventEmitter()
  const person = {}
  e.on(function (key, value) {
    person[key] = value
    if (Object.keys(person).length === 2) {
      console.log(person)
    }
  })

  fetch('https://api.apiopen.top/getJoke?page=1&count=1&type=text').then(
    res => {
      res.json().then(res => {
        e.emit('name', res.result[0].text)
      })
    }
  )

  fetch('https://api.apiopen.top/singlePoetry').then(res => {
    res.json().then(res => {
      e.emit('age', res.result)
    })
  })
})()
