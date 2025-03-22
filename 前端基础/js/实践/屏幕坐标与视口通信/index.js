/**
 * @author: wyb
 * @description: 视口坐标到屏幕坐标的转换
 * @param {*} clientX 视口坐标x
 * @param {*} clientY 视口坐标y
 */
function clientToScreen(clientX, clientY) {
  return {
    screenX: clientX + window.screenX,
    screenY: clientY + window.screenY + window.outerHeight - window.innerHeight // 浏览器顶部栏的高度
  }
}

/**
 * @author: wyb
 * @description: 屏幕坐标到视口坐标的转换
 * @param {*} screenX 屏幕坐标x
 * @param {*} screenY 屏幕坐标y
 */
function screenToClient(screenX, screenY) {
  return {
    clientX: screenX - window.screenX,
    clientY: screenY - window.screenY - window.outerHeight + window.innerHeight
  }
}
