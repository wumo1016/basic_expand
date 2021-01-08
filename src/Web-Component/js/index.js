window.log = console.log
import Collapse from './collapse.js'
import CollapseItem from './collapse-item.js'

window.customElements.define('wm-collapse', Collapse)
window.customElements.define('wm-collapse-item', CollapseItem)

// 设置组件的默认显示状态
let activeList = ['1']
function setActive(){
  document.querySelector('wm-collapse').setAttribute('active', JSON.stringify(activeList))
}
setActive()

document.querySelector('wm-collapse').addEventListener('activeChange', e => {
  const { name } = e.detail
  const index = activeList.findIndex(v => v === name)
  if(index > -1){
    activeList.splice(index, 1)
  } else {
    activeList.push(name)
  }
  setActive()
})
