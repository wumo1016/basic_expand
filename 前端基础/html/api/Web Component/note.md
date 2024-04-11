## 介绍

- 允许用户自定义元素(Custom Element)
- 支持样式隔离(shadow dom)
- 支持组件的特点：模板、插槽、生命周期、属性

### [template 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)

- template 内的内容不会被渲染到页面上
- 外界的样式无法影响里面的内容

### 属性

- observedAttributes: 需要监听变化的属性, 反回一个数组

### 生命周期

- connectedCallback: 相当于 mounted
- disconnectedCallback: 相当于 unmounted
- attributeChangedCallback: 监听自定义元素的属性被增加、移除、更改
- adoptedCallback: 当自定义元素被移动到新文档时触发

### addachShadow

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow

> addachShadow 给指定元素挂载一个影子 dom  
> mode: open/closed 是否可以从 js 外部访问根节点

### benTem.content

https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement/content#%E8%AF%AD%E6%B3%95

> 取 template 中定义的内容

### var 样式变量

https://developer.mozilla.org/zh-CN/docs/Web/CSS/var()

> 用户可以设置自定义的样式

### :root

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root

> 这个 CSS 伪类匹配文档树的根元素

### CustomEvent

https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent

> 设置自定义事件
