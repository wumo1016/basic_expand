// import formatTime from '../util/formatTime'

import { getLines, getLastEvent, getSelector } from '../util'
import tracker from '../util/tracker'

export function injectJsError() {
  // 监听全局错误
  window.addEventListener(
    'error',
    function (event) {
      const lastEvent = getLastEvent() // 最后一个交互事件
      const log = {
        kind: 'stability', // 监控指标的大类 => 稳定性
        type: 'error', // 监控指标的小类 => 错误
        errorType: 'jsError', // js执行错误
        message: event.message, // 报错信息
        filename: event.filename, // 报错链接
        position: (event.lineno || 0) + ':' + (event.colno || 0), // 报错行列号
        stack: getLines(event.error.stack), // 错误堆栈
        selector: lastEvent
          ? getSelector(lastEvent.path || lastEvent.target)
          : '' // CSS选择器
      }
      tracker.send(log)
    },
    true
  ) // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

  //当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      const lastEvent = getLastEvent()
      let message = ''
      let lineno = 0
      let colno = 0
      let filename = ''
      let stack = ''
      const reason = event.reason
      if (typeof reason === 'string') {
        message = reason
      } else if (typeof reason === 'object') {
        message = reason.message
        if (reason.stack) {
          const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
          if (matchResult) {
            filename = matchResult[1]
            lineno = matchResult[2]
            colno = matchResult[3]
          }
          stack = getLines(reason.stack)
        }
      }
      const log = {
        kind: 'stability', // 监控指标的大类 => 稳定性
        type: 'error', // 监控指标的小类 => 错误
        errorType: 'promiseError', // promise执行错误
        message, // 报错信息
        filename, // 报错链接
        position: (lineno || 0) + ':' + (colno || 0), // 报错行列号
        stack, // 错误堆栈
        selector: lastEvent
          ? getSelector(lastEvent.path || lastEvent.target)
          : '' // CSS选择器
      }
      tracker.send(log)
    },
    true
  )
}
