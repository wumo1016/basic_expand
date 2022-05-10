/**
 * @Author: wyb
 * @Descripttion: 处理换行符
 * @param {*} stack
 */
export function getLines(stack) {
  if (!stack) return ''
  return stack
    .split('\n')
    .slice(1)
    .map(item => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}

let lastEvent
;[
  'click',
  'pointerdown',
  'touchstart',
  'mousedown',
  'keydown',
  'mouseover'
].forEach(event => {
  document.addEventListener(
    event,
    event => {
      lastEvent = event
    },
    {
      capture: true, // 在捕获阶段执行
      passive: true // 不阻止默认事件
    }
  )
})
/**
 * @Author: wyb
 * @Descripttion: 获取最后一个事件
 * @param {*}
 */
export function getLastEvent() {
  return lastEvent
}
/**
 * @Author: wyb
 * @Descripttion:
 * @param {*} pathsOrTarget
 */
export function getSelector(pathsOrTarget) {
  let paths = pathsOrTarget
  if (!Array.isArray(pathsOrTarget)) {
    paths = []
    const element = pathsOrTarget
    while (element) {
      paths.push(element)
      element = element.parentNode
    }
  }
  return paths
    .reverse()
    .filter(function (element) {
      return element !== window && element !== document
    })
    .map(function (element) {
      let selector
      if (element.id) {
        selector = `#${element.id}`
      } else if (element.className && typeof element.className === 'string') {
        selector = '.' + element.className.split(' ').filter(Boolean).join('.')
      } else {
        selector = element.nodeName
      }
      return selector
    })
    .join(' ')
}
