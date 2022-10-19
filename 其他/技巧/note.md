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
