const host = 'cn-shanghai.log.aliyuncs.com' // 进入监控项目 => 主页 => 项目概览
const project = 'wumo-monitor' // 项目名
const logstore = 'wumo-monitor-store' // 项目store名
const userAgent = require('user-agent')

class SendTracker {
  constructor() {
    this.url = `http://${project}.${host}/logstores/${logstore}/track`
  }
  send(data = {}, callback) {
    const extraData = getExtraData()
    const logs = { ...extraData, ...data }
    // 对象的值不能是数字 阿里云要求
    for (let key in logs) {
      if (typeof logs[key] === 'number') {
        logs[key] = '' + logs[key]
      }
    }

    const body = JSON.stringify({
      __logs__: [logs]
    })

    const xhr = new XMLHttpRequest()
    xhr.open('POST', this.url, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.setRequestHeader('x-log-apiversion', '0.6.0')
    xhr.setRequestHeader('x-log-bodyrawsize', body.length)
    xhr.onload = function () {
      if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
        console.log(xhr)
        callback && callback()
      }
    }
    xhr.onerror = function (error) {
      console.log('error', error)
    }
    xhr.send(body)
  }
}

function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name
  }
}

export default new SendTracker()
