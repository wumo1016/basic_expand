## 快速找到页面中滚动的元素

```js
function findScroller(element) {
  element.onscroll = function () {
    console.log(element)
  }
  Array.from(element.children).forEach(findScroller)
}
findScroller(document.body)
```

## element 调试 popover 元素

- 鼠标浮上去, 然后 ctrl+shift+p 调出 chrome 控制台, 输入 disabled javascript 禁用 js 后就可以查看啦(调试完后可以使用 enable javascript 启用)
- 在控制台输入下面代码执行 时间是供选择元素的时间

```js
setTimeout(() => {
  debugger
}, 5000)
```

## 在浏览器修改源文件代码

- 访问地址必须是 ip 不能是本地文件系统
- 浏览器控制台 => 源代码 => 替换(启用本地替换) => 选择一个本地文件夹用于存放编辑后的文件(替换源文件)
- 在弹出的弹窗中允许

## 浏览器控制台的变量

- `$0`: 在 Element 面板中选中的元素
- `$1-$4`: 对应选中元素的历史记录
- `$_`: 控制台上一条记录的返回值

## 调试线上代码

- 在控制源代码 tab 栏中 左侧网页 top 文件右键点击在所有文件中搜索
- 定位到相关文件
- 在对应源文件的左下角有一个符号 `{}` 可以美化代码 然后就可以进行 debugger 了
- 关联 sourcemap 文件

## github 浏览代码时 按中文句号可以直接切换到 web-vscode 编辑器进行编辑(前提是 github 已登录)

## vscode 单击一个文件且未作任何修改时, 然后打开其他文件时, 回替换当前文件的 tab (当前文件的 tab 标题时斜体的), 解决方法

- 双击打开文件
- 双击 tab 标题

## 搜索打包后的代码

- 控制台-Network-按快捷鍵 ctrl+shift+f 打开 Search Tab 搜索即可

## 使用 vscode 选中一段文本后, 按 ctrl+D 会选中下一个同样的文本, 连续有效

## 数字与 undefined 进行比较时 永远都是 false 而 null 不是

## 字符串格式转换

```ts
function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
```

## 对象转样式

```ts
function objectToStyle(obj: { [key: string]: any }) {
  return Object.keys(obj)
    .map(key => `${this.camelToKebab(key)}: ${obj[key]};`)
    .join(' ')
}
```

## 下载线上图片到本地

```js
import path from 'path'
import https from 'https'

const https = require('https')
const fileStream = fs.createWriteStream(path.join(__dirname, './test.png'))
https.get(urls[0], res => {
  res.pipe(fileStream)
})
```
