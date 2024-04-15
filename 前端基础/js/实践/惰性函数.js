/**
 * @Author: wyb
 * @Descripttion: 只有第一次调用需要判断
 * @param {*} text
 */
function test(text) {
  if (navigator.clipboard) {
    test = function (text) {
      navigator.clipboard.writeText(text)
    }
  } else {
    text = function () {
      const input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendchild(input)
      input.select()
      document.exeeeommand('copy')
      document.body.removeChild(input)
    }
  }
  test(text)
}
