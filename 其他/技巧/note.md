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
