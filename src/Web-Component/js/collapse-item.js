class CollapseItem extends HTMLElement {
  constructor() {
    super()
    this.isShow = true // 是否需要显示

    const shadow = this.attachShadow({
      mode: 'open'
    })
    const temp = document.querySelector('#wm-collapse-item')
    const cloneTemp = temp.content.cloneNode(true)

    const style = document.createElement('style')
    style.textContent = `
      :host{
        width: 100%;
      }
      .title{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        border-top: 1px solid #ebebeb;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
      }
      .content{
        font-size: 14px;
        padding-bottom: 20px;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(cloneTemp)

    this.titleEle = shadow.querySelector('.title')
    this.titleEle.addEventListener('click', e => {
      document.querySelector('wm-collapse').dispatchEvent(new CustomEvent('activeChange', {
        detail: {
          name: this.name,
        }
      }))
    })
  }

  // 监控什么属性变化
  static get observedAttributes() {
    return ['active', 'title', 'name']
  }

  attributeChangedCallback(key, oldValue, newValue) {
    switch (key) {
      case 'active':
        this.activeList = JSON.parse(newValue)
        break
      case 'title':
        this.titleEle.innerHTML = newValue
        break
      case 'name':
        this.name = newValue
        break
      default:
        break
    }
    if (this.activeList && this.name) {
      this.isShow = this.activeList.includes(this.name)
      this.shadowRoot.querySelector('.content').style.display = this.isShow ? 'block' : 'none'
    }
  }
}

export default CollapseItem