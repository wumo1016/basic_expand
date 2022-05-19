## 修改 placeholder 样式

```css
input::-webkit-input-placeholder {
  color: #babbc1;
  font-size: 14px;
}
```

## 修改输入框光标的颜色

```css
input {
  caret-color: blue;
}
```

## 移除数字类型输入框的小箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

## 自定义选中的文本样式

```css
.box::selection {
  color: red;
  background: blue;
}
```

## 设置页面灰色

```css
body {
  filter: grayscale(1);
}
```

## 选择器

- `[attr^=value]`: 选择带有属性 attr 值`开头`为 value 的元素
- `[attr$=value]`: 选择带有属性 attr 值`结尾`为 value 的元素
- `[attr*=value]`: 选择带有属性 attr 值`包含`value 的元素
- `[attr]`: 选择所有带有属性 attr 的元素
- `[attr=value]`: 选择带有属性 attr 值为 value 的元素

## position

- fixed: 当祖先元素的 transform、filter、perspective 等属于不为 none 时 容器由视口改为该祖先

## 在 calc 中使用 scss 变量

- 使用 `#{}` 包裹 例如: `height: calc(100% - #{$height})`
