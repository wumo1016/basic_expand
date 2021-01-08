class Collapse extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({
      mode: 'open'
    })
    const temp = document.querySelector('#wm-collapse')
    const cloneTemp = temp.content.cloneNode(true)

    const style = document.createElement('style')
    // :host 代表根元素 此时代表 wm-collapse 标签
    style.textContent = `
      :host{
        display: flex;
        border: 1px solid #ebebeb;
        border-radius: 4px;
        padding: 20px 20px;
      }
      .wm_collapse{
        width: 100%;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(cloneTemp)

    // 监听slot 变化时拿到 children
    const slot = shadow.querySelector('slot')
    slot.addEventListener('slotchange', (e) => {
      this.slotList = e.target.assignedElements() // 获取所有子元素
      this.render()
    })
  }

  // 组件创建回调
  connectedCallback() {
    // log('collapse组件创建啦')
  }

  // 组件移除回调
  disconnectedCallback() {
    log('collapse组件移除啦')
  }

  // 组件被移动到iframe中执行
  adoptedCallback() {}

  // 监控什么属性变化
  static get observedAttributes() {
    return ['active']
  }

  // 属性变化时执行
  attributeChangedCallback(key, oldValue, newValue) {
    if (key === 'active') {
      this.activeList = JSON.parse(newValue)
      this.render()
    }
  }

  // 插槽和属性变化时 重新渲染
  render() {
    if (this.slotList && this.activeList) {
      [...this.slotList].forEach(child => {
        child.setAttribute('active', JSON.stringify(this.activeList))
      })
    }
  }
}

export default Collapse