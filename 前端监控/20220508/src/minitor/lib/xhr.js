import tracker from '../util/tracker'

/**
 * @Author: wyb
 * @Descripttion: 对原生 XMLHttpRequest 做切片编程
 * @param {*}
 */
export function injectXHR() {
  const XMLHttpRequest = window.XMLHttpRequest
  const rawOpen = XMLHttpRequest.prototype.open
  const rawSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.open = function (
    method,
    url,
    async,
    username,
    password
  ) {
    // 排除监控接口
    if (!url.match(/logstores/) && !url.match(/sockjs/)) {
      this.logData = {
        method,
        url,
        async,
        username,
        password
      }
    }
    return rawOpen.apply(this, arguments)
  }

  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      const start = Date.now()
      const handler = type => event => {
        tracker.send({
          kind: 'stability',
          type: 'xhr',
          eventType: type, // load error abort
          pathname: this.logData.url, // 接口的url地址
          status: this.status + '-' + this.statusText,
          duration: '' + (Date.now() - start), // 接口耗时
          response: this.response ? JSON.stringify(this.response) : '',
          params: body || ''
        })
      }
      this.addEventListener('load', handler('load'), false)
      this.addEventListener('error', handler('error'), false)
      this.addEventListener('abort', handler('abort'), false)
    }
    rawSend.apply(this, arguments)
  }
}
