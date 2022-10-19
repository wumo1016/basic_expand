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

## 浏览器控制台的变量

- `$0`: 在 Element 面板中选中的元素
- `$1-$4`: 对应选中元素的历史记录
- `$_`: 控制台上一条记录的返回值

## 调试线上代码

- 在控制源代码 tab 栏中 左侧网页 top 文件右键点击在所有文件中搜索
- 定位到相关文件
- 在对应源文件的左下角有一个符号 `{}` 可以美化代码 然后就可以进行 debugger 了

- 关联 sourcemap 文件
