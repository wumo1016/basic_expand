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
