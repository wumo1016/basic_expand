import { onload } from '../util'
import tracker from '../util/tracker'

function getSelector(element) {
  var selector
  if (element.id) {
    selector = `#${element.id}`
  } else if (element.className && typeof element.className === 'string') {
    selector = '.' + element.className.split(' ').filter(Boolean).join('.')
  } else {
    selector = element.nodeName.toLowerCase()
  }
  return selector
}

export function blankScreen() {
  // 如果最外层是这些标签 则认为是空白节点
  const wrapperSelectors = ['body', 'html', '#container']
  let emptyPoints = 0
  function isWrapper(element) {
    let selector = getSelector(element)
    if (wrapperSelectors.indexOf(selector) >= 0) {
      emptyPoints++
    }
  }
  onload(function () {
    let xElements, yElements
    const { innerWidth, innerHeight, screen } = window
    for (let i = 1; i <= 9; i++) {
      xElements = document.elementsFromPoint(
        (innerWidth * i) / 10,
        innerHeight / 2
      )
      yElements = document.elementsFromPoint(
        innerWidth / 2,
        (innerHeight * i) / 10
      )
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }
    if (emptyPoints > 0) {
      const centerElements = document.elementsFromPoint(
        innerWidth / 2,
        innerHeight / 2
      )
      tracker.send({
        kind: 'stability',
        type: 'blank',
        emptyPoints: '' + emptyPoints,
        screen: screen.width + 'x' + screen.height,
        viewPoint: innerWidth + 'x' + innerHeight,
        selector: getSelector(centerElements[0])
      })
    }
  })
}

// document.elementsFromPoint 该函数返还在特定坐标点下的HTML元素数组
//screen.width  屏幕的宽度   screen.height 屏幕的高度
//innerWidth 去除工具条与滚动条的窗口宽度 innerHeight 去除工具条与滚动条的窗口高度
